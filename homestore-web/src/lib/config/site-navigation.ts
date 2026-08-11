export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: 'Sản phẩm', href: '/products' },
  { label: 'Không gian sống', href: '/rooms' },
  { label: 'Bộ sưu tập', href: '/collections' },
  { label: 'Cảm hứng', href: '/stories' },
  { label: 'Về HomeStore', href: '/about' },
];

export const utilityNavigation: NavItem[] = [
  { label: 'Tìm kiếm', href: '/search' },
  { label: 'Tài khoản', href: '/account' },
  { label: 'Giỏ hàng', href: '/cart' },
];

export const footerNavigation = {
  shop: [
    { label: 'Sản phẩm', href: '/products' },
    { label: 'Không gian sống', href: '/rooms' },
    { label: 'Bộ sưu tập', href: '/collections' },
  ],
  support: [
    { label: 'Tìm kiếm', href: '/search' },
    { label: 'Tài khoản', href: '/account' },
    { label: 'Giỏ hàng', href: '/cart' },
  ],
  brand: [
    { label: 'Cảm hứng', href: '/stories' },
    { label: 'Về HomeStore', href: '/about' },
  ],
};
