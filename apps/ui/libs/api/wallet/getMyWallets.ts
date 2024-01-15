import {BASE_URL} from "@/libs/constants";


export const getMyWallets = async () => {
    const token = localStorage.getItem('access_token')
    const userId = localStorage.getItem('user_id')
    return fetch(`${BASE_URL}/wallets?userId=${userId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store',
        });
}
