import { Product } from '../../domain/models/Product';
import { ProductApi, ProductPaginatedResponse } from '../../infrastructure/api/ProductApi';

export const ProductUseCase = {
    fetchAll: async (page: number): Promise<ProductPaginatedResponse> => {
        return await ProductApi.getAll(page);
    },

    fetchById: async (id: number): Promise<Product> => {
        return await ProductApi.getById(id)
    },
};