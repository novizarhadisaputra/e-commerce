export interface ProductReview {
    rating: number;
    comment: string;
    date: string;
    reviewer: {
        name: string;
        email: string;
    }
};

export interface ProductDimension {
    width: number;
    height: number;
    depth: number;
};

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discount_percentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: ProductDimension;
    warranty_information: string;
    shipping_information: string;
    availability_status: string;
    reviews: ProductReview[];
    return_policy: string;
    minimum_order_quantity: number;
    images: string[];
    thumbnail: string;
}