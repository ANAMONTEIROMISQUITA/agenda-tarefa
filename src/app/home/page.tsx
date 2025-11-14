// app/home/layout.tsx

export const metadata = {
  title: "Sistema de Agendamento de Tarefas",
  description:
    "Sistema completo de agendamento e gerenciamento de tarefas para você e sua equipe",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
