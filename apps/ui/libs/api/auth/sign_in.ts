import {BASE_URL} from "@/libs/constants";

export const signIn = async (
    username: string,
    password: string,
) => await fetch(`${BASE_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    cache: 'no-store',
});
