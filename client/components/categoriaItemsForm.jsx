'use client'

import { useState, useEffect } from "react";
import { apiClient } from "@/utils/apiClient";

export default function CategoriaItemsForm({onCategoriaSelecionada}) {

    const [categoryItems, setCategoryItems] = useState([]);
    const [tipoSelecionado, setTipoSelecionado] = useState('0');

    async function getCategoryItems() {
        let response = await apiClient.get(`/categoria-items-list`);
        if (response) {
            // console.log(response.itens)
            setCategoryItems(response.itens);
        }
    }

    useEffect(() => {
        getCategoryItems();
    }, [])

    const handleChange = (e) => {
        setTipoSelecionado(e.target.value);
        onCategoriaSelecionada(e.target.value); 
      };

    return (
        <div>
            
                <div className="border rounded p-4 shadow-sm bg-white">
                    <select className="w-full p-2 border rounded mb-2"
                    value={tipoSelecionado}
                    onChange={handleChange}
                    >
                        <option value="0" disabled >Selecione a categoria do item</option>
                        {categoryItems.map((items) => (
                            <option key={items.categoriaId} value={items.categoriaId}>
                                {items.categoriaDescricao}
                            </option>
                        ))}
                    </select>
                </div>
            
        </div>
    );

}