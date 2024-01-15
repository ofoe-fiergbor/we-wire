import {BASE_URL} from "@/libs/constants";


export const getTransactions = async (walletId: string, page = 1, size=10) => {
    const token = localStorage.getItem('access_token')
    return fetch(`${BASE_URL}/transactions/${walletId}?page=${page}&size=${size}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store',
        });
}
