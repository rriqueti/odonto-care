'use client'

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/utils/apiClient";

import AdvertiserCard from "./advertiserCard"

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import ClassifiedImageCardDetail from "@/components/classifiedImageCardDetail";
import { Badge } from "@/components/ui/badge";
import TabsClassified from "./tabs";
import MoedaFormatada from "@/components/moeda";
import { Eye } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";


export default function ClassifiedDetails() {

    const { id } = useParams();

    const {usuario, logout} = useAuth();

    console.log(usuario)

    const [classificado, setClassificado] = useState(null)
    const [loading, setLoading] = useState(true);

    async function getClassified() {
        let response = await apiClient.get("/classificados/" + id);
        if (response) {
            setClassificado(response);
            // console.log(response)

        }
        setLoading(false);
    }


    useEffect(() => {
        getClassified()
    }, [])

    if(!classificado){
        return (
            <div>
            Classificado não encontrado
            </div>
        )
    }

    return (
        loading ? 'Loading' :
            <div id="main-grid" className="container mx-auto p-6 mb-24">
                {/* {console.log(classificado[0].valor)} */}
                <div id="breadcrumb">
                    {
                        loading ?
                            <span className="m-4">
                                <Skeleton className="h-4 w-120 bg-gray-200 rounded-md"></Skeleton>
                            </span>
                            :
                            <span className="mb-4">
                                <Link href="/"> Início </Link>  / {classificado[0].tipo} / {classificado[0].titulo}
                            </span>
                    }
                </div>
                <div id="classified-grid" className="grid grid-cols-3 gap-4">
                    {/* Left Grid */}
                    <div id="classified-column-1" className="col-span-2">
                        {/* Imagem maior */}
                        <div id="" className="w-full">
                            <div id="img-maior">
                                {
                                    loading ?
                                        <Skeleton className="h-80 w-full bg-gray-200 rounded-md"></Skeleton>
                                        :
                                        <ClassifiedImageCardDetail id={classificado[0].idClassificado}></ClassifiedImageCardDetail>
                                }

                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span id="title-classifed" className="mt-4">
                                {
                                    loading ?
                                        <Skeleton className="h-4 w-120 bg-gray-200 rounded-md"></Skeleton>
                                        :
                                        <h1 className="text-2xl">{classificado[0].titulo}</h1>

                                }
                                <h5>{loading ? '' : classificado[0].cidade+ ', '+ classificado[0].estado} -  Públicado {classificado[0].dataPublicacao}</h5>
                                <span className="flex flex-row justify-items-start gap-x-2"><Eye /> {classificado[0].numeroVisualizacao} Visualizações</span>
                            </span>

                            <span className="mb-4">
                                {loading ?
                                    <Skeleton className="h-4 w-120 bg-gray-200 rounded-md"></Skeleton>
                                    :
                                    <Badge variant={classificado[0].condicao == 'Novo' ? 'default' : 'secondary'} className="bg-blue-200 text-blue-800">{classificado[0].condicao}</Badge>
                                }
                            </span>
                            <span className="mb-8">
                                {
                                    loading ?
                                        <Skeleton className="h-4 w-120 bg-gray-200 rounded-md"></Skeleton>
                                        :
                                        <p className="text-2xl font-bold text-[var(--blue100)]"> <MoedaFormatada valor={classificado[0].valor}></MoedaFormatada>
                                        </p>
                                }
                            </span>
                            <TabsClassified obj={classificado[0]}></TabsClassified>
                        </div>
                    </div>

                    {/* Right grid */}
                    <div id="classified-column-2" className="col-span-1 w-full h-full" >
                        <AdvertiserCard obj={classificado[0]}></AdvertiserCard>
                    </div>

                </div>
            </div >
    );
}