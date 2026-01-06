import api from "./axios";
import type { Product } from "@/types";

export const getDesserts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/desserts");
  return response.data;
};
