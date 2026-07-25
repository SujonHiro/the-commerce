import {
  getCustomerBrands,
  getCustomerCategories,
  getCustomerProducts,
} from "@/features/customer/products/api.ts";
import type { CustomerProductFilter } from "@/features/customer/products/product-list.shared.ts";
import type {
  CustomerProduct,
  GetCustomerProductsParams,
  ProductBrand,
  ProductCategory,
  ProductSort,
} from "@/features/customer/products/types.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

export const useCustomerCollections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<CustomerProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [brands, setBrands] = useState<ProductBrand[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  //filter by category,brand,size,color
  const filters = useMemo<CustomerProductFilter>(
    () => ({
      category: searchParams.get("category") || "",
      brand: searchParams.get("brand") || "",
      color: searchParams.get("color") || "",
      size: searchParams.get("size") || "",
    }),
    [searchParams],
  );

  //sort byt high -low and low-high
  //const sortParam = searchParams.get("sort");

  const sort = (searchParams.get("sort") as ProductSort) || "recent";
  //   const sort: ProductSort =
  //     sortParam === "recent" ||
  //     sortParam === "price-low" ||
  //     sortParam === "price-high"
  //       ? sortParam
  //       : "recent";

  const query = useMemo<GetCustomerProductsParams>(
    () => ({
      category: filters.category || undefined,
      brand: filters.brand || undefined,
      color: filters.color || undefined,
      sort,
      size: filters.size || undefined,
    }),
    [filters, sort],
  );

  function updateParams(next: URLSearchParams) {
    setSearchParams(next);
  }

  //load categories
  async function loadCustomerCategories() {
    try {
      setLoading(true);
      const response = await getCustomerCategories();
      setCategories(response ?? []);
    } catch (e) {
      console.log("something went wrong", e);
    } finally {
      setLoading(false);
    }
  }

  //load brands
  async function loadCustomerBrands() {
    try {
      setLoading(true);
      const response = await getCustomerBrands();
      setBrands(response ?? []);
    } catch (e) {
      console.log("something went wrong", e);
    } finally {
      setLoading(false);
    }
  }

  //load products
  async function loadCustomerProducts(params: GetCustomerProductsParams) {
    try {
      setLoading(true);
      const response = await getCustomerProducts(params);
      setProducts(response ?? []);
    } catch (e) {
      console.log("something went wrong", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCustomerCategories();
  }, []);
  useEffect(() => {
    void loadCustomerBrands();
  }, []);
  useEffect(() => {
    void loadCustomerProducts(query);
  }, [query]);

  const changeSort = useCallback(
    (value: ProductSort) => {
      const nextValue = new URLSearchParams(searchParams);
      if (value === "recent") {
        nextValue.delete("sort");
      } else {
        nextValue.set("sort", value);
      }
      updateParams(nextValue);
    },
    [searchParams, updateParams],
  );

  return {
    categories,
    brands,
    availableColors,
    products,
    loading,
    sort,
    filters,
    changeSort,
  };
};
