export type RoomDiscoveryItem = {
  id: string;
  title: string;
  description: string;
  href: string;
};

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

export const roomDiscovery: RoomDiscoveryItem[] = [
  {
    id: 'living-room',
    title: 'Phòng khách',
    description: 'Không gian sinh hoạt chung ấm cúng và thoải mái.',
    href: '/rooms/living-room',
  },
  {
    id: 'bedroom',
    title: 'Phòng ngủ',
    description: 'Nơi nghỉ ngơi riêng tư, yên tĩnh và thư giãn.',
    href: '/rooms/bedroom',
  },
  {
    id: 'kitchen-dining',
    title: 'Bếp & bàn ăn',
    description: 'Trái tim của ngôi nhà với những bữa ăn sum vầy.',
    href: '/rooms/kitchen-dining',
  },
  {
    id: 'bathroom',
    title: 'Phòng tắm',
    description: 'Góc thanh lọc cơ thể và bắt đầu ngày mới.',
    href: '/rooms/bathroom',
  },
];

export const editorialFeatures: EditorialFeature[] = [
  {
    id: 'simplicity',
    title: 'Sống gọn hơn',
    description:
      'Sắp xếp lại không gian sống để tạo ra sự thoáng đãng cho tâm trí. Chọn lọc những vật dụng thực sự mang lại niềm vui và giá trị sử dụng hằng ngày.',
    href: '/collections/minimalism',
    linkLabel: 'Khám phá bộ sưu tập',
  },
  {
    id: 'dining-moments',
    title: 'Bàn ăn cho những khoảnh khắc thường ngày',
    description:
      'Biến mỗi bữa ăn thành một trải nghiệm đáng nhớ với những thiết kế gốm sứ tinh tế, kết nối mọi thành viên trong gia đình.',
    href: '/collections/dining',
    linkLabel: 'Xem chi tiết',
  },
];

export const homeValues: HomeValue[] = [
  {
    id: 'easy-living',
    title: 'Dễ sống cùng',
    description:
      'Thiết kế chú trọng vào sự thoải mái và tiện dụng trong nhịp sống hằng ngày.',
  },
  {
    id: 'intentional',
    title: 'Tối giản có chủ đích',
    description:
      'Chỉ giữ lại những gì thực sự cần thiết, mang đến vẻ đẹp của sự tinh tế.',
  },
  {
    id: 'daily-rhythm',
    title: 'Phù hợp với nhịp sống',
    description:
      'Các sản phẩm hòa quyện tự nhiên vào không gian và thói quen sinh hoạt của bạn.',
  },
];
