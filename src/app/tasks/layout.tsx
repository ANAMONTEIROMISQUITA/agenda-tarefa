"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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
import "../global.css";
import { taskApi, userApi } from "../api";

// --------------------------
// DADOS FAKES
// --------------------------
const fakeUsers = [
  { id: 1, nome: "João Martins" },
  { id: 2, nome: "Ana Souza" },
  { id: 3, nome: "Carlos Henrique" },
  { id: 4, nome: "Mariana Alves" },
  { id: 5, nome: "Pedro Lima" },
];

const fakeTasks = [
  {
    id: 1,
    titulo: "Criar página inicial",
    descricao: "Desenvolver layout da home do sistema.",
    id_usuario: 1,
    prazo_final: "2025-02-10",
  },
  {
    id: 2,
    titulo: "Revisar cadastro de usuários",
    descricao: "Melhorar validações e mensagens de erro.",
    id_usuario: 2,
    prazo_final: "2025-02-12",
  },
  {
    id: 3,
    titulo: "Criar página de tarefas",
    descricao: "Implementar listagem, busca e filtros.",
    id_usuario: 3,
    prazo_final: "2025-02-15",
  },
  {
    id: 4,
    titulo: "Implementar modal de edição",
    descricao: "Criar modal 100% manual para editar tarefas.",
    id_usuario: 4,
    prazo_final: "2025-02-20",
  },
  {
    id: 5,
    titulo: "Testar sistema",
    descricao: "Testar todas as rotas e funcionalidades.",
    id_usuario: 5,
    prazo_final: "2025-03-01",
  },
];

export default function TasksPage() {
  // --------------------------
  // ESTADOS
  // --------------------------

  // -----------------------------
  // JS para dados fakes
  // -----------------------------

  const [users] = useState(fakeUsers);
  const [tasks, setTasks] = useState(fakeTasks);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterUser, setFilterUser] = useState("all");
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    id_usuario: "1",
    prazo_final: "",
  });

  // --------------------------
  // FILTROS
  // --------------------------
  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.descricao.toLowerCase().includes(searchTerm.toLowerCase());

    const matchUser =
      filterUser === "all" || Number(filterUser) === Number(task.id_usuario);

    return matchSearch && matchUser;
  });

  // --------------------------
  // FUNÇÕES
  // --------------------------

  const recarregarPagina = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setFormData({
      titulo: "",
      descricao: "",
      id_usuario: "1",
      prazo_final: "",
    });
    setDialogOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      titulo: task.titulo,
      descricao: task.descricao,
      id_usuario: task.id_usuario.toString(),
      prazo_final: task.prazo_final,
    });
    setDialogOpen(true);
  };

  const handleDeletarTarefa = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();

    // EDITAR
    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                titulo: formData.titulo,
                descricao: formData.descricao,
                id_usuario: Number(formData.id_usuario),
                prazo_final: formData.prazo_final,
              }
            : t
        )
      );
    } else {
      // CRIAR
      const newTask = {
        id: tasks.length + 1,
        ...formData,
        id_usuario: Number(formData.id_usuario),
      };
      setTasks([...tasks, newTask]);
    }

    setDialogOpen(false);
  };

  // -------------------
  // Conexão Com API
  // -------------------

  // const [tasks, setTasks] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [editingTask, setEditingTask] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filterUser, setFilterUser] = useState("all");
  // const [formData, setFormData] = useState({
  //   titulo: "",
  //   descricao: "",
  //   id_usuario: "",
  //   prazo_final: "",
  // });

  // // Carregar dados quando o componente inicia
  // useEffect(() => {
  //   carregarDados();
  // }, []);

  // // Atualizar formulário quando editar tarefa
  // useEffect(() => {
  //   if (editingTask) {
  //     setFormData({
  //       titulo: editingTask.titulo,
  //       descricao: editingTask.descricao,
  //       id_usuario: editingTask.id_usuario.toString(),
  //       prazo_final: editingTask.prazo_final.split("T")[0],
  //     });
  //   } else {
  //     setFormData({
  //       titulo: "",
  //       descricao: "",
  //       id_usuario: users[0]?.id.toString() || "",
  //       prazo_final: "",
  //     });
  //   }
  // }, [editingTask, users, dialogOpen]);

  // const carregarDados = async () => {
  //   try {
  //     setLoading(true);
  //     const [tarefas, usuarios] = await Promise.all([
  //       taskApi.getAll(),
  //       userApi.getAll(),
  //     ]);
  //     setTasks(tarefas);
  //     setUsers(usuarios);
  //   } catch (error) {
  //     console.error("Erro ao carregar dados:", error);
  //     toast.error("Erro ao carregar dados. Tente recarregar a página.");
  //     // Força um estado vazio para não ficar em branco
  //     setTasks([]);
  //     setUsers([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Função para recarregar a página
  // const recarregarPagina = () => {
  //   window.location.reload();
  // };

  // // Criar tarefa
  // const handleCriarTarefa = async (task) => {
  //   try {
  //     await taskApi.create(task);
  //     toast.success("Tarefa criada com sucesso!");
  //     setDialogOpen(false);
  //     recarregarPagina(); // Recarrega a página
  //   } catch (error) {
  //     toast.error("Erro ao criar tarefa");
  //   }
  // };

  // // Editar tarefa
  // const handleEditarTarefa = async (task) => {
  //   try {
  //     await taskApi.update(task.id, task);
  //     toast.success("Tarefa atualizada com sucesso!");
  //     setDialogOpen(false);
  //     recarregarPagina(); // Recarrega a página
  //   } catch (error) {
  //     toast.error("Erro ao atualizar tarefa");
  //   }
  // };

  // // Deletar tarefa
  // const handleDeletarTarefa = async (id) => {
  //   if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
  //     try {
  //       await taskApi.delete(id);
  //       toast.success("Tarefa excluída com sucesso!");
  //       recarregarPagina(); // Recarrega a página
  //     } catch (error) {
  //       toast.error("Erro ao excluir tarefa");
  //     }
  //   }
  // };

  // // Salvar tarefa (criar ou editar)
  // const handleSaveTask = (e) => {
  //   e.preventDefault();

  //   const taskData = {
  //     ...(editingTask && { id: editingTask.id }),
  //     titulo: formData.titulo,
  //     descricao: formData.descricao,
  //     id_usuario: parseInt(formData.id_usuario),
  //     prazo_final: formData.prazo_final,
  //   };

  //   if (editingTask) {
  //     handleEditarTarefa(taskData);
  //   } else {
  //     handleCriarTarefa(taskData);
  //   }
  // };

  // // Editar tarefa
  // const handleEditTask = (task) => {
  //   setEditingTask(task);
  //   setDialogOpen(true);
  // };

  // // Nova tarefa
  // const handleNewTask = () => {
  //   setEditingTask(null);
  //   setDialogOpen(true);
  // };

  // // Fechar diálogo
  // const handleCloseDialog = () => {
  //   setDialogOpen(false);
  //   setEditingTask(null);
  // };

  // // Filtrar tarefas
  // const filteredTasks = tasks.filter((task) => {
  //   const matchesSearch =
  //     task.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     task.descricao.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesUser =
  //     filterUser === "all" || task.id_usuario.toString() === filterUser;
  //   return matchesSearch && matchesUser;
  // });

  // --------------------------
  // RENDER
  // --------------------------
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
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colars">
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

                  <button
                    onClick={recarregarPagina}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    ↻
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="w-full sm:w-[200px]">
                  <select
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">Todos os usuários</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nome}
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
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  ↻ Recarregar
                </button>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Nenhuma tarefa encontrada</p>
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
                        <h3 className="text-lg font-semibold text-gray-900">
                          {task.titulo}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4">
                          {task.descricao}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{user?.nome}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(task.prazo_final).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>

                          <div className="text-sm text-gray-600">
                            ID: {task.id}
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-4 bg-gray-50 border-t flex gap-2">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="flex items-center gap-2 px-3 py-2 border rounded-md"
                        >
                          <FileText className="w-4 h-4" />
                          Editar
                        </button>

                        <button
                          onClick={() => handleDeletarTarefa(task.id)}
                          className="flex items-center gap-2 px-3 py-2 border text-red-600 rounded-md"
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

          {/* Modal Criar/Editar */}
          {dialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleSaveTask}>
                  <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-semibold">
                      {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
                    </h2>

                    <button
                      type="button"
                      onClick={handleCloseDialog}
                      className="text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm mb-1">Título</label>
                      <input
                        type="text"
                        value={formData.titulo}
                        onChange={(e) =>
                          setFormData({ ...formData, titulo: e.target.value })
                        }
                        required
                        className="w-full border px-3 py-2 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Descrição</label>
                      <textarea
                        value={formData.descricao}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            descricao: e.target.value,
                          })
                        }
                        rows={3}
                        required
                        className="w-full border px-3 py-2 rounded-md resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Usuário</label>
                      <select
                        value={formData.id_usuario}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            id_usuario: e.target.value,
                          })
                        }
                        className="w-full border px-3 py-2 rounded-md"
                      >
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.nome}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Prazo Final</label>
                      <input
                        type="date"
                        value={formData.prazo_final}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            prazo_final: e.target.value,
                          })
                        }
                        required
                        className="w-full border px-3 py-2 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 p-6 border-t">
                    <button
                      type="button"
                      onClick={handleCloseDialog}
                      className="px-4 py-2 border rounded-md"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
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
}
