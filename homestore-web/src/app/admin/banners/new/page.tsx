import type { Metadata } from 'next';
import { BannerCreatePreview } from '@/components/admin/content/banner-create-preview';

export const metadata: Metadata = {
  title: 'Tạo banner',
};

export default function NewBannerPage() {
  return <BannerCreatePreview />;
}
