export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
};

export type AdminNavSection = {
  label: string;
  items: readonly AdminNavItem[];
};

export const adminNavigation: readonly AdminNavSection[] = [
  {
    label: 'Tổng quan',
    items: [
      {
        href: '/admin',
        label: 'Dashboard',
        description: 'Tổng quan vận hành cửa hàng',
      },
    ],
  },
  {
    label: 'Sản phẩm',
    items: [
      {
        href: '/admin/products',
        label: 'Sản phẩm',
        description: 'Quản lý danh sách sản phẩm',
      },
      {
        href: '/admin/categories',
        label: 'Danh mục',
        description: 'Cấu trúc danh mục sản phẩm',
      },
      {
        href: '/admin/brands',
        label: 'Thương hiệu',
        description: 'Quản lý thương hiệu',
      },
      {
        href: '/admin/attributes',
        label: 'Thuộc tính',
        description: 'Thuộc tính và giá trị sản phẩm',
      },
      {
        href: '/admin/media',
        label: 'Hình ảnh',
        description: 'Thư viện và hình ảnh sản phẩm',
      },
    ],
  },
  {
    label: 'Thương mại',
    items: [
      {
        href: '/admin/pricing',
        label: 'Giá bán',
        description: 'Quản lý giá sản phẩm',
      },
      {
        href: '/admin/inventory',
        label: 'Tồn kho',
        description: 'Theo dõi tồn kho',
      },
      {
        href: '/admin/orders',
        label: 'Đơn hàng',
        description: 'Quản lý đơn hàng',
      },
      {
        href: '/admin/payments',
        label: 'Thanh toán',
        description: 'Theo dõi trạng thái thanh toán',
      },
      {
        href: '/admin/customers',
        label: 'Khách hàng',
        description: 'Quản lý khách hàng',
      },
    ],
  },
  {
    label: 'Nội dung',
    items: [
      {
        href: '/admin/homepage',
        label: 'Trang chủ',
        description: 'Nội dung hiển thị tại storefront',
      },
      {
        href: '/admin/banners',
        label: 'Banner',
        description: 'Quản lý banner và vị trí hiển thị',
      },
    ],
  },
] as const;
