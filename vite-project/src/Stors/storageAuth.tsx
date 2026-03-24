
import{create} from 'zustand';
import { persist } from 'zustand/middleware';

export type UserProfile = {
    email: string;
    username: string;
    password?: string;
}

interface AuthStore {
    isRegistr: boolean;
    isLogin: boolean;
    userProfile: UserProfile | null;

    register:(profile : UserProfile) => void;
    login: (credit: Pick<UserProfile, 'email' | 'password'>) => boolean;
     logout:() => void; 
}

export const useAuth = create(
    persist<AuthStore>((set, get) =>({
    isRegistr: false,
    isLogin: false,
    userProfile: null,
        
    register: (profile) =>{
        set({
            isRegistr: true,
            isLogin: true,
            userProfile: profile
        });
    },
    
    login: (credit) =>{
        const {userProfile} = get();
        if(userProfile && userProfile.email === credit.email
             && userProfile.password === credit.password){
                set({isLogin: true});
                return true;
             }
             return false;
        },
        logout: () =>{
            set({isLogin: false, userProfile: null})
        },
}),
{
            name: 'messenger-auth-storage'}

));





