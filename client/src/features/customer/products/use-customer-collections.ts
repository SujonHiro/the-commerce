import {
  getCustomerBrands,
  getCustomerCategories,
  getCustomerProducts,
} from "@/features/customer/products/api.ts";
import {
  type ActiveFilterBadge,
  type CustomerProductFilter,
  type FacetKey,
} from "@/features/customer/products/product-list.shared.ts";
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

  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [colorsLoading, setColorsLoading] = useState(false);

  const initialLoading = categoriesLoading || brandsLoading;

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

  const hasActiveFilters = Boolean(
    filters.category || filters.brand || filters.color || filters.size,
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
      setCategoriesLoading(true);
      const response = await getCustomerCategories();
      setCategories(response ?? []);
    } catch (e) {
      console.log("something went wrong", e);
    } finally {
      setCategoriesLoading(false);
    }
  }

  //load brands
  async function loadCustomerBrands() {
    try {
      setBrandsLoading(true);
      const response = await getCustomerBrands();
      setBrands(response ?? []);
    } catch (e) {
      console.log("something went wrong", e);
    } finally {
      setBrandsLoading(false);
    }
  }

  //load products
  async function loadCustomerProducts(params: GetCustomerProductsParams) {
    try {
      setProductsLoading(true);

      const response = await getCustomerProducts(params);
      setProducts(response ?? []);
    } catch (e) {
      console.log("something went wrong", e);
    } finally {
      setProductsLoading(false);
    }
  }

  useEffect(() => {
    void loadCustomerCategories();
  }, []);
  useEffect(() => {
    void loadCustomerBrands();
  }, []);
  useEffect(() => {
    console.log("Query:", query);
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
  const clearFilters = () => {
    const nextValue = new URLSearchParams(searchParams);

    nextValue.delete("category");
    nextValue.delete("brand");
    nextValue.delete("color");
    nextValue.delete("size");

    updateParams(nextValue);
  };

  const toggleFacetFilter = (key: FacetKey, value: string) => {
    const nextValue = new URLSearchParams(searchParams);
    const currentValue = searchParams.get(key) || "";
    if (currentValue === value) {
      nextValue.delete(key, value);
    } else {
      nextValue.set(key, value);
    }

    updateParams(nextValue);
  };

  async function loadAvailableColors() {
    try {
      setColorsLoading(true);
      const data = await getCustomerProducts();
      const uniqueItem = new Set<string>();

      (data ?? []).forEach((item) => {
        item.colors.forEach((color) => uniqueItem.add(color));
      });

      setAvailableColors(
        Array.from(uniqueItem).sort((a, b) => a.localeCompare(b)),
      );
    } catch (error) {
      console.error("Failed to load colors:", error);
      setAvailableColors([]);
    } finally {
      setColorsLoading(false);
    }
  }
  useEffect(() => {
    loadAvailableColors();
  }, []);

  const activeFilterBadge = useMemo<ActiveFilterBadge[]>(() => {
    const items: ActiveFilterBadge[] = [];
    if (filters.category) {
      const found = categories.find((item) => item._id === filters.category);

      if (found) {
        items.push({
          key: "category",
          label: "Category",
          value: found?.name || filters.category,
        });
      }
    }
    if (filters.brand) {
      items.push({
        key: "brand",
        label: "Brand",
        value: filters.brand,
      });
    }
    if (filters.color) {
      items.push({
        key: "color",
        label: "Color",
        value: filters.color,
      });
    }
    if (filters.size) {
      items.push({
        key: "size",
        label: "Size",
        value: filters.size,
      });
    }
    return items;
  }, [categories, filters]);

  return {
    categories,
    brands,
    availableColors,
    products,
    loading: initialLoading,
    productsLoading,
    colorsLoading,
    sort,
    filters,
    changeSort,
    loadAvailableColors,
    activeFilterBadge,
    clearFilters,
    hasActiveFilters,
    toggleFacetFilter,
  };
};
