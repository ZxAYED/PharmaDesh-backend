
export const MedicineCategoriesArray = [
  "Medicine",
  "Wellness",
  "Healthcare",
  "Personal Care",
  "Prescription Medicines",
  "Supplements & Vitamins"
] as const;

export interface IProduct {
  name: string;
  description: string;
  advices: string[];
  price: number;
  inStock: boolean;
  quantity: number;
  category: "Prescription Medicines" | "Personal Care" | "Supplements & Vitamins" | "Wellness" | "Healthcare" | "Medicine";
  rating: number;
  profileImage: string;
  manufacturer: string;
  expiryDate: string;
  requiresPrescription: boolean;
};
