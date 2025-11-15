"use client";
import { useState, useEffect } from "react";
import { taskApi, userApi } from "../api";
import {
  Plus,
  Search,
  Users,
  Home,
  X,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import "../global.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUser, setFilterUser] = useState("all");
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    id_usuario: "",
    prazo_final: "",
  });

  // Carregar dados quando o componente inicia
  useEffect(() => {
    carregarDados();
  }, []);

  // Atualizar formulário quando editar tarefa
  useEffect(() => {
    if (editingTask) {
      setFormData({
        titulo: editingTask.titulo,
        descricao: editingTask.descricao,
        id_usuario: editingTask.id_usuario.toString(),
        prazo_final: editingTask.prazo_final.split("T")[0],
      });
    } else {
      setFormData({
        titulo: "",
        descricao: "",
        id_usuario: users[0]?.id.toString() || "",
        prazo_final: "",
      });
    }
  }, [editingTask, users, dialogOpen]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [tarefas, usuarios] = await Promise.all([
        taskApi.getAll(),
        userApi.getAll(),
      ]);
      setTasks(tarefas);
      setUsers(usuarios);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar dados. Tente recarregar a página.");
      // Força um estado vazio para não ficar em branco
      setTasks([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para recarregar a página
  const recarregarPagina = () => {
    window.location.reload();
  };

  // Criar tarefa
  const handleCriarTarefa = async (task) => {
    try {
      await taskApi.create(task);
      toast.success("Tarefa criada com sucesso!");
      setDialogOpen(false);
      recarregarPagina(); // Recarrega a página
    } catch (error) {
      toast.error("Erro ao criar tarefa");
    }
  };

  // Editar tarefa
  const handleEditarTarefa = async (task) => {
    try {
      await taskApi.update(task.id, task);
      toast.success("Tarefa atualizada com sucesso!");
      setDialogOpen(false);
      recarregarPagina(); // Recarrega a página
    } catch (error) {
      toast.error("Erro ao atualizar tarefa");
    }
  };

  // Deletar tarefa
  const handleDeletarTarefa = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await taskApi.delete(id);
        toast.success("Tarefa excluída com sucesso!");
        recarregarPagina(); // Recarrega a página
      } catch (error) {
        toast.error("Erro ao excluir tarefa");
      }
    }
  };

  // Salvar tarefa (criar ou editar)
  const handleSaveTask = (e) => {
    e.preventDefault();

    const taskData = {
      ...(editingTask && { id: editingTask.id }),
      titulo: formData.titulo,
      descricao: formData.descricao,
      id_usuario: parseInt(formData.id_usuario),
      prazo_final: formData.prazo_final,
    };

    if (editingTask) {
      handleEditarTarefa(taskData);
    } else {
      handleCriarTarefa(taskData);
    }
  };

  // Editar tarefa
  const handleEditTask = (task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  // Nova tarefa
  const handleNewTask = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  // Fechar diálogo
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
  };

  // Filtrar tarefas
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser =
      filterUser === "all" || task.id_usuario.toString() === filterUser;
    return matchesSearch && matchesUser;
  });

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50">
          {/* Cabeçalho */}
          <div className="border-b bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Minhas Tarefas
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Gerencie todas as suas atividades
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      <Home className="w-4 h-4" />
                      Home
                    </button>
                  </Link>
                  <Link href="/users">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      <Users className="w-4 h-4" />
                      Usuários
                    </button>
                  </Link>
                  <button
                    onClick={handleNewTask}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nova Tarefa
                  </button>
                  {/* Botão para recarregar manualmente */}
                  <button
                    onClick={recarregarPagina}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    title="Recarregar página"
                  >
                    <span>↻</span>
                  </button>
                </div>
              </div>

              {/* Filtros */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar tarefas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="w-full sm:w-[200px]">
                  <select
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Todos os usuários</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id.toString()}>
                        {user.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de tarefas */}
          <div className="container mx-auto px-4 py-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Carregando tarefas...</p>
                <button
                  onClick={recarregarPagina}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-4 mx-auto"
                >
                  ↻ Recarregar
                </button>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {searchTerm || filterUser !== "all"
                    ? "Nenhuma tarefa encontrada"
                    : "Nenhuma tarefa cadastrada"}
                </p>
                <div className="flex gap-2 justify-center mt-4">
                  <button
                    onClick={handleNewTask}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Criar primeira tarefa
                  </button>
                  <button
                    onClick={recarregarPagina}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    ↻ Recarregar
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => {
                  const user = users.find((u) => u.id === task.id_usuario);
                  return (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {task.titulo}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {task.descricao}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{task.nome || "Usuário não encontrado"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(task.prazo_final).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span>ID: {task.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-2">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex-1 justify-center transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeletarTarefa(task.id)}
                          className="flex items-center gap-2 px-3 py-2 text-red-600 bg-white border border-gray-300 rounded-md hover:bg-red-50 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Diálogo para criar/editar tarefa - TUDO FEITO NA MÃO */}
          {dialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleSaveTask}>
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
                    </h2>
                    <button
                      type="button"
                      onClick={handleCloseDialog}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      {editingTask
                        ? "Atualize as informações da tarefa"
                        : "Preencha os dados da nova tarefa"}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="titulo"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Título
                        </label>
                        <input
                          id="titulo"
                          type="text"
                          value={formData.titulo}
                          onChange={(e) =>
                            setFormData({ ...formData, titulo: e.target.value })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="descricao"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Descrição
                        </label>
                        <textarea
                          id="descricao"
                          value={formData.descricao}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              descricao: e.target.value,
                            })
                          }
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="usuario"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Usuário
                        </label>
                        <select
                          id="usuario"
                          value={formData.id_usuario}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              id_usuario: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {users.map((user) => (
                            <option key={user.id} value={user.id.toString()}>
                              {user.nome}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="prazo"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Prazo Final
                        </label>
                        <input
                          id="prazo"
                          type="date"
                          value={formData.prazo_final}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              prazo_final: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCloseDialog}
                      className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {editingTask ? "Salvar" : "Criar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
};

export default Tasks;
