import { BaseFetch } from "@/shared/api";
import type { Country } from "../model";

async function getCountries() {
  return BaseFetch<Country[]>("/Countries");
}

export const countriesApi = {
  getCountries,
};
