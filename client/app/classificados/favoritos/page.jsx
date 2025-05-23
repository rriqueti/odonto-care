import { useAuth } from "@/app/context/AuthContext"
import { apiClient } from "@/utils/apiClient";
import { useEffect } from "react";

export default function ClassificadosFavoritos({ props }) {


    const { usuario, logout } = useAuth();

    async function ListarFavoritos() {
        const response = await apiClient.get('/salvo/' + props.id)
        
    }

    useEffect(()=> {

    }, [])

    return (
        <div>

        </div>
    )
}