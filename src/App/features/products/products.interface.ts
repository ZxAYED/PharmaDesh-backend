
export const MedicineCategoriesArray = [
  "Prescription Medicines",
  "Over-the-Counter (OTC) Medicines",
  "Supplements & Vitamins",
  "Personal Care & Wellness",
  "Ayurvedic & Herbal Medicines"
] as const;

export interface IProduct {
  name: string;
  description: string;
  advices: string[];
  price: number;
  stock: number;
  category: "Prescription Medicines" | "Over-the-Counter (OTC) Medicines" | "Supplements & Vitamins" | "Personal Care & Wellness" | "Ayurvedic & Herbal Medicines";
  rating: number;
  imageUrls: string[];
  manufacturer: string;
  expiryDate: string;
  requiresPrescription: boolean;
};
