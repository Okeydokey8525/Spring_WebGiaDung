import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CommerceEmptyTable } from '@/components/admin/commerce/commerce-empty-table';
import { OrderFlow } from '@/components/admin/commerce/order-flow';

export const metadata: Metadata = {
  title: 'Đơn hàng',
};

const columns = [
  'Mã đơn',
  'Khách hàng',
  'Ngày tạo',
  'Trạng thái đơn',
  'Thanh toán',
  'Tổng tiền',
  'Thao tác',
] as const;

export default function AdminOrdersPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Thương mại"
        title="Đơn hàng"
        description="Khu vực vận hành đơn hàng từ chờ thanh toán hoặc xác nhận đến đóng gói, giao hàng và hoàn tất."
      />

      <div className="mb-6">
        <OrderFlow />
      </div>

      <CommerceEmptyTable
        columns={columns}
        title="Chưa có đơn hàng"
        description="Khi Order backend và checkout được triển khai, bảng này sẽ hiển thị mã đơn, khách hàng, trạng thái đơn, trạng thái thanh toán và tổng tiền thật."
      />
    </div>
  );
}
