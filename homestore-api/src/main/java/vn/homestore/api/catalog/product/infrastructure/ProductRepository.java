package vn.homestore.api.catalog.product.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.homestore.api.catalog.product.domain.Product;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);

    Optional<Product> findBySlug(String slug);
}
