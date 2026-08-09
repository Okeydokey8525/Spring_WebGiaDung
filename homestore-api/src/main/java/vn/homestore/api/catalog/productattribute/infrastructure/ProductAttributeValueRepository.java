package vn.homestore.api.catalog.productattribute.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.homestore.api.catalog.productattribute.domain.ProductAttributeValue;

import java.util.List;
import java.util.Optional;

public interface ProductAttributeValueRepository extends JpaRepository<ProductAttributeValue, Long> {
    boolean existsByProductAttributeIdAndAttributeValueId(Long productAttributeId, Long attributeValueId);
    Optional<ProductAttributeValue> findByIdAndProductAttributeId(Long id, Long productAttributeId);
    List<ProductAttributeValue> findAllByProductAttributeIdOrderBySortOrderAscAttributeValueIdAsc(Long productAttributeId);
    boolean existsByProductAttributeId(Long productAttributeId);
    boolean existsByAttributeValueId(Long attributeValueId);
}
