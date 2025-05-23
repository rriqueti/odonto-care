import { apiClient } from "@/utils/apiClient";


export async function AuthService(login, email) {

    let body = {
        email: email,
        password: login
    }

    console.log('no authService', login, email);

    // let response = await apiClient.get("/auth");

    let response = await apiClient.post("/auth/login", body);

    console.log('response authService', response);

    return response;

}