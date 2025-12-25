export interface Product {
    code: string;
    product_name?: string;
    product_name_en?: string;
    brands?: string;
    categories?: string;
    categories_tags?: string[];
    image_url?: string;
    image_front_url?: string;
    image_small_url?: string;
    ingredients_text?: string;
    ingredients_text_en?: string;
    nutrition_grades?: string;
    nutriments?: Nutriments;
    labels?: string;
    labels_tags?: string[];
    quantity?: string;
    serving_size?: string;
    nova_group?: number;
    ecoscore_grade?: string;
}

export interface Nutriments {
    "energy-kcal_100g"?: number;
    "energy-kcal"?: number;
    "fat_100g"?: number;
    "saturated-fat_100g"?: number;
    "carbohydrates_100g"?: number;
    "sugars_100g"?: number;
    "proteins_100g"?: number;
    "salt_100g"?: number;
    "fiber_100g"?: number;
    [key: string]: number | undefined;
}

export interface SearchResponse {
    count: number;
    page: number;
    page_count: number;
    page_size: number;
    products: Product[];
    skip: number;
}

export interface CategoryResponse {
    tags: {
        id: string;
        name: string;
        products: number;
        url: string;
    }[];
}
