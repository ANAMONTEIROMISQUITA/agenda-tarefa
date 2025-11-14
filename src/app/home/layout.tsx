import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  Users,
  BarChart3,
  Clock,
  Zap,
} from "lucide-react";
import "./home.css";

export default async function RootLayout() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Gestão Completa",
      description:
        "Crie, edite e organize todas as suas tarefas em um único lugar",
    },
    {
      icon: Calendar,
      title: "Controle de Prazos",
      description: "Nunca perca um deadline com alertas visuais de prazo",
    },
    {
      icon: Users,
      title: "Múltiplos Usuários",
      description: "Gerencie tarefas de toda sua equipe de forma centralizada",
    },
    {
      icon: BarChart3,
      title: "Filtros Inteligentes",
      description: "Encontre rapidamente o que precisa com busca e filtros",
    },
    {
      icon: Clock,
      title: "Status em Tempo Real",
      description: "Acompanhe o status de cada tarefa instantaneamente",
    },
    {
      icon: Zap,
      title: "Interface Rápida",
      description: "Design otimizado para máxima produtividade",
    },
  ];

  return (
    <html>
      <body>
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="hero">
            <div className="container">
              <h1>
                Organize suas Tarefas com <div> Eficiência </div>
              </h1>
              <p>
                Sistema completo de agendamento e gerenciamento de tarefas para
                você e sua equipe
              </p>
              <div className="hero-buttons">
                <Link className="link" href="./tasks">
                  <button>Acessar Minhas Tarefas</button>
                </Link>
                <Link className="link" href="/users">
                  <button>Gerenciar Usuários</button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features">
            <div className="container">
              <h2>Tudo que você precisa para ser mais produtivo</h2>
              <p>
                Ferramentas poderosas e intuitivas para gerenciar suas tarefas e
                alcançar seus objetivos
              </p>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="icon">
                      <feature.icon />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats">
            <div className="stats-grid">
              <div>
                <div className="stats-item blue">100%</div>
                <div className="stats-item-label">Controle Total</div>
              </div>
              <div>
                <div className="stats-item green">24/7</div>
                <div className="stats-item-label">Acesso Ilimitado</div>
              </div>
              <div>
                <div className="stats-item yellow">∞</div>
                <div className="stats-item-label">Tarefas Ilimitadas</div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta">
            <div className="container">
              <h2>Pronto para aumentar sua produtividade?</h2>
              <p>
                Comece agora a organizar suas tarefas e alcance seus objetivos
                com mais eficiência
              </p>
              <Link href="/tasks">
                <button>Começar Agora</button>
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <p>
                © 2025 Sistema de Agendamento de Tarefas. Gerencie com
                eficiência.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
