import {BASE_URL} from "@/libs/constants";

export const signUp = async (
    username: string,
    password: string,
) => await fetch(`${BASE_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    cache: 'no-store',
});
