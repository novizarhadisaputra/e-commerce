import { AuthUseCase } from '../../application/useCases/AuthUseCase'
import { useUserStore } from '../../application/stores/useUserStore'

export const useAuth = () => {
    const { user, setUser, clearUser, loadUserFromStorage } = useUserStore()

    const login = async (email: string, password: string) => {
        const user = await AuthUseCase.login(email, password)
        setUser(user);
    }
    const register = async (email: string, password: string) => {
        const user = await AuthUseCase.register(email, password)
        setUser(user)
    }
    const logout = async () => {
        await AuthUseCase.logout()
        clearUser()
    }

    return { user, login, register, logout, loadUserFromStorage }
}
