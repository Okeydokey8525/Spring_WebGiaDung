export type StoreCategoryKey =
  | 'kitchen'
  | 'household'
  | 'home-appliances'
  | 'storage'
  | 'cleaning'
  | 'bathroom'
  | 'personal-care'
  | 'office-study'
  | 'travel-utility'
  | 'other';

export interface StoreCategory {
  readonly key: StoreCategoryKey;
  readonly label: string;
  readonly description: string;
  readonly href: string;
}

/**
 * Frontend presentation taxonomy for fixture-stage discovery.
 * This is not a backend Category contract and contains no persisted IDs.
 */
export const storeCategories: readonly StoreCategory[] = [
  {
    key: 'kitchen',
    label: 'Nhà bếp',
    description: 'Dụng cụ phục vụ việc chuẩn bị, bảo quản và dùng bữa.',
    href: '/products?category=kitchen',
  },
  {
    key: 'household',
    label: 'Gia dụng',
    description: 'Đồ dùng thiết thực cho các sinh hoạt thường ngày.',
    href: '/products?category=household',
  },
  {
    key: 'home-appliances',
    label: 'Điện gia dụng',
    description: 'Nhóm thiết bị điện nhỏ dành cho nhu cầu gia đình.',
    href: '/products?category=home-appliances',
  },
  {
    key: 'storage',
    label: 'Lưu trữ & sắp xếp',
    description: 'Kệ, hộp và phụ kiện giúp đồ dùng có vị trí rõ ràng.',
    href: '/products?category=storage',
  },
  {
    key: 'cleaning',
    label: 'Vệ sinh nhà cửa',
    description: 'Dụng cụ hỗ trợ các công việc làm sạch hằng ngày.',
    href: '/products?category=cleaning',
  },
  {
    key: 'bathroom',
    label: 'Phòng tắm',
    description: 'Đồ dùng và phụ kiện dành cho sinh hoạt phòng tắm.',
    href: '/products?category=bathroom',
  },
  {
    key: 'personal-care',
    label: 'Chăm sóc cá nhân',
    description: 'Đồ dùng hỗ trợ những thói quen chăm sóc cá nhân.',
    href: '/products?category=personal-care',
  },
  {
    key: 'office-study',
    label: 'Học tập & văn phòng',
    description: 'Vật dụng cho góc học tập và công việc thường ngày.',
    href: '/products?category=office-study',
  },
  {
    key: 'travel-utility',
    label: 'Du lịch & tiện ích',
    description: 'Những món gọn nhẹ cho việc di chuyển và sử dụng linh hoạt.',
    href: '/products?category=travel-utility',
  },
  {
    key: 'other',
    label: 'Đồ dùng khác',
    description: 'Các tiện ích đời sống chưa thuộc những nhóm chính.',
    href: '/products?category=other',
  },
];

const homepageCategoryKeys: readonly StoreCategoryKey[] = [
  'kitchen',
  'household',
  'storage',
  'cleaning',
  'bathroom',
  'travel-utility',
];

export const homepageCategories = storeCategories.filter((category) =>
  homepageCategoryKeys.includes(category.key)
);
