import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type {
    CompositeScreenProps,
    NavigatorScreenParams,
} from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'
import { Product } from '../../domain/models/Product';

// Auth Stack
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
}

// Product Stack (inside tab)
export type ProductStackParamList = {
    ProductList: undefined;
    ProductDetail: Product;
}

// Bottom Tabs
export type MainTabParamList = {
    Home: undefined;
    Products: NavigatorScreenParams<ProductStackParamList>
    Cart: undefined;
    Profile: undefined;
}

// Root Stack
export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>
    Main: NavigatorScreenParams<MainTabParamList>
}

// Screen Props Helpers
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
    StackScreenProps<AuthStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<MainTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >;

export type ProductStackScreenProps<T extends keyof ProductStackParamList> =
    CompositeScreenProps<
        StackScreenProps<ProductStackParamList, T>,
        MainTabScreenProps<'Products'>
    >;

// Global namespace for `useNavigation` inference
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
