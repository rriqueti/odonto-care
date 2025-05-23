"use client";
import { useEffect, useState, useRef } from "react";
import { apiClient } from "@/utils/apiClient";
import { ArrowDownToLine } from "lucide-react";
import ImovelForm from "./imovelForm";
import VeiculoForm from "./veiculoForm";
import CategoriaItemsForm from "./categoriaItemsForm";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

export default function CreateClassified() {
  const router = useRouter();
  const [listaImagens, setListaImagens] = useState([]);
  const [category, setCategory] = useState([]);
  const [condicao, setCondicao] = useState([]);
  const [condicaoSelecionada, setCondicaoSelecionada] = useState([]);
  const [tipoClassificado, setTipoClassificado] = useState([]); // selecionar item, imovel ou veiculo
  const [tipoSelecionado, setTipoSelecionado] = useState("0");
  const [tipoSelecionadoCidade, setTipoSelecionadoCidade] = useState("0");
  const [cidades, setCidades] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const imagens = useRef("");
  const [imovelInfo, setImovelInfo] = useState({
    quartos: "",
    banheiros: "",
    metros: "",
    tipo_imovel: "",
  });

  const [veiculoInfo, setVeiculoInfo] = useState({
    ano: "",
    kilometragem: "",
    modeloVeiculo: "",
  });

  const titulo = useRef("");
  const descricao = useRef("");
  const valor = useRef("");
  const tipo = useRef(""); // item, imovel ou veiculo

  async function getCategory() {
    let response = await apiClient.get(`/categoria-items-list`);
    if (response) {
      setCategory(response.itens);
    }
  }

  async function getCondicao() {
    let response = await apiClient.get(`/condicao`);
    if (response) {
      // console.log(response)
      setCondicao(response);
    }
  }

  async function getTipoClassificado() {
    let response = await apiClient.get(`/tipo-classificado`);
    if (response) {
      // console.log(response)
      setTipoClassificado(response);
    }
  }

  async function getCidades() {
    let response = await apiClient.get(`/cidades`);
    if (response) {
      setCidades(response);
    }
  }

  useEffect(() => {
    getCategory();
    getCondicao();
    getTipoClassificado();
    getCidades();
  }, []);

  function carregarImagens() {
    if (imagens.current.files.length > 0) {
      if (imagens.current.files.length > 5) {
        toast.error("Cadastre no máximo 5 imagens!");
        return;
      }

      let listaAux = [];
      for (let file of imagens.current.files) {
        listaAux.push(URL.createObjectURL(file));
      }

      setListaImagens(listaAux);
    }
  }

  async function cadastrarClassificado() {
    if (
      titulo.current.value === "" ||
      descricao.current.value === "" ||
      valor.current.value <= 0
    ) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (tipo.current.value == "1") {
      let form = new FormData();
      form.append("titulo", titulo.current.value);
      form.append("descricao", descricao.current.value);
      form.append("valor", valor.current.value);
      form.append("condicaoId", condicaoSelecionada);
      form.append("situacaoId", 1);
      form.append("tipoId", tipo.current.value);
      form.append("cidadeId", tipoSelecionadoCidade);
      form.append("quartos", imovelInfo.quartos || null);
      form.append("banheiros", imovelInfo.banheiros || null);
      form.append("metros_quadrados", imovelInfo.metros || null);
      form.append("tipo_imovel", imovelInfo.tipo_imovel || null);
      form.append("ano", veiculoInfo.ano || null);
      form.append("kilometragem", veiculoInfo.kilometragem || null);
      form.append("modeloId", veiculoInfo.modeloVeiculo || null);
      form.append("categoriaId", categoriaSelecionada);

      for (let file of imagens.current.files) {
        form.append("imagens", file);
      }

      let response = await apiClient.postFormData("/classificados", form);
      if (response) {
        toast.success("Classificado cadastrado com sucesso!");
        redirect("/meus-classificados");
        // router.replace("/meus-classificados");
      }
    } else if (tipo.current.value == "2") {
      let form = new FormData();
      form.append("titulo", titulo.current.value);
      form.append("descricao", descricao.current.value);
      form.append("valor", valor.current.value);
      form.append("condicaoId", condicaoSelecionada);
      form.append("situacaoId", 1);
      form.append("tipoId", tipo.current.value);
      form.append("cidadeId", tipoSelecionadoCidade);
      form.append("quartos", imovelInfo.quartos);
      form.append("banheiros", imovelInfo.banheiros);
      form.append("metros_quadrados", imovelInfo.metros);
      form.append("tipo_imovel", imovelInfo.tipo_imovel);
      form.append("ano", veiculoInfo.ano);
      form.append("kilometragem", veiculoInfo.kilometragem);
      form.append("modeloId", veiculoInfo.modeloVeiculo);
      form.append("categoriaId", categoriaSelecionada);

      for (let file of imagens.current.files) {
        form.append("imagens", file);
      }

      let response = await apiClient.postFormData("/classificados", form);
      console.log(response);
      if (response) {
        toast.success("Imóvel cadastrado com sucesso!");
        redirect("/meus-classificados");
        // router.replace("/meus-classificados");
      }
    } else if (tipo.current.value == "3") {
      let form = new FormData();
      form.append("titulo", titulo.current.value);
      form.append("descricao", descricao.current.value);
      form.append("valor", valor.current.value);
      form.append("condicaoId", condicaoSelecionada);
      form.append("situacaoId", 1);
      form.append("tipoId", tipo.current.value);
      form.append("cidadeId", tipoSelecionadoCidade);
      form.append("quartos", imovelInfo.quartos);
      form.append("banheiros", imovelInfo.banheiros);
      form.append("metros_quadrados", imovelInfo.metros);
      form.append("tipo_imovel", imovelInfo.tipo_imovel);
      form.append("ano", veiculoInfo.ano);
      form.append("kilometragem", veiculoInfo.kilometragem);
      form.append("modeloId", veiculoInfo.modeloVeiculo);
      form.append("categoriaId", categoriaSelecionada);

      for (let file of imagens.current.files) {
        form.append("imagens", file);
      }

      let response = await apiClient.postFormData("/classificados", form);
      if (response) {
        toast.success("Veículo cadastrado com sucesso!");
        redirect("/meus-classificados");
      }
    } else {
      toast.error("Tipo de classificado inválido!");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Criar novo anúncio</h1>
      <p className="mb-6 text-gray-600">
        Preencha os detalhes do seu anúncio para publicá-lo na plataforma
      </p>
      <form className="space-y-6">
        {/* Informações Básicas */}
        <div className="border rounded p-4 shadow-sm bg-white">
          <h2 className="text-md font-semibold mb-2">Titulo</h2>
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Ex: Apartamento 2 quartos no Centro"
            ref={titulo}
          />

          <h2 className="text-md font-semibold mb-2">Descrição</h2>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Descreva seu produto ou serviço com detalhes..."
            ref={descricao}
          ></textarea>

          <h2 className="text-md font-semibold mb-2">Tipo do classificado</h2>
          <select
            className="w-full p-2 border rounded mb-2"
            value={tipoSelecionado}
            ref={tipo}
            onChange={(e) => setTipoSelecionado(e.target.value)}
          >
            <option value="0" disabled>
              Selecione uma categoria
            </option>
            {tipoClassificado.map((classificado) => (
              <option
                key={classificado.id}
                value={classificado.id}
                onChange={(e) => setTipoClassificado(e.target.value)}
              >
                {classificado.descricao}
              </option>
            ))}
          </select>

          {tipoSelecionado === "1" && (
            <CategoriaItemsForm
              onCategoriaSelecionada={setCategoriaSelecionada}
            ></CategoriaItemsForm>
          )}
          {tipoSelecionado === "2" && (
            <ImovelForm
              imovelInfo={imovelInfo}
              setImovelInfo={setImovelInfo}
            ></ImovelForm>
          )}
          {tipoSelecionado === "3" && (
            <VeiculoForm
              veiculoInfo={veiculoInfo}
              setVeiculoInfo={setVeiculoInfo}
            ></VeiculoForm>
          )}
        </div>

        {/* Preço e Condição */}
        <div className="border rounded p-4 shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-2">Preço e condição</h2>
          <input
            type="number"
            className="w-full p-2 border rounded mb-2"
            placeholder="R$ 0,00"
            ref={valor}
          />
          <div className="mb-2">
            {condicao.map((opcao) => (
              <label key={opcao.id} className="mr-4">
                <input
                  type="radio"
                  name="condicao"
                  value={opcao.id}
                  onChange={(e) => setCondicaoSelecionada(e.target.value)}
                />{" "}
                {opcao.descricao}
              </label>
            ))}
          </div>
          {/* <h2 className="text-md font-semibold mb-2">Cidade</h2> */}
          <select
            className="w-full p-2 border rounded mb-2"
            value={tipoSelecionadoCidade}
            onChange={(e) => setTipoSelecionadoCidade(e.target.value)}
          >
            <option value="0" disabled>
              Selecione uma cidade
            </option>
            {cidades.map((cidade) => (
              <option key={cidade.cid_id} value={cidade.cid_id}>
                {cidade.cid_nome}, {cidade.uf}
              </option>
            ))}
          </select>
        </div>

        {/* Imagens */}
        <div className="border rounded p-4 shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-2">Imagens</h2>
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
            onClick={() => document.getElementById("uploadInput").click()}
          >
            <ArrowDownToLine className="mx-auto text-gray-500" size={32} />
            <p className="font-medium mt-2">
              Arraste e solte imagens aqui ou clique para selecionar
            </p>
            <p className="text-sm text-gray-500">
              Suporta JPG, PNG ou JPEG até 5MB cada
            </p>
            <input
              id="uploadInput"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/jpg"
              onChange={carregarImagens}
              className="hidden"
              ref={imagens}
            />
          </div>
          <div style={{ display: "flex" }}>
            {listaImagens != null && listaImagens.length > 0 ? (
              listaImagens.map((value, index) => {
                return (
                  <div style={{ margin: "10px" }} key={index}>
                    <img src={value} width="150"></img>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end">
          {/* <button type="button" className="px-4 py-2 border rounded text-gray-600">
                        Cancelar
                    </button> */}
          <button
            type="button"
            onClick={cadastrarClassificado}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Publicar anúncio
          </button>
        </div>
      </form>
    </div>
  );
}
