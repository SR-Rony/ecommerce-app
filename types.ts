// src/types.ts
export type Product = {
  _id: string;
  title: string;
  price: number;
  image?: { url: string }[];
};

export type BannerItem = {
  id: string;
  img: string;
  label: string;
};
