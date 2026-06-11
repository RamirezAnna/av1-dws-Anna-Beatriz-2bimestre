export default function TarefaForm({
  descricao,
  setDescricao,
  cadastrarTarefa,
  tarefaEmEdicao,
  cancelarEdicao,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (descricao.trim() === "") return;
    cadastrarTarefa();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-2/3 w-full mx-auto mb-8 flex gap-3"
    >
      <input
        type="text"
        value={descricao}
        onChange={(event) => setDescricao(event.target.value)}
        placeholder="Digite uma tarefa"
        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />

      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {tarefaEmEdicao ? "Atualizar" : "Salvar"}
      </button>

      {tarefaEmEdicao && (
        <button
          type="button"
          onClick={cancelarEdicao}
          className="text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg"
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
