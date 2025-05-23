'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { apiClient } from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import MoedaFormatada from './moeda';


export default function ClassifiedCard({ classified }) {

  const [images, setImages] = useState([]);

  async function getImages() {
    let response = await apiClient.get(`/classificados/imagens/` + classified.idClassificado);
    if (response) {
      // console.log(response);
      setImages(response);
    }
  }

  async function salvarClassificado(e) {
    e.stopPropagation();  
    e.preventDefault();
    
  }

  useEffect(() => {
    getImages();
  }, [])

  return (
    <Link
      href={`/classificados/${classified.idClassificado}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md'
      )}
    >
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

        <Button

          size="icon"
          style={{ zIndex: 10 }}
          className="absolute right-2 top-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/60"
          onClick={salvarClassificado}
        >
          <Heart
            className={cn(
              'h-4 w-4'
                ? 'fill-destructive text-destructive'
                : 'text-muted-foreground'
            )}
          />
          <span className="sr-only">Favoritar</span>
        </Button>
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
        <p className="text-xl font-semibold text-blue-500"><MoedaFormatada valor={classified.valor}></MoedaFormatada> { }</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">{classified.cidade}</p>
          <p className="text-xs text-muted-foreground">{classified.dataPublicacao}</p>
        </div>
        <div className="mt-1">
          <span className="inline-block rounded-full px-2 py-0.5 text-xs text-blue-500 bg-blue-100 font-medium">
            {classified.tipo}
          </span>
        </div>
      </div>
    </Link>

  );
}
