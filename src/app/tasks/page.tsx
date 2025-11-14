// app/tasks/layout.tsx

export const metadata = {
  title: "Sistema de Agendamento de Tarefas",
  description:
    "Sistema completo de agendamento e gerenciamento de tarefas para você e sua equipe",
};

export default function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
