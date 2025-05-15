import { User } from '../../domain/models/User'
import { api } from '../../infrastructure/api/AxiosInstance'

export const AuthUseCase = {
    login: async (email: string, password: string): Promise<User> => {
        // const response = await api.post('/login', { email, password })
        // return response.data.user
        return {
            email: email,
            id: Math.random().toString(),
            name: email,
        }
    },
    register: async (email: string, password: string): Promise<User> => {
        const response = await api.post('/register', { email, password })
        return response.data.user
    },
    logout: async () => {
        // await api.post('/logout')
    },
};
