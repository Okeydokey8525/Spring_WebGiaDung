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
    id: 'practical-everyday',
    title: 'Thiết thực mỗi ngày',
    description:
      'Tập trung vào những vật dụng phục vụ các nhu cầu sinh hoạt quen thuộc.',
  },
  {
    id: 'easy-discovery',
    title: 'Dễ tìm, dễ chọn',
    description:
      'Danh mục rõ ràng giúp bạn đi thẳng đến nhóm đồ dùng đang cần.',
  },
  {
    id: 'varied-needs',
    title: 'Phù hợp nhiều nhu cầu',
    description:
      'Một cửa hàng cho nhiều việc thường ngày, từ nhà bếp đến học tập và di chuyển.',
  },
];
