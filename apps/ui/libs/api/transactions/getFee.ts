import {BASE_URL} from "@/libs/constants";


export const getFee = async (amount: number) => {
    const token = localStorage.getItem('access_token')
    return fetch(`${BASE_URL}/transactions/transaction-fee?amount=${amount}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store',
        });
}
