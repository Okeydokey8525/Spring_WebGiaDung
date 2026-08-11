import { CatalogItem } from '../model/catalog-item';

/**
 * DEVELOPMENT PRESENTATION FIXTURES
 *
 * These fixtures are for UI development ONLY.
 * They DO NOT represent production product data.
 * Pricing, stock, ratings, and backend entities are intentionally absent
 * because the backend commerce contract is deferred to a future milestone.
 */
export const catalogFixtures: readonly CatalogItem[] = [
  {
    id: 'fix-001',
    slug: 'ke-luu-tru-3-tang',
    name: 'Kệ lưu trữ 3 tầng',
    categoryKey: 'storage',
    categoryLabel: 'Lưu trữ',
    roomKey: 'living-room',
    roomLabel: 'Phòng khách',
    shortDescription:
      'Giải pháp sắp xếp gọn gàng cho không gian sống hiện đại.',
    mediaVariant: 'furniture',
    featuredOrder: 1,
  },
  {
    id: 'fix-002',
    slug: 'hop-bao-quan-da-nang',
    name: 'Hộp bảo quản đa năng',
    categoryKey: 'storage',
    categoryLabel: 'Lưu trữ',
    roomKey: 'all',
    roomLabel: 'Đa năng',
    shortDescription:
      'Hộp nắp đậy giúp bảo quản đồ dùng cá nhân an toàn khỏi bụi bẩn.',
    mediaVariant: 'storage',
    featuredOrder: 2,
  },
  {
    id: 'fix-003',
    slug: 'gio-vai-dung-do',
    name: 'Giỏ vải đựng đồ',
    categoryKey: 'textile',
    categoryLabel: 'Đồ vải',
    roomKey: 'bedroom',
    roomLabel: 'Phòng ngủ',
    shortDescription: 'Giỏ vải mềm mại, dễ dàng gập gọn khi không sử dụng.',
    mediaVariant: 'textile',
    featuredOrder: 3,
  },
  {
    id: 'fix-004',
    slug: 'khay-ban-an-go',
    name: 'Khay bàn ăn gỗ',
    categoryKey: 'kitchen',
    categoryLabel: 'Nhà bếp',
    roomKey: 'kitchen-dining',
    roomLabel: 'Bếp & Bàn ăn',
    shortDescription: 'Khay gỗ vân tự nhiên, tạo điểm nhấn ấm cúng cho bữa ăn.',
    mediaVariant: 'tabletop',
    featuredOrder: 4,
  },
  {
    id: 'fix-005',
    slug: 'ke-dau-giuong-toi-gian',
    name: 'Kệ đầu giường tối giản',
    categoryKey: 'furniture',
    categoryLabel: 'Nội thất',
    roomKey: 'bedroom',
    roomLabel: 'Phòng ngủ',
    shortDescription:
      'Thiết kế tinh gọn, vừa vặn cho những vật dụng thiết yếu trước khi ngủ.',
    mediaVariant: 'furniture',
    featuredOrder: 5,
  },
  {
    id: 'fix-006',
    slug: 'gio-do-giat-thoang-khi',
    name: 'Giỏ đồ giặt thoáng khí',
    categoryKey: 'bathroom',
    categoryLabel: 'Phòng tắm',
    roomKey: 'bathroom',
    roomLabel: 'Phòng tắm',
    shortDescription:
      'Thiết kế dạng lưới giúp quần áo luôn khô thoáng, tránh ẩm mốc.',
    mediaVariant: 'bathroom',
    featuredOrder: 6,
  },
  {
    id: 'fix-007',
    slug: 'ke-phong-tam-2-tang',
    name: 'Kệ phòng tắm 2 tầng',
    categoryKey: 'bathroom',
    categoryLabel: 'Phòng tắm',
    roomKey: 'bathroom',
    roomLabel: 'Phòng tắm',
    shortDescription:
      'Kệ sắp xếp chai lọ gọn gàng, tiết kiệm diện tích mặt bồn rửa.',
    mediaVariant: 'bathroom',
    featuredOrder: 7,
  },
  {
    id: 'fix-008',
    slug: 'khan-tam-soi-bong',
    name: 'Khăn tắm sợi bông',
    categoryKey: 'textile',
    categoryLabel: 'Đồ vải',
    roomKey: 'bathroom',
    roomLabel: 'Phòng tắm',
    shortDescription: 'Sợi bông mềm mại, thấm hút tốt và êm ái với làn da.',
    mediaVariant: 'textile',
    featuredOrder: 8,
  },
  {
    id: 'fix-009',
    slug: 'binh-dung-nuoc-thuy-tinh',
    name: 'Bình đựng nước thủy tinh',
    categoryKey: 'kitchen',
    categoryLabel: 'Nhà bếp',
    roomKey: 'kitchen-dining',
    roomLabel: 'Bếp & Bàn ăn',
    shortDescription:
      'Chất liệu thủy tinh chịu nhiệt, dễ dàng vệ sinh sau khi dùng.',
    mediaVariant: 'tabletop',
    featuredOrder: 9,
  },
  {
    id: 'fix-010',
    slug: 'den-ban-doc-sach',
    name: 'Đèn bàn đọc sách',
    categoryKey: 'decor',
    categoryLabel: 'Trang trí',
    roomKey: 'bedroom',
    roomLabel: 'Phòng ngủ',
    shortDescription:
      'Ánh sáng ấm áp, tập trung hỗ trợ việc đọc sách hiệu quả.',
    mediaVariant: 'neutral',
    featuredOrder: 10,
  },
];
