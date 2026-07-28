export type Category = "cameras" | "plan" | "sensors" | "accessories";

export interface Variant {
  id: string;
  label: string;
  image: string;
}

export interface Product {
  id: string;
  category: Category;
  image: string;
  title: string;
  description?: string;
  badge?: string;
  variants?: Variant[];
  price: number;
  compareAt?: number;
  initialQuantities: Record<string, number>;
  locked?: boolean;
}

const img = (path: string) => path;

export const products: Product[] = [
  {
    id: "cam-v4",
    category: "cameras",
    image: img("/products/camera-1.png"),
    title: "Wyze Cam v4",
    description: "The clearest Wyze Cam ever made.",
    badge: "Save 22%",
    price: 27.98,
    compareAt: 35.98,
    variants: [
      {
        id: "white",
        label: "White",
        image: img("/products/variants/cameras/camera-1/white.png"),
      },
      {
        id: "grey",
        label: "Grey",
        image: img("/products/variants/cameras/camera-1/grey.png"),
      },
      {
        id: "black",
        label: "Black",
        image: img("/products/variants/cameras/camera-1/black.png"),
      },
    ],
    initialQuantities: { white: 1, grey: 5, black: 0 },
  },
  {
    id: "cam-pan-v3",
    category: "cameras",
    image: img("/products/camera-2.png"),
    title: "Wyze Cam Pan v3",
    description: "360° pan and 180° tilt security camera.",
    badge: "Save 12%",
    price: 34.98,
    compareAt: 39.98,
    variants: [
      {
        id: "white",
        label: "White",
        image: img("/products/variants/cameras/camera-2/white.png"),
      },
      {
        id: "black",
        label: "Black",
        image: img("/products/variants/cameras/camera-2/black.png"),
      },
    ],
    initialQuantities: { white: 2, black: 0 },
  },
  {
    id: "cam-floodlight-v2",
    category: "cameras",
    image: img("/products/camera-3.png"),
    title: "Wyze Cam Floodlight v2",
    description:
      "2K floodlight camera with a 160° wide-angle view for your garage.",
    badge: "Save 22%",
    price: 69.98,
    compareAt: 89.98,
    variants: [
      {
        id: "white",
        label: "White",
        image: img("/products/variants/cameras/camera-3/white.png"),
      },
      {
        id: "black",
        label: "Black",
        image: img("/products/variants/cameras/camera-3/black.png"),
      },
    ],
    initialQuantities: { white: 0, black: 0 },
  },
  {
    id: "duo-doorbell",
    category: "cameras",
    image: img("/products/camera-4.png"),
    title: "Wyze Duo Cam Doorbell",
    description: "Two cameras. Two views. Double the porch protection.",
    price: 69.98,
    initialQuantities: { default: 0 },
  },
  {
    id: "battery-cam-pro",
    category: "cameras",
    image: img("/products/camera-5.png"),
    title: "Wyze Battery Cam Pro",
    description: "Protect anywhere. See everything in 2.5K HDR.",
    price: 89.98,
    variants: [
      {
        id: "white",
        label: "White",
        image: img("/products/variants/cameras/camera-5/white.png"),
      },
      {
        id: "black",
        label: "Black",
        image: img("/products/variants/cameras/camera-5/black.png"),
      },
    ],
    initialQuantities: { white: 0, black: 0 },
  },
  {
    id: "cam-unlimited",
    category: "plan",
    image: img("/products/plans/plan.svg"),
    title: "Cam Unlimited",
    description: "Unlimited video cloud storage for all your cameras.",
    price: 9.99,
    compareAt: 12.99,
    initialQuantities: { default: 1 },
  },
  {
    id: "entry-sensor",
    category: "sensors",
    image: img("/products/sensors/sensor-1.png"),
    title: "Wyze Entry Sensor",
    description: "Know when doors and windows open.",
    price: 19.98,
    initialQuantities: { default: 2 },
  },
  {
    id: "motion-sensor",
    category: "sensors",
    image: img("/products/sensors/sensor-2.png"),
    title: "Wyze Motion Sensor",
    description: "Smart motion detection where it matters.",
    price: 24.98,
    initialQuantities: { default: 1 },
  },
  {
    id: "home-monitoring",
    category: "accessories",
    image: img("/products/accessories.png"),
    title: "Wyze Home Monitoring",
    description: "Professional protection for your home.",
    price: 4.99,
    initialQuantities: { default: 1 },
  },
];

export const stepMeta = [
  {
    category: "cameras" as const,
    title: "Choose your cameras",
    icon: "/icons/cameras.svg",
  },
  {
    category: "plan" as const,
    title: "Choose your plan",
    icon: "/icons/plan.svg",
  },
  {
    category: "sensors" as const,
    title: "Choose your sensors",
    icon: "/icons/sensors.svg",
  },
  {
    category: "accessories" as const,
    title: "Add extra protection",
    icon: "/icons/protection.svg",
  },
];
