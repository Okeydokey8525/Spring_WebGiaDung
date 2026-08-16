export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/products' },
  { label: 'Danh mục', href: '/products#catalog-categories' },
  { label: 'Về HomeStore', href: '/#about-homestore' },
];

export const utilityNavigation: NavItem[] = [
  { label: 'Tìm kiếm', href: '/products#catalog-search' },
];

export const footerNavigation = {
  shop: [
    { label: 'Tất cả sản phẩm', href: '/products' },
    { label: 'Danh mục', href: '/products#catalog-categories' },
    { label: 'Tìm kiếm sản phẩm', href: '/products#catalog-search' },
  ],
  brand: [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về HomeStore', href: '/#about-homestore' },
  ],
};
