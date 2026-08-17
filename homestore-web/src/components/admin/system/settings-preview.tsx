const settingsGroups = [
  {
    key: 'store',
    title: 'Thông tin cửa hàng',
    description: 'Tên hiển thị, mô tả ngắn và thông tin nhận diện cơ bản.',
    fields: [
      ['Tên cửa hàng', 'HomeStore'],
      ['Mô tả ngắn', 'Đồ dùng và tiện ích cho cuộc sống hằng ngày'],
    ],
  },
  {
    key: 'branding',
    title: 'Branding',
    description: 'Logo, favicon và cấu hình nhận diện sẽ nối với Media sau này.',
    fields: [
      ['Logo cửa hàng', 'Chưa có cấu hình media'],
      ['Favicon', 'Chưa có cấu hình media'],
    ],
  },
  {
    key: 'contact',
    title: 'Liên hệ',
    description: 'Thông tin hỗ trợ khách hàng chưa được lưu trong nguồn cấu hình hiện tại.',
    fields: [
      ['Email hỗ trợ', 'Chưa cấu hình'],
      ['Số điện thoại', 'Chưa cấu hình'],
      ['Địa chỉ cửa hàng', 'Chưa cấu hình'],
    ],
  },
  {
    key: 'payment',
    title: 'Thanh toán',
    description: 'COD và chuyển khoản là hướng V1, nhưng chưa có Payment configuration thật.',
    fields: [
      ['COD', 'Dự kiến V1 · chưa kích hoạt runtime'],
      ['Chuyển khoản', 'Dự kiến V1 · chưa có tài khoản/QR cấu hình'],
    ],
  },
  {
    key: 'shipping',
    title: 'Vận chuyển',
    description: 'Phương thức, vùng giao hàng và phí vận chuyển sẽ được cấu hình sau khi checkout tồn tại.',
    fields: [
      ['Phương thức giao hàng', 'Chưa cấu hình'],
      ['Phí vận chuyển', 'Chưa cấu hình'],
    ],
  },
  {
    key: 'system',
    title: 'Hệ thống',
    description: 'Các thiết lập runtime chỉ được mở khi Auth/Admin protection và backend config đã sẵn sàng.',
    fields: [
      ['Múi giờ', 'Chưa quản lý từ admin'],
      ['Tiền tệ', 'Chưa quản lý từ admin'],
      ['Chế độ bảo trì', 'Chưa quản lý từ admin'],
    ],
  },
] as const;

export function SettingsPreview() {
  return (
    <div className="space-y-5">
      {settingsGroups.map((group) => (
        <section
          key={group.key}
          id={group.key}
          className="scroll-mt-24 rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-primary)]">
                {group.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-muted)]">
                {group.description}
              </p>
            </div>
            <span className="w-fit rounded-[var(--radius-pill)] bg-[var(--color-brand-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-hover)]">
              Preview
            </span>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {group.fields.map(([label, value]) => (
              <label key={label} className="block">
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  {label}
                </span>
                <input
                  readOnly
                  value={value}
                  className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-canvas)] px-4 text-sm text-[var(--color-muted)] outline-none"
                />
              </label>
            ))}
          </div>

          <div className="mt-5 border-t border-[var(--color-border)] pt-5">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white opacity-55"
            >
              Lưu cấu hình
            </button>
            <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">
              Thao tác lưu bị khóa để không tạo cấu hình giả ở frontend.
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
