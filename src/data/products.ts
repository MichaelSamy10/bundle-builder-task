export interface ColorVariant {
  label: string;
  /** any valid CSS color value */
  color: string;
}

export interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  badge?: string;
  variants?: ColorVariant[];
  compareAtPrice?: number; // struck-through price, omit when no discount
  price: number;
  defaultQty?: number;
}

export const products: Product[] = [
  {
    id: 1,
    image: "./Wyze_Cam_V4_01.0001.png.png",
    title: "Wyze Cam v4",
    description: "The clearest Wyze Cam ever made.",
    badge: "Save 22%",
    variants: [
      { label: "White", color: "#ffffff" },
      { label: "Grey",  color: "#9ca3af" },
      { label: "Black", color: "#1f2937" },
    ],
    compareAtPrice: 35.98,
    price: 27.98,
    defaultQty: 1,
  },
  {
    id: 2,
    image: "./Wyze_Cam_Pan_V3_01.0001.png.png",
    title: "Wyze Cam Pan v3",
    description: "360° pan and 180° tilt security camera.",
    badge: "Save 12%",
    variants: [
      { label: "White", color: "#ffffff" },
      { label: "Black", color: "#1f2937" },
    ],
    compareAtPrice: 39.98,
    price: 34.98,
    defaultQty: 2,
  },
  {
    id: 3,
    image: "./Wyze_Cam_Floodlight_V2_01.0001.png.png",
    title: "Wyze Cam Floodlight v2",
    description: "2K floodlight camera with a 160° wide-angle view for your garage.",
    badge: "Save 22%",
    variants: [
      { label: "White", color: "#ffffff" },
      { label: "Black", color: "#1f2937" },
    ],
    compareAtPrice: 89.98,
    price: 69.98,
    defaultQty: 0,
  },
  {
    id: 4,
    image: "./Wyze_Video_Doorbell_Pro_01.0001.png.png",
    title: "Wyze Duo Cam Doorbell",
    description: "Two cameras. Two views. Double the porch protection.",
    // no badge, no variants
    price: 69.98,
    defaultQty: 0,
  },
  {
    id: 5,
    image: "./Wyze_Battery_Cam_Pro_01.0001.png.png",
    title: "Wyze Battery Cam Pro",
    description: "Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.",
    variants: [
      { label: "White", color: "#ffffff" },
      { label: "Black", color: "#1f2937" },
    ],
    price: 89.98,
    defaultQty: 0,
  },
];
