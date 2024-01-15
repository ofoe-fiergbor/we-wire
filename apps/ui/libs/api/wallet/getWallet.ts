import {BASE_URL} from "@/libs/constants";


export const getWallet = async (currency: string) => {
    const token = localStorage.getItem('access_token')
    const userId = localStorage.getItem('user_id')
    return fetch(`${BASE_URL}/wallets/${currency}?userId=${userId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store',
        });
}
