import type { CatalogItem } from '../model/catalog-item';

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
    categoryLabel: 'Lưu trữ & sắp xếp',
    shortDescription:
      'Kệ ba tầng giúp phân chia và sắp xếp các vật dụng thường dùng.',
    mediaVariant: 'storage',
    featuredOrder: 1,
  },
  {
    id: 'fix-002',
    slug: 'hop-bao-quan-da-nang',
    name: 'Hộp bảo quản đa năng',
    categoryKey: 'storage',
    categoryLabel: 'Lưu trữ & sắp xếp',
    shortDescription:
      'Hộp có nắp dành cho việc gom và cất các đồ dùng nhỏ hằng ngày.',
    mediaVariant: 'storage',
    featuredOrder: 2,
  },
  {
    id: 'fix-003',
    slug: 'gio-vai-dung-do',
    name: 'Giỏ vải đựng đồ',
    categoryKey: 'household',
    categoryLabel: 'Gia dụng',
    shortDescription:
      'Giỏ đựng linh hoạt cho quần áo và các vật dụng sinh hoạt.',
    mediaVariant: 'textile',
    featuredOrder: 3,
  },
  {
    id: 'fix-004',
    slug: 'khay-nha-bep-da-nang',
    name: 'Khay nhà bếp đa năng',
    categoryKey: 'kitchen',
    categoryLabel: 'Nhà bếp',
    shortDescription:
      'Khay dùng để tập hợp và di chuyển các vật dụng nhà bếp gọn hơn.',
    mediaVariant: 'tabletop',
    featuredOrder: 4,
  },
  {
    id: 'fix-005',
    slug: 'hop-chia-ngan-da-nang',
    name: 'Hộp chia ngăn đa năng',
    categoryKey: 'household',
    categoryLabel: 'Gia dụng',
    shortDescription:
      'Các ngăn riêng giúp phân loại phụ kiện và đồ dùng kích thước nhỏ.',
    mediaVariant: 'storage',
    featuredOrder: 5,
  },
  {
    id: 'fix-006',
    slug: 'dung-cu-ve-sinh-can-dai',
    name: 'Dụng cụ vệ sinh cán dài',
    categoryKey: 'cleaning',
    categoryLabel: 'Vệ sinh nhà cửa',
    shortDescription:
      'Dụng cụ hỗ trợ tiếp cận các bề mặt khi thực hiện việc vệ sinh.',
    mediaVariant: 'neutral',
    featuredOrder: 6,
  },
  {
    id: 'fix-007',
    slug: 'ke-phong-tam-2-tang',
    name: 'Kệ phòng tắm 2 tầng',
    categoryKey: 'bathroom',
    categoryLabel: 'Phòng tắm',
    shortDescription:
      'Kệ hai tầng dành cho việc sắp xếp các chai lọ và đồ dùng phòng tắm.',
    mediaVariant: 'bathroom',
    featuredOrder: 7,
  },
  {
    id: 'fix-008',
    slug: 'gio-do-giat-gap-gon',
    name: 'Giỏ đồ giặt gấp gọn',
    categoryKey: 'household',
    categoryLabel: 'Gia dụng',
    shortDescription:
      'Giỏ tập hợp đồ cần giặt và có thể gấp lại khi không sử dụng.',
    mediaVariant: 'textile',
    featuredOrder: 8,
  },
  {
    id: 'fix-009',
    slug: 'binh-nuoc-mang-theo',
    name: 'Bình nước mang theo',
    categoryKey: 'travel-utility',
    categoryLabel: 'Du lịch & tiện ích',
    shortDescription:
      'Bình đựng nước nhỏ gọn cho việc học tập, làm việc và di chuyển.',
    mediaVariant: 'tabletop',
    featuredOrder: 9,
  },
  {
    id: 'fix-010',
    slug: 'den-ban-hoc',
    name: 'Đèn bàn học',
    categoryKey: 'office-study',
    categoryLabel: 'Học tập & văn phòng',
    shortDescription:
      'Đèn đặt bàn dành cho góc đọc, học tập hoặc làm việc cá nhân.',
    mediaVariant: 'neutral',
    featuredOrder: 10,
  },
];
