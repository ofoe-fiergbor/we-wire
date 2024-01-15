import {BASE_URL} from "@/libs/constants";

export const me = async () => {
    const token = localStorage.getItem('access_token')

    return fetch(`${BASE_URL}/auth/me`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store',
        });
}
