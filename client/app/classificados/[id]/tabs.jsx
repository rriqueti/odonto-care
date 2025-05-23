'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import dynamic from 'next/dynamic';
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function TabsClassified({ obj }) {

    // console.log(obj)

    const MapsComponent = dynamic(
        () => import('./map'),
        { ssr: false }
    );

    return (
        <div className="w-full h-full">
            <Tabs defaultValue="descricao" className="w-full">
                <div className="">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-200">
                        {obj.descricao ? <TabsTrigger value="descricao">Descrição</TabsTrigger> : ''}
                        {obj.fabricanteVeiculo || obj.tipoImovel ? <TabsTrigger value="detalhes">Detalhes</TabsTrigger> : ''}
                        <TabsTrigger value="localizacao">Localização</TabsTrigger>
                    </TabsList>

                </div>
                {/* descricao */}
                <TabsContent value="descricao">
                    <Card className='p-8'>
                        <CardContent className="space-y-2">
                            {obj.descricao}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* detalhes */}
                {obj.tipo == 'Veículo' ?
                    <TabsContent value="detalhes">
                        <div className="grid grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="space-y-2">Marca: {obj.fabricanteVeiculo}</CardContent>
                            </Card>
                            <Card>
                                <CardContent className="space-y-2">Modelo: {obj.modeloVeiculo}</CardContent>
                            </Card>
                            <Card>
                                <CardContent className="space-y-2">Kilometragem: {obj.kilometragem}</CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    :
                    // Sendo imóvel
                    <TabsContent value="detalhes">
                        <div className="grid grid-cols-3 gap-4 space-x-2">
                            <Card>
                                <CardContent className="">Tamanho: {obj.metrosQuadrados} M²</CardContent>
                            </Card>
                            <Card>
                                <CardContent className="">Quantidade de quartos: {obj.quartos}</CardContent>
                            </Card>
                            <Card>
                                <CardContent className="">Tipo do Imóvel: {obj.tipoImovel}</CardContent>
                            </Card>
                        </div>

                    </TabsContent>
                }


                {/* localização */}
                <TabsContent value="localizacao">
                    <Card className='p-8'>
                        <CardContent className="space-y-2">
                            <div>
                                {/* Exemplo para exibir o mapa */}
                                <aside className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
                                    {true && true ? (
                                        <MapsComponent
                                            latitude={'-22.130458637756277'}
                                            longitude={'-51.438345169816564'}
                                            zoom={15}

                                        />
                                    ) : (
                                        <p className="p-4">Localização indisponível</p>
                                    )}
                                </aside>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div >
    );

}