package vn.homestore.api.catalog.attribute.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.homestore.api.catalog.attribute.domain.Attribute;

import java.util.Optional;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {
    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name, Long id);
    boolean existsBySlug(String slug);
    boolean existsBySlugAndIdNot(String slug, Long id);
    Optional<Attribute> findBySlug(String slug);
}
