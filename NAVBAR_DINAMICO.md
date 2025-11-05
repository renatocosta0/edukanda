# Navbar Dinâmico - Configuração por Role

## 🔧 Problema Identificado

O Navbar estava hardcoded com links da área do estudante, aparecendo igual para todos os usuários (estudantes, professores e administradores).

## ✅ Solução Implementada

Criado um **Navbar dinâmico** que se adapta automaticamente ao role do usuário logado.

---

## 📋 Configuração por Role

### **👨‍🎓 Estudante (Student)**

**Links do Navbar:**
1. **Início** (`/student/dashboard`) - Dashboard do estudante
2. **Cursos** (`/student/courses`) - Explorar cursos
3. **Meus Cursos** (`/student/my-courses`) - Cursos matriculados
4. **Ranking** (`/student/ranking`) - Classificação de estudantes
5. **Perfil** (`/student/profile`) - Perfil do usuário

**Ícones:**
- Home, BookOpen, GraduationCap, TrendingUp, User

---

### **👨‍🏫 Professor (Teacher)**

**Links do Navbar:**
1. **Dashboard** (`/teacher/dashboard`) - Dashboard do professor
2. **Cursos** (`/teacher/courses`) - Gerenciar cursos
3. **Alunos** (`/teacher/students`) - Acompanhar alunos
4. **Análises** (`/teacher/analytics`) - Estatísticas e relatórios
5. **Perfil** (`/teacher/profile`) - Perfil do usuário

**Ícones:**
- LayoutDashboard, BookOpen, Users, BarChart3, User

---

### **👨‍💼 Administrador (Admin)**

**Links do Navbar:**
1. **Dashboard** (`/admin/dashboard`) - Dashboard administrativo
2. **Usuários** (`/admin/users`) - Gerenciar usuários
3. **Cursos** (`/admin/courses`) - Moderar cursos
4. **Relatórios** (`/admin/reports`) - Relatórios gerais
5. **Configurações** (`/admin/settings`) - Configurações da plataforma

**Ícones:**
- LayoutDashboard, Users, BookOpen, BarChart3, Settings

---

## 🎨 Características

### **Responsividade**
- **Mobile:** Navbar fixo na parte inferior (bottom navigation)
- **Desktop:** Navbar fixo no topo com logo e botão de tema

### **Logo Dinâmico**
O logo redireciona para o dashboard correto baseado no role:
- Estudante → `/student/dashboard`
- Professor → `/teacher/dashboard`
- Admin → `/admin/dashboard`

### **Tema**
Botão de alternância de tema (claro/escuro) disponível apenas no desktop

### **Indicador de Página Ativa**
Links destacados em cor primária quando a página está ativa

---

## 💻 Implementação Técnica

### **Função `getLinks()`**

```typescript
const getLinks = () => {
  switch (user?.role) {
    case 'teacher':
      return [/* links do professor */];
    case 'admin':
      return [/* links do admin */];
    default: // student
      return [/* links do estudante */];
  }
};
```

### **Detecção de Role**

Usa o contexto `useAuth()` para obter o usuário logado:
```typescript
const { user } = useAuth();
```

### **Renderização Condicional**

O Navbar só renderiza se o usuário estiver autenticado:
```typescript
if (!isAuthenticated) return null;
```

---

## 🔄 Rotas Legadas Atualizadas

Rotas antigas agora redirecionam corretamente:

| Rota Antiga | Rota Nova |
|-------------|-----------|
| `/home` | `/student/dashboard` |
| `/course/:id` | `/student/courses` |
| `/progress` | `/student/my-courses` |
| `/certificates` | `/student/certificates` |
| `/ranking` | `/student/ranking` |
| `/profile` | `/student/profile` |

---

## 📱 Layout Responsivo

### **Mobile (< 768px)**
```
┌─────────────────────────┐
│                         │
│   Conteúdo da Página    │
│                         │
└─────────────────────────┘
┌─────────────────────────┐
│ 🏠  📚  🎓  📊  👤     │ ← Bottom Nav
└─────────────────────────┘
```

### **Desktop (≥ 768px)**
```
┌─────────────────────────────────────┐
│ [E] EduKanda  🏠 📚 🎓 📊 👤  🌙  │ ← Top Nav
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│                                     │
│       Conteúdo da Página            │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎯 Benefícios

1. **UX Melhorada:** Cada tipo de usuário vê apenas os links relevantes
2. **Navegação Intuitiva:** Links específicos para cada área
3. **Manutenibilidade:** Fácil adicionar/remover links por role
4. **Consistência:** Mesmo componente para todas as áreas
5. **Escalabilidade:** Fácil adicionar novos roles no futuro

---

## 🚀 Como Testar

### **Como Estudante:**
1. Login com: `joao@edukanda.ao` / `123456`
2. Verificar navbar com: Início, Cursos, Meus Cursos, Ranking, Perfil

### **Como Professor:**
1. Login com: `carlos@edukanda.ao` / `123456`
2. Verificar navbar com: Dashboard, Cursos, Alunos, Análises, Perfil

### **Como Admin:**
1. Login com: `admin@edukanda.ao` / `123456`
2. Verificar navbar com: Dashboard, Usuários, Cursos, Relatórios, Configurações

---

## 📝 Notas Importantes

- O componente `Navbar` é usado pelo `PrivateLayout`
- Todas as áreas privadas (student, teacher, admin) usam o mesmo layout
- O Navbar se adapta automaticamente sem necessidade de configuração adicional
- Ícones importados de `lucide-react`

---

**Implementado em:** Janeiro 2025  
**Arquivo:** `src/components/layout/Navbar.tsx`  
**Status:** ✅ Completo e funcional
