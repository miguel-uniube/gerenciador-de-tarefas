import { useState } from "react";
import "../App.css";

function Tarefas() {
  //Estados
  const [tarefa, setTarefa] = useState([]); //estado que armazena todos os elementos em um array
  const [novaTarefa, setNovaTarefa] = useState(""); //estado que armazena a tarefa que está sendo digitada
  const [descTarefa, setDescTarefa] = useState(""); //estado que armazena a descrição da tarefa que está sendo digitada
  const [tarefaId, setTarefaId] = useState(1); //estado que armazena o id da tarefa que está sendo incrementado
  const [filtro, setFiltro] = useState("Todas"); //estado que armazena o estado do filtro selecionado
  //Função para capturar o texto no campo "adicionar tarefas"
  const capturarTexto = (evento) => {
    setNovaTarefa(evento.target.value);
  };
  //Função para capturar a descrição no campo "Digite uma descrição"
  const capturarDescTarefa = (evento) => {
    setDescTarefa(evento.target.value);
  };
  //Função que grava a nova tarefa, descrição, se é concluida ou não e o id dentro do estado tarefa
  const AdicionarTarefas = () => {
    if (novaTarefa.trim() !== "" && descTarefa.trim() !== "") {
      //verifica se o campo não está vazio
      setTarefa([
        ...tarefa,
        {
          texto: novaTarefa,
          concluida: false,
          descricao: descTarefa,
          id: tarefaId,
        },
      ]);
      //limpando os campos
      setNovaTarefa("");
      setDescTarefa("");
      //incrementando o id
      setTarefaId(tarefaId + 1);
    }
  };
  //Função para deletar a tarefa no botão de "X"
  const deletarTarefa = (id) => {
    setTarefa(tarefa.filter((tarefa) => tarefa.id !== id));
  };
  //função para marcar a tarefa como concluida no checkbox
  const concluida = (id) => {
    setTarefa(
      tarefa.map((mapa) => {
        //se o id for compativel mude o estado de "concluida"
        if (mapa.id === id) {
          return { ...mapa, concluida: !mapa.concluida };
          //senão continue o mesmo estado
        } else {
          return mapa;
        }
      })
    );
  };
  //fução para filtrar as tarefas
  const filtrarTarefa = (filtro) => {
    //Se o estado for "Todas", retorne o estado "Tarefas" por completo
    if (filtro === "Todas") {
      return tarefa;
      //Se o estado for "Concluidas", retorne apenas as tarefas quem tem o estado
      //de "Concluidas" no valor true
    } else if (filtro === "Concluidas") {
      return tarefa.filter((tarefa) => tarefa.concluida === true);
      //Senão retorne as tarefas que tem o estado de "Concluidas" no valor false
    } else {
      return tarefa.filter((tarefa) => tarefa.concluida === false);
    }
  };
  //função que recebee grava o valor da função de fitrar a tarefa
  const tarefaFiltrada = filtrarTarefa(filtro);
  //codigo que será retornado na tela
  return (
    //container pai
    <div className="container">
      {/* Campo de adicionar tarefas */}
      <h1 className="titulo">Adicionar Tarefas</h1>
      <div className="adicionar">
        <input
          type="text"
          placeholder="Digite uma tarefa"
          nameClass="tarefa"
          value={novaTarefa}
          onChange={capturarTexto}
        />
        {/* Campo de adicionar a descrição da tarefa */}
        <input
          type="text"
          placeholder="Digite uma descrição"
          nameClass="tarefa"
          value={descTarefa}
          onChange={capturarDescTarefa}
        />
        {/* Botão para adicioar a tarefa */}
        <button type="submit" onClick={AdicionarTarefas} className="botao">
          Adicionar
        </button>
      </div>
      {/* Conteiner para filtrar tarefas */}
      <div className="Filtrar">
        <h2>Filtrar</h2>
        {/* botão que seleciona todas as tarefas */}
        <button onClick={() => setFiltro("Todas")} className="botao">
          Todas
        </button>
        {/* botão que seleciona apenas as tarefas concluidas */}
        <button onClick={() => setFiltro("Concluidas")} className="botao">
          Concluidas
        </button>
        {/* botão que seleciona apenas as tarefas não concluidas */}
        <button onClick={() => setFiltro("Pendentes")} className="botao">
          Pendentes
        </button>
      </div>
      {/* conteiner que adiciona as tarefas a uma lista visivel ao usuario */}
      <div className="lista">
        <ul>
          {tarefaFiltrada.map((tarefa) => (
            // geração de cada linha da lista contendo os elementos da tarefa
            <li key={tarefa.id} className="elementolista">
              {/* checkbox para marcar as tarefas como concluidas */}
              <div className="container-checkbox">
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => concluida(tarefa.id)}
                />
              </div>
              {/* geração do texto texto e da descrição da tarefa */}
              <div className="texto">
                <strong>{tarefa.texto}</strong>
                <h5>{tarefa.descricao}</h5>
              </div>
              {/* geração do botão de deletar a tarefa */}
              <div className="container-botao">
                <button
                  className="botao-deletar"
                  onClick={() => deletarTarefa(tarefa.id)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tarefas;
