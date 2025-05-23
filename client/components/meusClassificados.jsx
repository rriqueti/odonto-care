'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { apiClient } from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import { Trash, SquarePen, CirclePause, EllipsisVertical, Play, BadgeDollarSign } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast";
import MoedaFormatada from './moeda';

export default function MeusClassificadosComponent({ classified }) {

    const [images, setImages] = useState([]);
    const [deletarClassificado, setDeletarClassificado] = useState([]);
    const [pausarClassificado, setPausarClassificado] = useState([]);
    const [ativarClassificado, setAtivarClassificado] = useState([])
    const [venderClassificado, setVenderClassificado] = useState([])

    async function getImages() {
        let response = await apiClient.get(`/classificados/imagens/` + classified.idClassificado);
        if (response) {
            // console.log(response);
            setImages(response);
        }
    }

    async function pausar() {
        let response = await apiClient.patch(`/classificados/pausar/${classified.idClassificado}`)
        if (response) {
            setPausarClassificado(response)
            window.location.href = '/meus-classificados'
        }
    }

    async function ativar() {
        let response = await apiClient.patch(`/classificados/ativar/${classified.idClassificado}`)
        if (response) {
            setAtivarClassificado(response)
            window.location.href = '/meus-classificados'
        }
    }

    async function vender() {
        let response = await apiClient.patch(`/classificados/vender/${classified.idClassificado}`)
        if (response) {
            setVenderClassificado(response)
            window.location.href = '/meus-classificados'
        }
    }

    async function deletar(id) {

        toast((t) => (
            <div>
                <b>Tem certeza que deseja excluir esse classificado?</b>
                <br></br>
                <br></br>
                <div>
                    <center>
                        <button style={{ marginRight: '5px' }} onClick={() => confirmaDelecao(id, t.id)} className="bg-red-400 text-white p-2 rounded-sm"> Confirmar exclusão</button>
                        <button onClick={() => toast.dismiss(t.id)} className="bg-zinc-400 text-white p-2 rounded-sm"> Cancelar</button>
                    </center>
                </div>
            </div>
        ))
       

    }

    async function confirmaDelecao(id, toastId) {
        toast.dismiss(toastId);
        const response = await apiClient.patch("/classificados/deletar/" + id);
        if (response) {
            let listaAux = deletarClassificado.filter(x => x.id != id);
            setDeletarClassificado(listaAux);
            toast.success("Classificado excluído!");
            
            window.location.href = '/meus-classificados'
        }
    }

    useEffect(() => {
        getImages();
    }, [])

    return (
        <div className='relative'>
            {classified.situacao != "Vendido" ? (

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="absolute top-2 right-2 z-50 h-8 w-8 p-0">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem><SquarePen className='text-blue-400' /> Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => vender()}><BadgeDollarSign className='text-purple-400' /> Vendido</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => ativar()}><Play className='text-green-400' /> Ativar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => pausar()}><CirclePause className='text-yellow-400' /> Pausar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deletar(classified.idClassificado)}><Trash className='text-red-400' /> Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <></>
            )
            }

            {
                classified.situacao != "Vendido" ? (
                    <Link
                        href={`/classificados/${classified.idClassificado}`}
                        className={cn(
                            'group flex flex-col  rounded-lg border bg-card transition-all hover:shadow-md'
                        )}
                    >


                        {/* <SquarePen width={22} /> */}
                        <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                            {
                                images.length > 0 && images ?
                                    <img
                                        src={images[0].imagem}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    :
                                    <img src="/imovel-sem-foto.jpg" className="card-img-top" alt="Imagem imóvel"></img>
                            }

                            <div className="absolute bottom-2 left-2">
                                <span className={`inline-block rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm `}>
                                    {classified.condicao}
                                </span>
                                &nbsp;
                                <span className='inline-block rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm'>
                                    {classified.situacao}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1.5 p-4">
                            <h3 className="line-clamp-2 font-medium leading-tight text-card-foreground">
                                {classified.titulo}
                            </h3>
                            <p className="text-xl font-semibold text-blue-500"><MoedaFormatada valor={classified.valor}></MoedaFormatada></p>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-muted-foreground">{classified.cidade}</p>
                                <p className="text-xs text-muted-foreground">{classified.dataPublicacao}</p>
                            </div>
                            <div className="mt-1 flex justify-between">
                                <span className="inline-block rounded-full px-2 py-0.5 text-xs text-blue-500 bg-blue-100 font-medium">
                                    {classified.tipo}
                                </span>
                                <span className="inline-block rounded-full px-2 py-0.5 text-xs text-blue-500 bg-blue-100 font-medium">
                                    {classified.numeroVisualizacao} {classified.numeroVisualizacao > 1 ? "Visitas" : "Visita"}
                                </span>
                            </div>
                            {/* <div className='w-auto h-10 flex justify-between items-center'>
                    <CirclePause width={22} />
                    <Trash width={22} />
                </div> */}
                        </div>
                    </Link>
                ) : (

                    <Link
                        href={`/meus-classificados`}
                        className={cn(
                            'group flex flex-col  rounded-lg border bg-card transition-all hover:shadow-md'
                        )}
                    >
                       

                        {/* <SquarePen width={22} /> */}
                        <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                            {
                                images.length > 0 && images ?
                                    
                                    <img
                                        src={images[0].imagem}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105 filter grayscale"
                                    />
                                    :
                                    <img src="/imovel-sem-foto.jpg" className="card-img-top" alt="Imagem imóvel"></img>
                            }

                            <div className="absolute top-2 left-2 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-lg">
                                VENDIDO
                            </div>

                            <div className="absolute bottom-2 left-2">
                                <span className={`inline-block rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm `}>
                                    {classified.condicao}
                                </span>
                               
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1.5 p-4">
                            <h3 className="line-clamp-2 font-medium leading-tight text-card-foreground">
                                {classified.titulo}
                            </h3>
                            <p className="text-xl font-semibold text-blue-500"><MoedaFormatada valor={classified.valor}></MoedaFormatada></p>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-muted-foreground">{classified.cidade}</p>
                                <p className="text-xs text-muted-foreground">{classified.dataPublicacao}</p>
                            </div>
                            <div className="mt-1 flex justify-between">
                                <span className="inline-block rounded-full px-2 py-0.5 text-xs text-blue-500 bg-blue-100 font-medium">
                                    {classified.tipo}
                                </span>
                                <span className="inline-block rounded-full px-2 py-0.5 text-xs text-blue-500 bg-blue-100 font-medium">
                                    {classified.numeroVisualizacao} {classified.numeroVisualizacao > 1 ? "Visitas" : "Visita"}
                                </span>
                            </div>
                            {/* <div className='w-auto h-10 flex justify-between items-center'>
                            <CirclePause width={22} />
                            <Trash width={22} />
                        </div> */}
                        </div>
                    </Link>
                )
            }
        </div>

    );
}