package vn.homestore.api.catalog.attribute.infrastructure;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.homestore.api.catalog.attribute.domain.AttributeValue;

import java.util.List;
import java.util.Optional;

public interface AttributeValueRepository extends JpaRepository<AttributeValue, Long> {
    boolean existsByAttributeId(Long attributeId);
    boolean existsByAttributeIdAndValue(Long attributeId, String value);
    boolean existsByAttributeIdAndValueAndIdNot(Long attributeId, String value, Long id);
    boolean existsByAttributeIdAndSlug(Long attributeId, String slug);
    boolean existsByAttributeIdAndSlugAndIdNot(Long attributeId, String slug, Long id);
    Optional<AttributeValue> findByIdAndAttributeId(Long id, Long attributeId);
    List<AttributeValue> findAllByAttributeId(Long attributeId, Sort sort);
}
