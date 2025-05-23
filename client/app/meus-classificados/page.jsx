'use client';

import FooterLayout from "@/components/footer";
import HeaderLayout from "@/components/header";
import MeusClassificadosComponent from "@/components/meusClassificados";
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/apiClient";
import { useAuth } from "../context/AuthContext";

export default function MeusClassificados() {

    const { usuario, logout } = useAuth();
    const [classified, setClassified] = useState([]);

    async function getClassified() {
        const response = await apiClient.get('/meus-classificados');
        setClassified(response);
    }

    useEffect(() => {
        getClassified();
    }, []);

    return (
        <div>
            <HeaderLayout />
            <main className="pt-20 px-4 bg-gray-100 min-h-screen mb-10">
                <h1 className="p-6 text-3xl text-start">Meus classificados!</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                    {classified.map((value, index) =>
                        <MeusClassificadosComponent key={index} classified={value} />
                    )}
                </div>
            </main>
            <FooterLayout />
        </div>
    );
}
