/** Uma página de um material (ex.: "cotas-06"). */
export interface GalleryPage {
  id: string;
  group: string;
  /** Número da página, começando em 1. */
  num: number;
  /** "06" */
  label: string;
}

/** Monta as páginas de um material: ids "<grupo>-01" … "<grupo>-NN". */
export function buildPages(group: string, count: number): GalleryPage[] {
  return Array.from({ length: Math.max(0, count) }, (_, i) => {
    const num = i + 1;
    const label = String(num).padStart(2, "0");
    return { id: `${group}-${label}`, group, num, label };
  });
}

/** Próximo índice num carrossel que dá a volta: -1 vira o último, n vira 0. */
export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}
