import straightImg from "@/assets/straight.jpg";
import bodyImg from "@/assets/body.jpg";
import deepImg from "@/assets/deep.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  texture: string;
  description: string;
  lengths: number[];
  price_cents: number;
  image_key: string;
  featured: boolean;
};

export const productImages: Record<string, string> = {
  straight: straightImg,
  body: bodyImg,
  deep: deepImg,
};

export function imageFor(key: string) {
  return productImages[key] ?? straightImg;
}

export function formatPrice(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export const TEXTURES = ["Straight", "Body Wave", "Deep Wave"] as const;
