export type EditorialFeature = {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export type HomeValue = {
  id: string;
  title: string;
  description: string;
};

export const editorialFeatures: EditorialFeature[] = [
  {
    id: 'everyday-storage',
    title: 'Sắp xếp dễ hơn mỗi ngày',
    description:
      'Từ hộp chia ngăn đến kệ lưu trữ, bắt đầu với những vật dụng giúp mỗi món đồ có chỗ riêng và dễ tìm khi cần.',
    href: '/products?category=storage',
    linkLabel: 'Xem đồ dùng lưu trữ',
  },
  {
    id: 'daily-kitchen',
    title: 'Tiện ích cho căn bếp hằng ngày',
    description:
      'Khám phá các dụng cụ phục vụ việc chuẩn bị, bảo quản và sử dụng thực phẩm theo một luồng tìm kiếm rõ ràng.',
    href: '/products?category=kitchen',
    linkLabel: 'Khám phá đồ dùng nhà bếp',
  },
];

export const homeValues: HomeValue[] = [
  {
    id: 'clear-categories',
    title: 'Danh mục rõ ràng',
    description:
      '10 nhóm sản phẩm giúp việc khám phá và thu hẹp lựa chọn trở nên dễ hơn.',
  },
  {
    id: 'convenient-search',
    title: 'Tìm kiếm thuận tiện',
    description:
      'Tìm sản phẩm theo từ khóa và tiếp tục kết hợp với danh mục phù hợp.',
  },
  {
    id: 'daily-needs',
    title: 'Nhiều nhu cầu hằng ngày',
    description:
      'Từ nhà bếp, lưu trữ đến vệ sinh, học tập và các tiện ích cá nhân.',
  },
];
