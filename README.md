# 🎓 EduKanda

**Plataforma educacional angolana** voltada para estudantes do ensino médio e universitário, oferecendo cursos rápidos e gratuitos.

## 📋 Sobre o Projeto

EduKanda é uma aplicação web moderna desenvolvida com React, TypeScript e TailwindCSS, focada em proporcionar uma experiência de aprendizado fluida e acessível para estudantes angolanos.

### ✨ Funcionalidades

- 🔐 **Autenticação completa** - Login e cadastro de usuários
- 📚 **Catálogo de cursos** - Navegação por categorias (Matemática, Física, Química, Programação, etc)
- 🔍 **Busca avançada** - Pesquisa de cursos por título, descrição ou instrutor
- ❤️ **Favoritos** - Sistema de marcação de cursos favoritos
- 📊 **Acompanhamento de progresso** - Visualização do progresso em cada curso
- 🎥 **Player de vídeo** - Interface para assistir aulas
- 💬 **Sistema de comentários** - Interação entre alunos e instrutores
- 🏆 **Certificados** - Emissão de certificados ao concluir cursos
- 📈 **Ranking** - Sistema de pontuação e ranking de estudantes
- 👤 **Perfil do usuário** - Gerenciamento de informações pessoais
- 🌓 **Tema claro/escuro** - Alternância entre modos de visualização
- 📱 **Design responsivo** - Funciona perfeitamente em mobile e desktop

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápido e moderno
- **React Router DOM** - Navegação entre páginas
- **TailwindCSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones
- **Axios** - Cliente HTTP (preparado para integração futura)
- **Context API** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── CourseCard.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   ├── ProgressBar.tsx
│   └── Toast.tsx
├── context/         # Contextos React (Auth, Theme)
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── data/            # Dados mockados
│   ├── certificates.ts
│   ├── courses.ts
│   └── user.ts
├── pages/           # Páginas da aplicação
│   ├── Certificates.tsx
│   ├── CoursePage.tsx
│   ├── Home.tsx
│   ├── LessonPage.tsx
│   ├── Login.tsx
│   ├── Onboarding.tsx
│   ├── Profile.tsx
│   ├── Progress.tsx
│   ├── Ranking.tsx
│   └── Register.tsx
├── routes/          # Configuração de rotas
│   └── index.tsx
├── services/        # Serviços de API (mockados)
│   └── api.ts
├── App.tsx          # Componente principal
└── main.tsx         # Entry point

```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório (ou navegue até a pasta do projeto)

```bash
cd edukanda
```

2. As dependências já foram instaladas, mas se necessário:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:

```
http://localhost:5173
```

## 🎯 Fluxo de Uso

1. **Onboarding** - 3 telas introdutórias sobre a plataforma
2. **Login/Cadastro** - Autenticação do usuário (dados mockados)
3. **Home** - Exploração de cursos com busca e filtros
4. **Página do Curso** - Detalhes, aulas e comentários
5. **Página da Aula** - Player de vídeo e materiais complementares
6. **Progresso** - Acompanhamento dos cursos em andamento
7. **Certificados** - Visualização e download de certificados
8. **Ranking** - Classificação dos estudantes
9. **Perfil** - Gerenciamento de conta e configurações

## 🔑 Credenciais de Teste

Como os dados são mockados, você pode fazer login com qualquer email e senha (mínimo 6 caracteres):

- **Email**: qualquer@email.com
- **Senha**: 123456

## 🎨 Personalização

### Cores

As cores principais podem ser alteradas em `tailwind.config.js`:

```js
colors: {
  primary: { /* Azul */ },
  secondary: { /* Laranja */ },
}
```

### Dados Mockados

Para adicionar ou modificar cursos, edite os arquivos em `src/data/`:

- `courses.ts` - Cursos e aulas
- `user.ts` - Usuários e comentários
- `certificates.ts` - Certificados

## 🔄 Integração com Backend Real

O projeto está preparado para integração fácil com um backend real:

1. Substitua as funções em `src/services/api.ts` por chamadas HTTP reais usando Axios
2. Configure as URLs da API
3. Ajuste os tipos TypeScript conforme necessário

Exemplo:

```typescript
// De:
async getCourses() {
  await delay();
  return courses;
}

// Para:
async getCourses() {
  const response = await axios.get('/api/courses');
  return response.data;
}
```

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Desenvolvido com ❤️ para a educação em Angola**
