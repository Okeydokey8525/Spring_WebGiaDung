export const productEditorTabs = [
  { key: 'info', label: 'Thông tin' },
  { key: 'media', label: 'Hình ảnh' },
  { key: 'attributes', label: 'Thuộc tính' },
  { key: 'variants', label: 'Biến thể' },
  { key: 'pricing', label: 'Giá bán' },
  { key: 'inventory', label: 'Tồn kho' },
  { key: 'seo', label: 'SEO' },
] as const;

export type ProductEditorTab = (typeof productEditorTabs)[number]['key'];

export function parseProductEditorTab(
  value: string | string[] | undefined
): ProductEditorTab {
  if (typeof value !== 'string') return 'info';
  return productEditorTabs.find((tab) => tab.key === value)?.key ?? 'info';
}
