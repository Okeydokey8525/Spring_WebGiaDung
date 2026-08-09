package vn.homestore.api.catalog.productattribute.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.homestore.api.catalog.productattribute.domain.ProductAttribute;

import java.util.List;
import java.util.Optional;

public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Long> {
    boolean existsByProductIdAndAttributeId(Long productId, Long attributeId);
    Optional<ProductAttribute> findByIdAndProductId(Long id, Long productId);
    List<ProductAttribute> findAllByProductIdOrderBySortOrderAscAttributeIdAsc(Long productId);
    boolean existsByProductId(Long productId);
    boolean existsByAttributeId(Long attributeId);
    boolean existsByIdAndProductId(Long id, Long productId);
}
