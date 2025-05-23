'use client'
import toast from "react-hot-toast";


export class ApiClient {

    static instance = null
    baseUrl = "http://localhost:5001"
    jwt = "";
    headers = {
        "Content-Type": "application/json"
    }

    constructor() {
        if(ApiClient.instance != null) {
            throw new Error("ApiClient já foi instanciado!!!")
        }
    }

    static getInstance() {
        if(ApiClient.instance == null) {
            ApiClient.instance = new ApiClient();
            if(typeof(localStorage) != "undefined") {
                const jwt = localStorage.getItem("jwt");
                if(jwt) {
                    ApiClient.instance.setJwt(jwt);
                }
            }
        }
        return ApiClient.instance;
    }

    setJwt(jwt) {
        ApiClient.instance.jwt = jwt;
        ApiClient.instance.headers["Authorization"] = `Bearer ${jwt}`;
    }

    async get(endpoint) {
        const response = await fetch(this.baseUrl + endpoint, {
            method: "GET",
            headers: ApiClient.instance.headers
        })

        return await this.checarResposta(response);
    }

    async post(endpoint, body) {
        const response = await fetch(this.baseUrl + endpoint, {
            method: "POST",
            headers: ApiClient.instance.headers,
            body: JSON.stringify(body)
        })

        return await this.checarResposta(response);
    }

    async put(endpoint, body) {
        const response = await fetch(this.baseUrl + endpoint, {
            method: "PUT",
            headers: ApiClient.instance.headers,
            body: JSON.stringify(body)
        })

        return await this.checarResposta(response);
    }

    async delete(endpoint) {
        const response = await fetch(this.baseUrl + endpoint, {
            method: "DELETE",
            headers: ApiClient.instance.headers
        })

        return await this.checarResposta(response);
    }

    async patch(endpoint, body) {
        const response = await fetch(this.baseUrl + endpoint, {
            method: "PATCH",
            headers: ApiClient.instance.headers,
            body: JSON.stringify(body)
        })

        return await this.checarResposta(response);
    }

    async postFormData(endpoint, body) {
        const response = await fetch(this.baseUrl + endpoint, {
            method: "POST",
            body: body,
            headers: {
                "Authorization": `Bearer ${ApiClient.instance.jwt}`
            }
        })

        return await this.checarResposta(response);
    }

    async checarResposta(response) {
        if(response.ok) {
            const json = await response.json();
            return json;
        }
        else{
            if(response.status != 404) {
                let resposta = await response.json();
                console.error(`Erro ao realizar requisição! HTTP Status: ${response.status}`)
                if(resposta.msg) {
                    toast.error(resposta.msg);
                }
                else{
                    toast.error(`Erro ao realizar requisição! HTTP Status: ${response.status}`);
                }
            }

        }
    }
}

export const apiClient = ApiClient.getInstance();