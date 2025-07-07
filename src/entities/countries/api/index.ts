import { BaseFetch } from "@/shared/api";
import type { Country } from "@/entities/countries/model";

async function getCountries() {
  return BaseFetch<Country[]>("/Countries");
}

export const countriesApi = {
  getCountries,
};
