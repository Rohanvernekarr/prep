import { Product, SearchResponse, CategoryResponse } from './types';

const BASE_URL = 'https://world.openfoodfacts.org';

export async function getProducts(page = 1, pageSize = 24): Promise<SearchResponse> {
    try {
        const response = await fetch(
            `${BASE_URL}/cgi/search.pl?search_simple=1&action=process&json=1&page=${page}&page_size=${pageSize}&fields=code,product_name,brands,image_url,nutrition_grades,categories,ingredients_text,nutriments`
        );
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return { count: 0, page: 1, page_count: 0, page_size: pageSize, products: [], skip: 0 };
    }
}

export async function searchProducts(query: string, page = 1, pageSize = 24): Promise<SearchResponse> {
    try {
        const response = await fetch(
            `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}&page_size=${pageSize}&fields=code,product_name,brands,image_url,nutrition_grades,categories,ingredients_text,nutriments`
        );
        if (!response.ok) throw new Error('Failed to search products');
        return await response.json();
    } catch (error) {
        console.error('Error searching products:', error);
        return { count: 0, page: 1, page_count: 0, page_size: pageSize, products: [], skip: 0 };
    }
}

export async function getProductByBarcode(barcode: string): Promise<Product | null> {
    try {
        const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
        if (!response.ok) return null;
        const data = await response.json();
        return data.product || null;
    } catch (error) {
        console.error('Error fetching product by barcode:', error);
        return null;
    }
}

export async function getCategories(): Promise<CategoryResponse> {
    try {
        const response = await fetch(`${BASE_URL}/categories.json`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { tags: [] };
    }
}

export async function getProductsByCategory(category: string, page = 1, pageSize = 24): Promise<SearchResponse> {
    try {
        const response = await fetch(
            `${BASE_URL}/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${encodeURIComponent(category)}&json=1&page=${page}&page_size=${pageSize}&fields=code,product_name,brands,image_url,nutrition_grades,categories,ingredients_text,nutriments`
        );

        if (!response.ok) throw new Error('Failed to fetch products by category');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return { count: 0, page: 1, page_count: 0, page_size: pageSize, products: [], skip: 0 };
    }
}
