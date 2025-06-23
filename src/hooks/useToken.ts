import { useSessionStorage } from './useSessionStorage';

export const useToken = () => {
    const { deleteItem } = useSessionStorage();

    const getToken = (tokenName: string) => {
        const tokenString = localStorage.getItem(tokenName);
        const userToken = tokenString ? JSON.parse(tokenString) : null;
        return userToken;
    };

    const removeToken = (tokenName: string) => {
        localStorage.removeItem(tokenName);
    };

    const removeVendorToken = () => {
        deleteItem('vendorToken');
        deleteItem('vendorTokenValue');
    };

    const removeEmployerToken = () => {
        deleteItem('employerToken');
        deleteItem('employerTokenValue');
    };

    const saveToken = (tokenName: string, tokenValue: string) => {
        if (tokenValue) {
            localStorage.setItem(tokenName, JSON.stringify(tokenValue));
        }
    };

    return {
        getToken,
        saveToken,
        removeToken,
        removeVendorToken,
        removeEmployerToken
    };
};
