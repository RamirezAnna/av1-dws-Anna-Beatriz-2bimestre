import { useEffect, useState } from "react";
import api from "../../services/api";
import TarefaForm from "../../components/TarefaForm";
import TarefaTabela from "../../components/TarefaTabela";

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = () => {
    api.get("/tarefas").then((response) => {
      setTarefas(response.data);
    });
  };

  const cadastrarTarefa = () => {
    if (tarefaEmEdicao) {
      // Modo de edição - usa PATCH
      api
        .patch(`/tarefas/${tarefaEmEdicao.id}`, { descricao })
        .then((response) => {
          setTarefas(
            tarefas.map((t) =>
              t.id === tarefaEmEdicao.id ? { ...t, descricao } : t,
            ),
          );
          setDescricao("");
          setTarefaEmEdicao(null);
        });
    } else {
      // Modo de criação
      api.post("/tarefas", { descricao }).then((response) => {
        setTarefas([...tarefas, response.data.tarefa]);
        setDescricao("");
      });
    }
  };

  const deletarTarefa = (id) => {
    api.delete(`/tarefas/${id}`).then(() => {
      setTarefas(tarefas.filter((t) => t.id !== id));
    });
  };

  const editarTarefa = (tarefa) => {
    setTarefaEmEdicao(tarefa);
    setDescricao(tarefa.descricao);
  };

  const cancelarEdicao = () => {
    setDescricao("");
    setTarefaEmEdicao(null);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Lista de Tarefas
          </h1>

          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Cadastre tarefas no frontend e visualize os dados salvos no backend.
          </p>
        </div>

        <TarefaForm
          descricao={descricao}
          setDescricao={setDescricao}
          cadastrarTarefa={cadastrarTarefa}
          tarefaEmEdicao={tarefaEmEdicao}
          cancelarEdicao={cancelarEdicao}
        />

        <TarefaTabela
          tarefas={tarefas}
          onEditar={editarTarefa}
          onDeletar={deletarTarefa}
        />
      </div>
    </section>
  );
}
