import type { ImageMetadata } from "astro";

/** Imagens do TEA-GV (src/assets/tea-gv/<nome>.webp), resolvidas no build. */
const files = import.meta.glob<{ default: ImageMetadata }>("../assets/tea-gv/*.{webp,png}", {
  eager: true,
});

export function teaImage(name: string): ImageMetadata {
  const file = files[`../assets/tea-gv/${name}.webp`] ?? files[`../assets/tea-gv/${name}.png`];
  if (!file) throw new Error(`Imagem do TEA-GV não encontrada: ${name}`);
  return file.default;
}
