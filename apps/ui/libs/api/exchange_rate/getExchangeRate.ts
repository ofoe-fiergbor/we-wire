import {BASE_URL} from "@/libs/constants";


export const getExchangeRate = async (currencyA: string, currencyB: string) => {
    const token = localStorage.getItem('access_token')
    return fetch(`${BASE_URL}/exchange-rates/pair?currencyA=${currencyA}&currencyB=${currencyB}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store',
        });
}
