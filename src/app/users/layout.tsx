"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Mail, Home, X } from "lucide-react";
import "../global.css";

// -----------------------------
// FAKE USERS
// -----------------------------
export const fakeUsers = [
  {
    id: "1",
    name: "João Martins",
    email: "joao.martins@example.com",
    role: "Administrador",
  },
  {
    id: "2",
    name: "Ana Souza",
    email: "ana.souza@example.com",
    role: "Usuário",
  },
  {
    id: "3",
    name: "Carlos Henrique",
    email: "carlos.henrique@example.com",
    role: "Gerente",
  },
  {
    id: "4",
    name: "Mariana Alves",
    email: "mariana.alves@example.com",
    role: "Usuário",
  },
  {
    id: "5",
    name: "Pedro Lima",
    email: "pedro.lima@example.com",
    role: "Administrador",
  },
  {
    id: "6",
    name: "Fernanda Costa",
    email: "fernanda.costa@example.com",
    role: "Usuário",
  },
  {
    id: "7",
    name: "Ricardo Gomes",
    email: "ricardo.gomes@example.com",
    role: "Gerente",
  },
  {
    id: "8",
    name: "Beatriz Rocha",
    email: "beatriz.rocha@example.com",
    role: "Usuário",
  },
  {
    id: "9",
    name: "Lucas Pereira",
    email: "lucas.pereira@example.com",
    role: "Usuário",
  },
  {
    id: "10",
    name: "Sofia Mendes",
    email: "sofia.mendes@example.com",
    role: "Gerente",
  },
];

// -----------------------------
// COMPONENTE
// -----------------------------
export default function RootLayout() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Estado da modal
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });

  // Simula carregamento
  useEffect(() => {
    setTimeout(() => {
      setUsers(fakeUsers);
      setLoading(false);
    }, 600);
  }, []);

  // Filtragem
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -----------------------------
  // FUNÇÕES DO DIÁLOGO
  // -----------------------------
  const handleNewUser = () => {
    setEditingUser(null);
    setFormData({ nome: "", email: "" });
    setDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      nome: user.name,
      email: user.email,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
    setFormData({ nome: "", email: "" });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();

    if (editingUser) {
      // Editar usuário
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, name: formData.nome, email: formData.email }
            : u
        )
      );
    } else {
      // Criar usuário
      const newUser = {
        id: String(Date.now()),
        name: formData.nome,
        email: formData.email,
        role: "Usuário",
      };

      setUsers((prev) => [...prev, newUser]);
    }

    handleCloseDialog();
  };

  const handleDeletarUsuario = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <html>
      <body>
        {/* Cabeçalho */}
        <div className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Link href="/">
                  <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors mb-2">
                    <Home className="w-4 h-4" />
                    Home
                  </button>
                </Link>

                <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
                <p className="text-gray-600 mt-1">
                  Gerencie os usuários do sistema
                </p>
              </div>

              <button
                onClick={handleNewUser}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Novo Usuário
              </button>
            </div>

            {/* Barra de busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Lista de usuários */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Carregando usuários...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {searchTerm
                  ? "Nenhum usuário encontrado"
                  : "Nenhum usuário cadastrado"}
              </p>

              <button
                onClick={handleNewUser}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-4 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Criar primeiro usuário
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mt-1">
                        <Mail className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-600 text-sm">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500">ID: {user.id}</p>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex-1 justify-center transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                      Editar
                    </button>

                    <button
                      onClick={() => handleDeletarUsuario(user.id)}
                      className="flex items-center gap-2 px-3 py-2 text-red-600 bg-white border border-gray-300 rounded-md hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* -----------------------------
          DIÁLOGO DE CRIAR/EDITAR
      ----------------------------- */}
        {dialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <form onSubmit={handleSaveUser}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingUser ? "Editar Usuário" : "Novo Usuário"}
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
                    {editingUser
                      ? "Atualize as informações do usuário"
                      : "Preencha os dados do novo usuário"}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="nome"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nome
                      </label>
                      <input
                        id="nome"
                        type="text"
                        value={formData.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
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
                    {editingUser ? "Salvar" : "Criar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
