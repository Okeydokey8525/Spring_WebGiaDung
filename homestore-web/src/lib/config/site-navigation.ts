export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: 'Danh mục', href: '/products#catalog-categories' },
  { label: 'Sản phẩm', href: '/products' },
  { label: 'Nổi bật', href: '/products?sort=featured' },
  { label: 'Về HomeStore', href: '/about' },
];

export const utilityNavigation: NavItem[] = [
  { label: 'Tìm kiếm', href: '/search' },
  { label: 'Tài khoản', href: '/account' },
  { label: 'Giỏ hàng', href: '/cart' },
];

export const footerNavigation = {
  shop: [
    { label: 'Danh mục', href: '/products#catalog-categories' },
    { label: 'Sản phẩm', href: '/products' },
    { label: 'Nổi bật', href: '/products?sort=featured' },
  ],
  support: [
    { label: 'Tìm kiếm', href: '/search' },
    { label: 'Tài khoản', href: '/account' },
    { label: 'Giỏ hàng', href: '/cart' },
  ],
  brand: [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về HomeStore', href: '/about' },
  ],
};
