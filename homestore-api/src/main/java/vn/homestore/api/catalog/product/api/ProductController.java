package vn.homestore.api.catalog.product.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.homestore.api.catalog.product.application.PublicProductService;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final PublicProductService publicProductService;

    public ProductController(PublicProductService publicProductService) {
        this.publicProductService = publicProductService;
    }

    @GetMapping
    public PublicProductPageResponse listProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "24") int size
    ) {
        return publicProductService.listActiveProducts(page, size);
    }

    @GetMapping("/{slug}")
    public PublicProductDetailResponse getProduct(@PathVariable String slug) {
        return publicProductService.getActiveProductBySlug(slug);
    }
}
