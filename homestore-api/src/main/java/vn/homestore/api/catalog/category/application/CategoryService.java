package vn.homestore.api.catalog.category.application;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.homestore.api.catalog.category.api.CategoryResponse;
import vn.homestore.api.catalog.category.api.CategoryTreeResponse;
import vn.homestore.api.catalog.category.api.CreateCategoryRequest;
import vn.homestore.api.catalog.category.api.UpdateCategoryRequest;
import vn.homestore.api.catalog.category.domain.Category;
import vn.homestore.api.catalog.category.infrastructure.CategoryRepository;
import vn.homestore.api.common.error.ResourceConflictException;
import vn.homestore.api.common.error.ResourceNotFoundException;
import vn.homestore.api.common.persistence.ConstraintViolationDetector;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategorySlugService categorySlugService;

    public CategoryService(CategoryRepository categoryRepository, CategorySlugService categorySlugService) {
        this.categoryRepository = categoryRepository;
        this.categorySlugService = categorySlugService;
    }

    public CategoryResponse createCategory(CreateCategoryRequest request) {
        if (request.parentId() != null && !categoryRepository.existsById(request.parentId())) {
            throw new ResourceNotFoundException("Parent category not found");
        }

        String rawSlug = request.slug() != null && !request.slug().isBlank() ? request.slug() : request.name();
        String normalizedSlug = categorySlugService.generateSlug(rawSlug);

        if (categoryRepository.existsBySlug(normalizedSlug)) {
            throw new ResourceConflictException("Duplicate category slug");
        }

        Category category = new Category(request.name().trim(), normalizedSlug);
        category.setParentId(request.parentId());
        
        if (request.description() != null) category.setDescription(request.description().trim());
        if (request.imageUrl() != null) category.setImageUrl(request.imageUrl().trim());
        if (request.seoTitle() != null) category.setSeoTitle(request.seoTitle().trim());
        if (request.seoDescription() != null) category.setSeoDescription(request.seoDescription().trim());
        
        category.setSortOrder(request.sortOrder() != null ? request.sortOrder() : 0);
        category.setActive(request.active() != null ? request.active() : true);

        try {
            category = categoryRepository.saveAndFlush(category);
            return mapToResponse(category);
        } catch (DataIntegrityViolationException e) {
            if (ConstraintViolationDetector.isConstraintViolated(e, "UX_categories_slug")) {
                throw new ResourceConflictException("Duplicate category slug");
            }
            throw e;
        }
    }

    public CategoryResponse updateCategory(Long id, UpdateCategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        if (request.parentId() != null) {
            if (request.parentId().equals(category.getId())) {
                throw new ResourceConflictException("Category cannot be its own parent");
            }
            if (!categoryRepository.existsById(request.parentId())) {
                throw new ResourceNotFoundException("Parent category not found");
            }
            validateNoCycle(category.getId(), request.parentId());
        }

        String rawSlug = request.slug() != null && !request.slug().isBlank() ? request.slug() : request.name();
        String normalizedSlug = categorySlugService.generateSlug(rawSlug);

        if (categoryRepository.existsBySlugAndIdNot(normalizedSlug, category.getId())) {
            throw new ResourceConflictException("Duplicate category slug");
        }

        category.setName(request.name().trim());
        category.setSlug(normalizedSlug);
        category.setParentId(request.parentId());
        
        category.setDescription(request.description() != null ? request.description().trim() : null);
        category.setImageUrl(request.imageUrl() != null ? request.imageUrl().trim() : null);
        category.setSeoTitle(request.seoTitle() != null ? request.seoTitle().trim() : null);
        category.setSeoDescription(request.seoDescription() != null ? request.seoDescription().trim() : null);
        
        category.setSortOrder(request.sortOrder());
        category.setActive(request.active());

        try {
            category = categoryRepository.saveAndFlush(category);
            return mapToResponse(category);
        } catch (DataIntegrityViolationException e) {
            if (ConstraintViolationDetector.isConstraintViolated(e, "UX_categories_slug")) {
                throw new ResourceConflictException("Duplicate category slug");
            }
            throw e;
        }
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found");
        }
        if (categoryRepository.existsByParentId(id)) {
            throw new ResourceConflictException("Category cannot be deleted while it has child categories");
        }
        categoryRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        Sort sort = Sort.by(Sort.Direction.ASC, "sortOrder", "name");
        return categoryRepository.findAll(sort).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return mapToResponse(category);
    }

    @Transactional(readOnly = true)
    public CategoryResponse getPublicCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlugAndActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        if (!isAncestryActive(category)) {
            throw new ResourceNotFoundException("Category not found");
        }

        return mapToResponse(category);
    }

    @Transactional(readOnly = true)
    public List<CategoryTreeResponse> getPublicCategoryTree() {
        List<Category> allCategories = categoryRepository.findAll();
        
        // Group by parent ID
        Map<Long, List<Category>> childrenMap = new HashMap<>();
        for (Category category : allCategories) {
            childrenMap.computeIfAbsent(category.getParentId(), k -> new ArrayList<>()).add(category);
        }

        List<Category> rootCategories = childrenMap.getOrDefault(null, new ArrayList<>());
        rootCategories.sort(Comparator.comparing(Category::getSortOrder).thenComparing(Category::getName));

        List<CategoryTreeResponse> tree = new ArrayList<>();
        Set<Long> visited = new HashSet<>();
        
        for (Category root : rootCategories) {
            if (root.isActive()) {
                CategoryTreeResponse node = buildTree(root, childrenMap, visited);
                if (node != null) {
                    tree.add(node);
                }
            }
        }
        return tree;
    }

    private CategoryTreeResponse buildTree(Category category, Map<Long, List<Category>> childrenMap, Set<Long> visited) {
        if (!visited.add(category.getId())) {
            return null; // Cycle detected, skip
        }

        CategoryTreeResponse response = new CategoryTreeResponse(
                category.getId(), category.getName(), category.getSlug(),
                category.getImageUrl(), category.getSortOrder()
        );

        List<Category> children = childrenMap.getOrDefault(category.getId(), new ArrayList<>());
        children.sort(Comparator.comparing(Category::getSortOrder).thenComparing(Category::getName));

        for (Category child : children) {
            if (child.isActive()) {
                CategoryTreeResponse childNode = buildTree(child, childrenMap, visited);
                if (childNode != null) {
                    response.children().add(childNode);
                }
            }
        }
        
        visited.remove(category.getId());
        return response;
    }

    private boolean isAncestryActive(Category category) {
        Map<Long, Category> categoryMap = categoryRepository.findAll().stream()
                .collect(Collectors.toMap(Category::getId, c -> c));

        Set<Long> visited = new HashSet<>();
        Category current = category;

        while (current != null) {
            if (!visited.add(current.getId())) {
                return false; // Cycle detected
            }
            if (!current.isActive()) {
                return false;
            }
            if (current.getParentId() != null) {
                current = categoryMap.get(current.getParentId());
            } else {
                current = null;
            }
        }
        return true;
    }

    private void validateNoCycle(Long categoryId, Long proposedParentId) {
        Map<Long, Category> categoryMap = categoryRepository.findAll().stream()
                .collect(Collectors.toMap(Category::getId, c -> c));

        Set<Long> visited = new HashSet<>();
        Long currentId = proposedParentId;

        while (currentId != null) {
            if (currentId.equals(categoryId)) {
                throw new ResourceConflictException("Indirect hierarchy cycle detected");
            }
            if (!visited.add(currentId)) {
                // If the existing tree is already corrupted with a cycle, just abort to prevent infinite loop.
                throw new ResourceConflictException("Existing hierarchy cycle detected");
            }

            Category current = categoryMap.get(currentId);
            if (current != null) {
                currentId = current.getParentId();
            } else {
                currentId = null;
            }
        }
    }

    private CategoryResponse mapToResponse(Category category) {
        return new CategoryResponse(
                category.getId(), category.getParentId(), category.getName(),
                category.getSlug(), category.getDescription(), category.getImageUrl(),
                category.getSortOrder(), category.isActive(), category.getSeoTitle(),
                category.getSeoDescription(), category.getCreatedAt(), category.getUpdatedAt()
        );
    }
}
