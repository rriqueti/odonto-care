'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const imagens = [
  '/image.png',
  '/cassa-grande.jpg',
  '/motos.jpg',
  '/casa.jpg'
];

export default function Carrossel() {
  const [indexAtual, setIndexAtual] = useState(0);

  const proximo = () => {
    setIndexAtual((prevIndex) =>
      prevIndex === imagens.length - 1 ? 0 : prevIndex + 1
    );
  };

  const anterior = () => {
    setIndexAtual((prevIndex) =>
      prevIndex === 0 ? imagens.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-[1600px] h-80 mx-auto overflow-hidden rounded">

      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${indexAtual * 100}%)` }}
      >
        {imagens.map((src, index) => (
          <div key={index} className="relative min-w-full h-80">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-center"
            />
          </div>
        ))}
      </div>

      {}
      <button
        onClick={anterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={proximo}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {imagens.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndexAtual(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === indexAtual ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
