// =======================================
// CONFIG
// =======================================
const API_BASE_URL = "http://localhost:5000";

async function request(url: string, options: RequestInit = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Erro na requisição: ${message}`);
  }

  // Retorna 204 No Content sem tentar fazer json()
  if (response.status === 204) return null;

  return response.json();
}

// =======================================
// USER API
// =======================================
export const userApi = {
  // Listar todos os usuários
  getAll: async () => {
    return request(`${API_BASE_URL}/user`);
  },

  // Buscar usuário por ID
  getById: async (id: number) => {
    return request(`${API_BASE_URL}/user/${id}`);
  },

  // Criar usuário
  create: async (data: { nome: string; email: string }) => {
    return request(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  // Atualizar usuário
  update: async (id: number, data: { nome: string; email: string }) => {
    return request(`${API_BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  // Deletar usuário
  delete: async (id: number) => {
    return request(`${API_BASE_URL}/user/${id}`, {
      method: "DELETE",
    });
  },
};

// =======================================
// TASK API
// =======================================
export const taskApi = {
  // Listar todas as tarefas
  getAll: async () => {
    return request(`${API_BASE_URL}/task`);
  },

  // Buscar tarefa por ID
  getById: async (id: number) => {
    return request(`${API_BASE_URL}/task/${id}`);
  },

  // Criar tarefa
  create: async (data: { titulo: string; descricao: string }) => {
    return request(`${API_BASE_URL}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  // Atualizar tarefa
  update: async (
    id: number,
    data: { titulo?: string; descricao?: string; status?: string }
  ) => {
    return request(`${API_BASE_URL}/task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  // Deletar tarefa
  delete: async (id: number) => {
    return request(`${API_BASE_URL}/task/${id}`, {
      method: "DELETE",
    });
  },
};

export default { userApi, taskApi };
