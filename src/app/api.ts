// Configuração da API
const API_BASE_URL = "http://localhost:5000";

// Função auxiliar para fazer requisições
async function fazerRequisicao(url: string, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Erro na requisição");
  }
  return response.json();
}

// API para Usuários
export const userApi = {
  // Buscar todos os usuários
  getAll: async () => {
    return fazerRequisicao(`${API_BASE_URL}/user`);
  },

  // Buscar usuário por ID
  getById: async (id: number) => {
    return fazerRequisicao(`${API_BASE_URL}/user/${id}`);
  },

  // Criar novo usuário
  create: async (data: String) => {
    return fazerRequisicao(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  // Atualizar usuário
  update: async (id: number, data) => {
    return fazerRequisicao(
      `${API_BASE_URL}/user?user_id=${id}&nome=${encodeURIComponent(
        data.nome
      )}&email=${encodeURIComponent(data.email)}`,
      {
        method: "PUT",
      }
    );
  },

  // Deletar usuário
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/user?user_id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok && response.status !== 204) {
      throw new Error("Erro ao deletar usuário");
    }
  },
};

// API para Tarefas
export const taskApi = {
  // Buscar todas as tarefas
  getAll: async () => {
    return fazerRequisicao(`${API_BASE_URL}/task`);
  },

  // Buscar tarefa por ID
  getById: async (id) => {
    return fazerRequisicao(`${API_BASE_URL}/task`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_id: id }),
    });
  },

  // Criar nova tarefa
  create: async (data) => {
    return fazerRequisicao(`${API_BASE_URL}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  // Atualizar tarefa
  update: async (id, data) => {
    return fazerRequisicao(`${API_BASE_URL}/task`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
  },

  // Deletar tarefa
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/task?task_id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok && response.status !== 204) {
      throw new Error("Erro ao deletar tarefa");
    }
  },
};

export default { userApi, taskApi };
