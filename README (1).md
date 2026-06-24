# Serene - Sistema de Produtividade Minimalista

Serene é um gerenciador de tarefas e de produtividade premium que une o minimalismo visual a interações táteis de alta fidelidade. Projetado para quem prioriza clareza mental e foco, o aplicativo substitui a pressão excessiva da cultura de cobrança digital por um ambiente que se assemelha a um diário pessoal ou a um organizador físico de couro e papel texturizado.

---

## 📱 Visualização das Telas (Preview)

Abaixo estão as reproduções visuais premium e táteis das 4 telas do Serene exatamente como apresentadas no início do projeto:

<p align="center">
  <img src="./src/assets/images/initial_screen_preview_1782313036029.jpg" alt="1. Minhas Tarefas" width="220" style="border-radius: 16px; margin: 10px; box-shadow: 0 4px 20px rgba(12, 61, 94, 0.12);" referrerPolicy="no-referrer" />
  <img src="./src/assets/images/new_task_screen_preview_1782313234050.jpg" alt="2. Nova Tarefa" width="220" style="border-radius: 16px; margin: 10px; box-shadow: 0 4px 20px rgba(12, 61, 94, 0.12);" referrerPolicy="no-referrer" />
</p>
<p align="center">
  <img src="./src/assets/images/statistics_screen_preview_1782313217971.jpg" alt="3. Estatísticas" width="220" style="border-radius: 16px; margin: 10px; box-shadow: 0 4px 20px rgba(12, 61, 94, 0.12);" referrerPolicy="no-referrer" />
  <img src="./src/assets/images/profile_screen_preview_1782313250088.jpg" alt="4. Meu Perfil" width="220" style="border-radius: 16px; margin: 10px; box-shadow: 0 4px 20px rgba(12, 61, 94, 0.12);" referrerPolicy="no-referrer" />
</p>

---

## 🎨 Identidade Visual & Design

O ecossistema estético do Serene baseia-se em escolhas de design meticulosas e sofisticadas:

- **Paleta de Cores Aquática & Calmante**:
  - **Deep Blue (`#0c3d5e`)**: Cor de ancoragem primária que garante alta legibilidade e sofisticação aos cabeçalhos e botões principais.
  - **Ocean Blue (`#2e90c9`)**: Um tom luminoso usado para interações secundárias, botões de ação e tags de relevância.
  - **Cyan (`#6fd1d7`)**: O toque final brilhante que destaca progressos e estados concluídos com elegância.
- **Tipografia**: Utiliza a moderna fonte **Plus Jakarta Sans**, com terminais arredondados e amigáveis para dar leveza à leitura sem perder o profissionalismo.
- **Arredondamento Orgânico (Rounded Corners)**: O uso de cantos vivos é inteiramente evitado. Os cards utilizam cantos com raio de `16px` (`rounded-2xl`) e os botões trazem curvaturas estendidas de alta roundedness (`32px` ou formato Pílula).
- **Sombras de Ambiente Realistas**: Desfocalizações suaves com sutil opacidade azulada criam uma sensação de profundidade e flutuação tátil natural.

---

## 🚀 Funcionalidades Principais

O aplicativo conta com uma navegação na barra inferior do tipo **Floating Dock** e divide-se em quatro visões principais:

### 1. Minhas Tarefas (Lista Principal)
- **Filtros por Estado**: Alternador instantâneo entre categorias (Todos, Completos, Pendentes).
- **Checkbox Circular Tátil**: Em vez de caixas de seleção tradicionais, os checkmarks usam círculos táteis — borda azulada vazia para tarefas ativas e preenchimento Cyan com ícone de verificação ao completar.
- **Watermark Mental**: Frases motivacionais rotativas coletadas de grandes inventores e filósofos, atualizadas ao toque do usuário.
- **Card Resumo**: Indicador numérico dinâmico que contabiliza todas as suas conquistas acumuladas.

### 2. Nova Tarefa (Formulário de Entrada)
- **Campos Sem Bordas (Borderless Inputs)**: Inputs imersivos com cantos hiper-arredondados e cores de fundo suaves.
- **Seletores Inteligentes de Data & Hora**: Seleções acopladas de layout lado a lado com formatação de dia da semana no idioma nativo e indicadores de período do dia (Manhã, Tarde, Noite).
- **Seletor de Prioridade**: Escolha entre Baixa, Média e Alta com estados táteis que diminuem suavemente em escala (98%) ao toque.

### 3. Estatísticas & Gráficos
- **Visão Geral Circular**: Um anel de preenchimento dinâmico e animado que reflete a porcentagem de eficácia diária.
- **Produtividade Mensal**: Gráficos de barras que mapeiam semanalmente seu progresso no mês para maior controle de consistência.
- **Widgets de Performance**: Seções de contagem de dias em maior sequência de foco e médias de tarefas diárias completadas.
- **Banner de Conquista**: Um cartão azul comemorativo com o troféu "Mestre do Foco" para parabenizar seus esforços.

### 4. Meu Perfil de Usuário
- **Edição em Tempo Real**: Ative o modo edição diretamente no lápis flutuante para alterar nome e e-mail.
- **Central de Preferências**: Opção de alternância de notificações nativa através de um Switch deslizante fluído e suave.
- **Reinicialização Demo**: Botão elegante para resetar o banco de dados local para dados predefinidos e apresentáveis a qualquer momento.

---

## 🛠️ Tecnologias Utilizadas

- **React 19** & **TypeScript**
- **Vite** (Framework de build ultra-rápido)
- **Tailwind CSS** (Estilização baseada em utilitários e variáveis de tema personalizadas)
- **Lucide React** (Ícones limpos, lineares e sofisticados)
- **Local Storage** (Sincronização persistente do seu progresso, mantendo os dados seguros no navegador do usuário)
