import { Product } from '../../domain/models/Product';
import { api } from './AxiosInstance';

export interface ProductPaginatedResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export const ProductApi = {
    async getAll(page: number, limit: number = 10): Promise<ProductPaginatedResponse> {
        const skip = (page - 1) * limit;
        const response = await api.get(`/products?limit=${limit}&skip=${skip}`)
        return response.data
    },

    async getById(id: number): Promise<Product> {
        const response = await api.get(`/products/${id}`)
        return response.data
    },
}
