import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserProfile = {
    id?: number; // Бэкенд возвращает id, поэтому добавим его
    email: string;
    username: string;
}

interface AuthStore {
    isLogin: boolean;
    userProfile: UserProfile | null;
    token: string | null; // <-- НОВОЕ: место для хранения JWT токена

    // Теперь функции возвращают Promise, так как они асинхронные
    register: (profile: UserProfile & { password: string }) => Promise<boolean>;
    login: (credit: { email: string; password: string }) => Promise<boolean>;
    logout: () => void; 
}

export const useAuth = create(
    persist<AuthStore>((set) => ({
        isLogin: false,
        userProfile: null,
        token: null, // Изначально токена нет
        
        register: async (profile) => {
            try {
                // Делаем реальный запрос на твой бэкенд
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profile)
                });
                
                // Если статус 201 Created
                if (response.ok) {
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Ошибка при регистрации:", error);
                return false;
            }
        },
        
        login: async (credit) => {
            try {
                // Стучимся на ручку логина
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credit)
                });

                // Если статус 200 OK
                if (response.ok) {
                    const data = await response.json();
                    
                    // Бэкенд возвращает нам токен и данные юзера, сохраняем их в состояние!
                    set({
                        isLogin: true,
                        userProfile: data.user,
                        token: data.token // Благодаря persist, токен сам сохранится в localStorage браузера
                    });
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Ошибка при логине:", error);
                return false;
            }
        },
        
        logout: () => {
            // При выходе просто зачищаем всё
            set({ isLogin: false, userProfile: null, token: null })
        },
    }),
    {
        name: 'messenger-auth-storage'
    }
));