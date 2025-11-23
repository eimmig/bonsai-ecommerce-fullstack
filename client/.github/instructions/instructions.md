---
applyTo: '**'
---

# Instruções de Desenvolvimento React - Boas Práticas

## Introdução

NUNCA EXPLIQUE AS RESPOSTAS. APENAS INFORME QUE FOI FINALIZADO.!

Esse guia tem como objetivo definir os padrões e convenções utilizadas no time de Onboarding para desenvolvimento front-end com **React + TypeScript**. São definições criadas para consistência do projeto e garantia de qualidade. Sugestões são sempre bem vindas! :)

Além das sugestões, sempre ter em mente essas recomendações principais:

- **Simplicidade**: buscar soluções simples, não trazendo overengineering desnecessário. Complexidade nem sempre é necessário
- **Divisão de responsabilidade**: procurar sempre quebrar as responsabilidades, onde cada elemento (podendo ser um componente, hook, etc) tenha uma única função, sem agrupar diferentes funções

## Bibliotecas Recomendadas

### 📊 Visão Geral: Papel de Cada Biblioteca

Cada biblioteca tem uma **responsabilidade específica** - não há duplicação:

| Biblioteca | Responsabilidade | Exemplo de Uso |
|------------|------------------|----------------|
| **Zod** | Validação de schemas e tipos | Validar formulários, validar respostas de API |
| **Zustand** | Estado global da aplicação (UI state) | Carrinho, usuário logado, tema, modals |
| **React Query** | Gerenciar dados do servidor (cache, sync) | Produtos, pedidos, dados de API |
| **React Hook Form** | Gerenciar formulários complexos | Formulários com múltiplos campos |
| **date-fns** | Manipulação de datas | Formatar datas, calcular diferenças |

#### Por que Zod E React Hook Form?

**Zod**: Define **o que é válido** (schema de validação)
```tsx
const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});
// Zod valida: "isso é um email válido?"
```

**React Hook Form**: Gerencia **como o formulário funciona** (estado, submissão, errors)
```tsx
const { register, handleSubmit } = useForm();
// RHF gerencia: input values, touched, dirty, submit
```

**Juntos**: React Hook Form usa Zod para validação
```tsx
useForm({ resolver: zodResolver(userSchema) });
// RHF gerencia o form + usa Zod para validar
```

#### Por que Zustand E React Query?

**Zustand**: Estado de **UI/aplicação** (você controla)
```tsx
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));
// Estado que VOCÊ muda: carrinho, tema, modal aberto/fechado
```

**React Query**: Dados do **servidor** (cache automático, sync)
```tsx
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});
// Dados que VÊM DO SERVIDOR: produtos, usuários, pedidos
// React Query gerencia: cache, refetch, loading, error
```

**Nunca duplique**: Se vem do servidor → React Query. Se é estado local → Zustand.

---

### Core Dependencies
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "typescript": "^5.7.0",
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0"
}
```

### State Management
```json
{
  "zustand": "^5.0.0",
  "@tanstack/react-query": "^5.90.0"
}
```

**Quando usar cada um:**

```tsx
// ✅ Zustand: Estado de UI que você controla
const useUIStore = create((set) => ({
  sidebarOpen: false,
  theme: 'light',
  cart: [],
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

// ✅ React Query: Dados do servidor (cache automático)
const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json()),
    staleTime: 5 * 60 * 1000, // Cache por 5min
  });
};

// ❌ NUNCA: Duplicar dados do servidor no Zustand
const useBadStore = create((set) => ({
  products: [], // ❌ Não fazer! Use React Query
  setProducts: (products) => set({ products }), // ❌ React Query já faz isso
}));
```

### Forms & Validation
```json
{
  "react-hook-form": "^7.65.0",
  "zod": "^4.1.0",
  "@hookform/resolvers": "^5.2.0"
}
```

**Como trabalham juntos:**

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1️⃣ Zod: Define REGRAS de validação (schema)
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>; // Gera TypeScript types automaticamente!

// 2️⃣ React Hook Form: GERENCIA o formulário
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema), // Conecta Zod com RHF
  });
  
  const onSubmit = (data: LoginForm) => {
    // data já está validado pelo Zod!
    console.log(data); // { email: string, password: string }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Entrar</button>
    </form>
  );
}
```

**Benefícios:**
- ✅ Zod valida + gera TypeScript types (DRY - Don't Repeat Yourself)
- ✅ RHF gerencia performance (não re-renderiza a cada keystroke)
- ✅ Validação tanto no cliente quanto reutilizável no servidor

### Routing & HTTP
```json
{
  "react-router-dom": "^7.0.0"
}
```

> **Nota**: Axios foi removido em favor do `fetch` nativo do JavaScript, que agora possui suporte completo em navegadores modernos e oferece melhor performance. Para TypeScript, use tipos nativos como `Response` e `RequestInit`.

### Styling
```json
{
  "tailwindcss": "^4.0.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0"
}
```

> **Nota**: Tailwind CSS v4 com melhor performance e DX. Para componentes com variantes, use `class-variance-authority` (CVA) ao invés de styled-components. CSS Modules continuam válidos para casos específicos.

### Utilities
```json
{
  "date-fns": "^4.1.0",
  "clsx": "^2.1.0",
  "react-error-boundary": "^6.0.0"
}
```

---

## 🎯 Exemplos Práticos: Quando Usar Cada Biblioteca

### Exemplo 1: E-commerce (Carrinho de Compras)

```tsx
// ✅ React Query: Buscar produtos do servidor
const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json()),
  });
};

// ✅ Zustand: Gerenciar carrinho (estado local da UI)
const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) => set((state) => ({
    items: [...state.items, product],
  })),
  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId),
  })),
  clearCart: () => set({ items: [] }),
}));

// ✅ Zod: Validar formulário de checkout
const checkoutSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(10),
  cardNumber: z.string().regex(/^\d{16}$/),
});

// Componente que usa TUDO junto:
function CheckoutPage() {
  const { data: products } = useProducts(); // React Query
  const { items, clearCart } = useCartStore(); // Zustand
  
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(checkoutSchema), // Zod + RHF
  });
  
  const onSubmit = async (data: CheckoutForm) => {
    // data validado pelo Zod
    // items vem do Zustand
    await submitOrder({ ...data, items });
    clearCart();
  };
  
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

### Exemplo 2: Dashboard com Filtros

```tsx
// ✅ Zustand: Estado dos filtros (UI state)
const useFilterStore = create<FilterState>((set) => ({
  dateRange: { start: null, end: null },
  category: 'all',
  setDateRange: (range) => set({ dateRange: range }),
  setCategory: (category) => set({ category }),
}));

// ✅ React Query: Buscar dados baseado nos filtros
const useOrders = () => {
  const { dateRange, category } = useFilterStore();
  
  return useQuery({
    queryKey: ['orders', dateRange, category], // Refetch quando filtros mudam
    queryFn: () => fetchOrders({ dateRange, category }),
  });
};

// ✅ Zod: Validar parâmetros de busca
const filterSchema = z.object({
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }),
  category: z.enum(['all', 'electronics', 'clothing']),
});

function Dashboard() {
  const { data: orders, isLoading } = useOrders(); // React Query
  const { setCategory } = useFilterStore(); // Zustand
  
  return (
    <div>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="all">Todos</option>
        <option value="electronics">Eletrônicos</option>
      </select>
      
      {isLoading ? <Spinner /> : <OrderTable orders={orders} />}
    </div>
  );
}
```

### Exemplo 3: Validação de API Response

```tsx
// ✅ Zod: Validar que a resposta da API está correta
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
});

// ✅ React Query com validação Zod
const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();
      
      // Valida resposta da API em runtime
      return userSchema.parse(data); // Lança erro se inválido
    },
  });
};

// Agora você tem type-safety REAL (não só types do TS)
function UserProfile({ userId }: { userId: string }) {
  const { data: user } = useUser(userId);
  
  // TypeScript + Runtime validation garantem que user.email existe!
  return <div>{user?.email}</div>;
}
```

## Índice
- [Introdução](#introdução)
- [Bibliotecas Recomendadas](#bibliotecas-recomendadas)
- [Guia de Estilo de Código](#guia-de-estilo-de-código)
- [Guia de Boas Práticas](#guia-de-boas-práticas)
- [Entidades/Entities](#entidadesentities)
- [Features](#features)
- [Componentes Compartilhados](#componentes-compartilhados)
- [Shared Components](#shared-components)
- [Custom Hooks](#custom-hooks)
- [Utils & Helpers](#utils--helpers)

---

## Guia de Estilo de Código

Nessa seção estão definidas as convenções de estilização do código React + TypeScript, baseadas nas melhores práticas da comunidade React.

### Mudanças Importantes no React 19

- **Não use `React.FC`**: A tipagem explícita de componentes funcionais não é mais recomendada. Use inferência de tipos do TypeScript.
- **`isLoading` → `isPending`**: React Query v5 mudou a nomenclatura para melhor clareza semântica.
- **Compiler automático**: React 19 otimiza automaticamente muitas re-renderizações, reduzindo a necessidade de `React.memo` e `useMemo`.
- **Fetch nativo**: Preferir `fetch` ao invés de bibliotecas como axios para requisições HTTP.
- **`use()` hook**: Novo hook para ler promises e contextos em componentes.
- **Actions**: Funções que gerenciam transições de estado automaticamente com `useActionState`.
- **`useOptimistic()`**: Para updates otimistas de UI antes da confirmação do servidor.
- **`useFormStatus()`**: Hook para acessar status de formulários em componentes filhos.
- **`ref` como prop**: Não é mais necessário `forwardRef` - `ref` é uma prop normal agora.
- **Metadata e Document head**: Use `<title>`, `<meta>` e `<link>` diretamente nos componentes.

### Convenções de Nomenclatura

#### Componentes React

Componentes devem usar **PascalCase** e sempre ser nomeados com substantivos:

```tsx
// ❌ Não fazer
const userProfile = () => { };
const User_Profile = () => { };
const UserProfile: React.FC = () => { }; // React.FC não é mais recomendado

// ✅ Fazer
const UserProfile = () => { };
const EmailValidator = () => { };
```

#### Custom Hooks

Hooks customizados devem sempre começar com "use" e usar **camelCase**:

```tsx
// ❌ Não fazer
const getUsers = () => { };
const UserData = () => { };

// ✅ Fazer
const useUsers = () => { };
const useUserData = () => { };
```

#### Interfaces e Types

Interfaces devem ser definidas apenas com o nome que se referem, **não devem** ter "I":

```typescript
// ❌ Não fazer
export interface ICustomer {
    id: string;
}

// ✅ Fazer
export interface Customer {
    id: string;
}

export type UserRole = 'admin' | 'user' | 'guest';
```

#### Nomenclatura de Arquivos

Os arquivos do projeto devem seguir os padrões:

- **Componentes**: `PascalCase.tsx` → `UserProfile.tsx`
- **Hooks**: `use-kebab-case.ts` → `use-user-data.ts`
- **Utils**: `kebab-case.ts` → `date-utils.ts`
- **Types**: `kebab-case.types.ts` → `user.types.ts`

### Convenções de Ordem

#### Ordem das Importações

```tsx
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/stores/user-store';

// 4. Relative imports
import './UserProfile.styles.css';
```

#### Ordem dentro do Componente

```tsx
const UserProfile = ({ userId }: { userId: string }) => {
  // 1. State hooks
  const [loading, setLoading] = useState(false);
  
  // 2. Store hooks
  const { user, setUser } = useUserStore();
  
  // 3. Custom hooks
  const { data, error } = useUserData(userId);
  
  // 4. Effect hooks
  useEffect(() => {
    // setup
    return () => {
      // cleanup
    };
  }, []);
  
  // 5. Event handlers
  const handleSubmit = () => { };
  
  // 6. Render helpers
  const renderUserInfo = () => { };
  
  // 7. Return JSX
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

---

## Guia de Boas Práticas

### Gerenciamento de Estado (!)

#### State Local vs Global

Use estado local para dados específicos do componente e global para dados compartilhados:

```tsx
// ✅ Estado local para dados do componente
const UserForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  
  return (/* JSX */);
};

// ✅ Estado global para dados compartilhados
const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

#### Cleanup de Effects (!)

**Sempre** limpar side effects para evitar memory leaks:

```tsx
// ✅ Fazer
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal
      });
      // handle response
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    }
  };
  
  fetchData();
  
  return () => {
    controller.abort();
  };
}, []);
```

### Uso de any (!)

A utilização de `any` não é recomendada. Use `unknown` quando não souber o tipo:

```tsx
// ❌ Não fazer
const processData = (data: any) => { };

// ✅ Fazer
const processData = (data: unknown) => {
  // Type guards necessários
  if (typeof data === 'object' && data !== null) {
    // processar dados
  }
};
```

### React.memo e useMemo (!)

> **Importante**: No React 19, o compilador React automático otimiza muitas re-renderizações. Use `React.memo` apenas quando necessário após medir performance.

Use `React.memo` criteriosamente para componentes que renderizam frequentemente sem mudanças nas props:

```tsx
// ✅ Para componentes puros/dummy COM problema de performance comprovado
const UserCard = React.memo(({ user }: { user: User }) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});

// ✅ Para computações pesadas
const ExpensiveComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);
  
  return <div>{expensiveValue}</div>;
};
```

### Error Boundaries (!)

Sempre implementar error boundaries para capturar erros:

```tsx
// src/components/ErrorBoundary.tsx
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <h2>Algo deu errado:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Tentar novamente</button>
    </div>
  );
};

// Uso
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <App />
</ErrorBoundary>
```

### Lazy Loading de Rotas (!)

Sempre usar lazy loading para rotas:

```tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const UserProfile = lazy(() => import('@/pages/UserProfile'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));

const AppRoutes = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <Routes>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Suspense>
);
```

### React 19 Actions e Form Handling (!)

#### Usando useActionState para Formulários

```tsx
import { useActionState } from 'react';

// Action que retorna estado e errors
async function updateUserAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  try {
    const user = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
    });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function UserForm() {
  const [state, formAction, isPending] = useActionState(updateUserAction, { success: false });
  
  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button disabled={isPending}>
        {isPending ? 'Salvando...' : 'Salvar'}
      </button>
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

#### Usando useFormStatus em Componentes Filhos

```tsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar'}
    </button>
  );
}

function MyForm() {
  return (
    <form action={submitAction}>
      <input name="message" />
      <SubmitButton /> {/* Acessa o status do form automaticamente */}
    </form>
  );
}
```

#### Usando useOptimistic para Updates Otimistas

```tsx
import { useOptimistic } from 'react';

function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );
  
  async function addTodo(formData: FormData) {
    const newTodo = { id: crypto.randomUUID(), text: formData.get('text'), pending: true };
    
    // UI atualiza imediatamente
    addOptimisticTodo(newTodo);
    
    // Requisição ao servidor
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });
  }
  
  return (
    <>
      <form action={addTodo}>
        <input name="text" />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

### Custom Hooks para Lógica de Formulários (!)

Use React Hook Form com Zod para validação (quando não usar Actions nativas):

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.email('Email inválido'),
});

type UserFormData = z.infer<typeof userSchema>;

const useUserForm = () => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });
  
  return form;
};
```

### Tratamento de Datas

Use `date-fns` para manipulação de datas:

```tsx
import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// ✅ Utils para datas
export const DateUtils = {
  formatDate: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Data inválida';
    return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
  },
  
  formatDateTime: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Data inválida';
    return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  },
};
```

### Usar Tailwind + CVA ou CSS Modules

Preferir Tailwind CSS com Class Variance Authority (CVA) ou CSS Modules:

```tsx
// Tailwind + CVA (Recomendado)
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const buttonVariants = cva(
  'rounded-md font-medium transition-opacity hover:opacity-80',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white',
        secondary: 'bg-gray-600 text-white',
        danger: 'bg-red-600 text-white',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = ({ children, variant, size }: ButtonProps) => (
  <button className={buttonVariants({ variant, size })}>
    {children}
  </button>
);

// CSS Modules (alternativa)
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary' }) => (
  <button className={clsx(styles.button, styles[variant])}>
    {children}
  </button>
);
```

### Ref como Prop (React 19) (!)

No React 19, `ref` é uma prop normal - não é mais necessário `forwardRef`:

```tsx
// ✅ React 19 - ref como prop
function Input({ ref, ...props }: { ref?: React.Ref<HTMLInputElement> } & React.ComponentProps<'input'>) {
  return <input ref={ref} {...props} />;
}

// ❌ React 18 - forwardRef (não mais necessário)
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Uso (igual em ambas versões)
function MyForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return <Input ref={inputRef} placeholder="Nome" />;
}
```

### use() Hook para Promises e Context (!)

```tsx
import { use } from 'react';

// Ler promises diretamente
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise); // Suspende até resolver
  
  return <div>{user.name}</div>;
}

// Ler context condicionalmente
function ConditionalTheme({ useTheme }: { useTheme: boolean }) {
  const theme = useTheme ? use(ThemeContext) : 'light';
  
  return <div className={theme}>Content</div>;
}
```

### Evitar Props Drilling

Use Context ou Zustand para dados globais:

```tsx
// Context API
const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext deve ser usado dentro de UserProvider');
  }
  return context;
};

// Zustand (Recomendado)
export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  
  setUser: (user) => set({ user }),
  
  fetchUser: async (id) => {
    set({ loading: true });
    try {
      const user = await userApi.getById(id);
      set({ user, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
```

### Renderização Condicional (!)

Evite renderização com métodos complexos:

```tsx
// ❌ Não fazer
const UserList = ({ users }) => {
  const hasUsers = () => {
    return users && users.length > 0 && users.some(user => user.active);
  };
  
  return (
    <div>
      {hasUsers() && <UserGrid users={users} />}
    </div>
  );
};

// ✅ Fazer
const UserList = ({ users }) => {
  const activeUsers = useMemo(() => 
    users?.filter(user => user.active) || []
  , [users]);
  
  const hasActiveUsers = activeUsers.length > 0;
  
  return (
    <div>
      {hasActiveUsers && <UserGrid users={activeUsers} />}
    </div>
  );
};
```

### Usar Enums e Constants

Centralizar constantes e enums:

```tsx
// src/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
} as const;

// src/types/user.types.ts
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;
```

### Acessibilidade (a11y) (!)

Sempre implementar acessibilidade:

```tsx
// ✅ Boas práticas de acessibilidade
function AccessibleButton() {
  return (
    <button
      type="button"
      aria-label="Fechar modal"
      onClick={handleClose}
    >
      <XIcon aria-hidden="true" />
    </button>
  );
}

function AccessibleForm() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        aria-required="true"
        aria-describedby="email-error"
      />
      <span id="email-error" role="alert">
        Email inválido
      </span>
    </form>
  );
}

// Navegação por teclado
function KeyboardNav() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      Clicável
    </div>
  );
}

// Focus management
function Modal({ isOpen, onClose }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">Título do Modal</h2>
      <button ref={closeButtonRef} onClick={onClose}>
        Fechar
      </button>
    </div>
  );
}
```

### SEO e Meta Tags (React 19) (!)

No React 19, use tags meta diretamente nos componentes:

```tsx
function ProductPage({ product }: { product: Product }) {
  return (
    <>
      <title>{product.name} - Loja Bonsai</title>
      <meta name="description" content={product.description} />
      <meta property="og:title" content={product.name} />
      <meta property="og:image" content={product.image} />
      <link rel="canonical" href={`https://example.com/products/${product.id}`} />
      
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    </>
  );
}

// Para projetos com react-helmet-async (compatibilidade)
import { Helmet } from 'react-helmet-async';

function LegacySEO() {
  return (
    <Helmet>
      <title>Título da Página</title>
      <meta name="description" content="Descrição" />
    </Helmet>
  );
}
```

### Performance - Code Splitting (!)

```tsx
import { lazy, Suspense } from 'react';

// Lazy loading de componentes pesados
const HeavyChart = lazy(() => import('@/components/HeavyChart'));
const VideoPlayer = lazy(() => import('@/components/VideoPlayer'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>Mostrar Gráfico</button>
      
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart data={data} />
        </Suspense>
      )}
    </div>
  );
}

// Preload on hover para melhor UX
function ProductCard({ product }: { product: Product }) {
  const handleMouseEnter = () => {
    // Precarrega a página de detalhes
    import('@/pages/ProductDetail');
  };
  
  return (
    <Link to={`/products/${product.id}`} onMouseEnter={handleMouseEnter}>
      {product.name}
    </Link>
  );
}
```

### Adapter Pattern para Bibliotecas Externas

Criar camada de abstração para bibliotecas:

```tsx
// src/adapters/chart-adapter.ts
import Highcharts from 'highcharts';

export interface ChartConfig {
  title: string;
  data: number[];
  labels: string[];
}

export class ChartAdapter {
  static createChart(elementId: string, config: ChartConfig) {
    return Highcharts.chart(elementId, {
      title: { text: config.title },
      xAxis: { categories: config.labels },
      series: [{
        name: 'Data',
        data: config.data,
      }],
    });
  }
}

// Uso no componente
const ChartComponent = ({ config }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current) {
      ChartAdapter.createChart(chartRef.current.id, config);
    }
  }, [config]);
  
  return <div ref={chartRef} id="chart-container" />;
};
```

---

## Entidades/Entities

As entidades são responsáveis por garantir a estrutura correta dos dados, usando **custom hooks**, **stores** e **API functions**.

### useEntity (Custom Hook)

O custom hook substitui o `entity.service.ts`, centralizando lógica de negócio:

```tsx
// src/hooks/use-employee.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEmployeeStore } from '@/stores/employee-store';
import { employeeApi } from '@/api/employee-api';
import { GetEmployeeInfo } from '@/types/employee.types';

export const useEmployee = () => {
  const queryClient = useQueryClient();
  const { employee, setEmployee } = useEmployeeStore();
  
  const {
    data: employeeData,
    isPending,
    error,
  } = useQuery({
    queryKey: ['employee', employee?.id],
    queryFn: () => employeeApi.getById(employee?.id),
    enabled: !!employee?.id,
  });
  
  const updateEmployeeMutation = useMutation({
    mutationFn: employeeApi.update,
    onSuccess: (updatedEmployee) => {
      setEmployee(updatedEmployee);
      queryClient.invalidateQueries({ queryKey: ['employee'] });
    },
  });
  
  const getEmployeeInfo = (payload: GetEmployeeInfoPayload) => {
    const dto = GetEmployeeInfo.toDto(payload);
    return employeeApi.getInfo(dto).then(GetEmployeeInfo.fromDto);
  };
  
  return {
    employee: employeeData,
    isLoading,
    error,
    updateEmployee: updateEmployeeMutation.mutate,
    getEmployeeInfo,
    store: { employee, setEmployee },
  };
};
```

### API Functions (entity-api.ts)

Funções puras para chamadas HTTP, substituindo `entity-requisition.service.ts`:

```tsx
// src/api/employee-api.ts
import { apiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';
import {
  GetEmployeeInfoRequest,
  GetEmployeeInfoResponse,
  Employee,
} from '@/types/employee.types';

export const employeeApi = {
  getById: async (id: string): Promise<Employee> => {
    const response = await apiClient.get<Employee>(`${ENDPOINTS.EMPLOYEES}/${id}`);
    return response;
  },
  
  getInfo: async (request: GetEmployeeInfoRequest): Promise<GetEmployeeInfoResponse> => {
    const response = await apiClient.post<GetEmployeeInfoResponse>(
      `${ENDPOINTS.QUERIES}/${ENDPOINTS.GET_EMPLOYEE_INFO}`,
      request
    );
    return response;
  },
  
  update: async (employee: Partial<Employee>): Promise<Employee> => {
    const response = await apiClient.put<Employee>(
      `${ENDPOINTS.EMPLOYEES}/${employee.id}`,
      employee
    );
    return response;
  },
};

// Exemplo de apiClient com fetch nativo:
// export const apiClient = {
//   get: async <T>(url: string): Promise<T> => {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Request failed');
//     return response.json();
//   },
//   post: async <T>(url: string, data: unknown): Promise<T> => {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) throw new Error('Request failed');
//     return response.json();
//   },
// };
```

### Zustand Store (entity-store.ts)

Store global para estado compartilhado:

```tsx
// src/stores/employee-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Employee } from '@/types/employee.types';

interface EmployeeState {
  employee: Employee | null;
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

interface EmployeeActions {
  setEmployee: (employee: Employee) => void;
  setEmployees: (employees: Employee[]) => void;
  clearEmployee: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateEmployeeName: (name: string) => void;
}

export const useEmployeeStore = create<EmployeeState & EmployeeActions>()(
  devtools(
    (set, get) => ({
      // State
      employee: null,
      employees: [],
      loading: false,
      error: null,
      
      // Actions
      setEmployee: (employee) => set({ employee }),
      
      setEmployees: (employees) => set({ employees }),
      
      clearEmployee: () => set({ employee: null }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      updateEmployeeName: (name) => {
        const { employee } = get();
        if (employee) {
          set({ employee: { ...employee, name } });
        }
      },
    }),
    { name: 'employee-store' }
  )
);
```

---

## Features

As features são componentes específicos que atuam com regras de negócio individuais, seguindo **Atomic Design**.

### Estrutura de Feature

```tsx
// src/features/user-management/UserManagement.tsx
import React from 'react';
import { UserList } from './components/UserList';
import { UserFilters } from './components/UserFilters';
import { useUserManagement } from './hooks/use-user-management';

export const UserManagement = () => {
  const {
    users,
    filters,
    loading,
    handleFilterChange,
    handleUserSelect,
  } = useUserManagement();
  
  if (loading) return <div>Carregando...</div>;
  
  return (
    <div className="user-management">
      <UserFilters filters={filters} onChange={handleFilterChange} />
      <UserList users={users} onUserSelect={handleUserSelect} />
    </div>
  );
};

// src/features/user-management/hooks/use-user-management.ts
export const useUserManagement = () => {
  const [filters, setFilters] = useState<UserFilters>({});
  const { users, loading } = useUsers(filters);
  
  const handleFilterChange = useCallback((newFilters: UserFilters) => {
    setFilters(newFilters);
  }, []);
  
  const handleUserSelect = useCallback((user: User) => {
    // lógica de seleção
  }, []);
  
  return {
    users,
    filters,
    loading,
    handleFilterChange,
    handleUserSelect,
  };
};
```

---

## Componentes Compartilhados

Componentes devem ter **isolamento total** e serem **reutilizáveis**.

### Diretrizes para Shared Components

```tsx
// ✅ Componente isolado e reutilizável
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={clsx(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        { 'btn--disabled': disabled }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

---

## Shared Components

### Componentes Disponíveis

| Componente | Descrição |
|------------|-----------|
| **LinkModal** | Modal com validação de URL usando react-hook-form + zod |
| **AutoComplete** | Campo de autocomplete com debounce e cache |
| **RichEditor** | Editor rico baseado em Draft.js ou TinyMCE |
| **Chart** | Wrapper para Highcharts com tipagem forte |
| **DevicePreview** | Preview responsivo (mobile/desktop) |
| **IconLibrary** | Biblioteca de ícones SVG com tree-shaking |

### Exemplo: LinkModal

```tsx
// src/components/shared/LinkModal.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const linkSchema = z.object({
  url: z.string().url('URL inválida'),
  title: z.string().min(1, 'Título é obrigatório'),
});

type LinkFormData = z.infer<typeof linkSchema>;

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LinkFormData) => void;
}

export const LinkModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('url')}
            placeholder="URL"
            type="url"
          />
          {errors.url && <span>{errors.url.message}</span>}
          
          <input
            {...register('title')}
            placeholder="Título"
          />
          {errors.title && <span>{errors.title.message}</span>}
          
          <button type="submit">Adicionar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};
```

---

## Custom Hooks

Substituem os **Decorators** do Angular, implementando lógica reutilizável.

### Hooks Utilitários

| Hook | Funcionalidade |
|------|----------------|
| **useAsyncOperation** | Previne múltiplas execuções simultâneas (substitui @block-until-complete) |
| **useSharedExecution** | Compartilha resultado de operações em andamento (substitui @share-execution) |
| **useCache** | Cache com invalidação automática (substitui @share-replay) |

### Implementações

```tsx
// src/hooks/use-async-operation.ts
export const useAsyncOperation = <T extends (...args: any[]) => Promise<any>>(
  fn: T
): [T, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  
  const wrappedFn = useCallback(async (...args: Parameters<T>) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      return await fn(...args);
    } finally {
      setIsLoading(false);
    }
  }, [fn, isLoading]) as T;
  
  return [wrappedFn, isLoading];
};

// src/hooks/use-shared-execution.ts
const executionMap = new Map<string, Promise<any>>();

export const useSharedExecution = <T>(
  key: string,
  fn: () => Promise<T>
): [() => Promise<T>, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  
  const execute = useCallback(async () => {
    if (executionMap.has(key)) {
      return executionMap.get(key);
    }
    
    setIsLoading(true);
    const promise = fn().finally(() => {
      executionMap.delete(key);
      setIsLoading(false);
    });
    
    executionMap.set(key, promise);
    return promise;
  }, [key, fn]);
  
  return [execute, isLoading];
};

// src/hooks/use-cache.ts
export const useCache = <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 minutos
) => {
  return useQuery({
    queryKey: [key],
    queryFn: fetcher,
    staleTime: ttl,
    gcTime: ttl * 2,
  });
};
```

---

## Utils & Helpers

Substituem os **Pipes** do Angular.

### Formatadores Disponíveis

| Utilitário | Descrição |
|------------|-----------|
| **formatCPF** | Formata CPF (123.456.789-00) |
| **formatDate** | Formata datas com internacionalização |
| **formatCurrency** | Formata valores monetários |

### Implementações

```tsx
// src/utils/formatters.ts
export const formatCPF = (cpf: string): string => {
  const cleaned = cpf.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
  
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
  
  return cpf;
};

export const formatCurrency = (
  value: number,
  currency: string = 'BRL'
): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
};

// src/utils/date-formatters.ts
import { format, parseISO } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

export const formatDate = (
  date: string | Date,
  pattern: string = 'dd/MM/yyyy',
  locale: 'pt-BR' | 'en-US' = 'pt-BR'
): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const localeObj = locale === 'pt-BR' ? ptBR : enUS;
  
  return format(dateObj, pattern, { locale: localeObj });
};
```

---

## Resumo das Boas Práticas

### ✅ Fazer

#### Tipagem e Código
- Usar TypeScript com tipagem forte e evitar `any`
- Implementar custom hooks para lógica reutilizável
- Usar inferência de tipos ao invés de `React.FC`
- Preferir `unknown` quando o tipo for desconhecido

#### Estado e Dados
- Usar Zustand para estado global simples
- Usar React Query para server state e cache
- Usar `useActionState` para formulários com servidor
- Usar `useOptimistic` para updates otimistas
- Sempre fazer cleanup de effects

#### Performance
- Lazy loading de rotas e componentes pesados
- Code splitting estratégico
- Usar `React.memo` apenas quando medir necessidade
- Preload de recursos em hover/interaction

#### Qualidade e Manutenibilidade
- Implementar Error Boundaries
- Criar adapter patterns para bibliotecas externas
- Testes unitários com Vitest/Testing Library
- Documentar componentes complexos

#### Acessibilidade e SEO
- Sempre implementar ARIA labels apropriados
- Gerenciar foco em modais e navegação
- Suporte completo a teclado
- Meta tags e structured data para SEO
- Usar tags semânticas HTML

#### Formulários
- Usar Zod + React Hook Form para validação
- Usar `useFormStatus` para status em componentes filhos
- Implementar mensagens de erro claras e acessíveis

### ❌ Não Fazer

#### Tipagem
- Usar `any` sem necessidade crítica comprovada
- Usar `React.FC` (descontinuado no React 19)
- Ignorar erros do TypeScript

#### Estado
- Fazer mutações diretas no estado
- Props drilling excessivo (usar Context/Zustand)
- Usar `useEffect` para sincronização derivável
- Duplicar server state no estado local

#### Componentes
- Criar componentes compartilhados com lógica de negócio
- Renderização com métodos complexos
- Ignorar cleanup de effects
- Componentes com múltiplas responsabilidades

#### Performance
- Usar `React.memo`/`useMemo` prematuramente
- Importar bibliotecas inteiras sem tree-shaking
- Carregar todos os componentes eager

#### Acessibilidade
- Divs clicáveis sem role="button" e handlers de teclado
- Ignorar labels em inputs
- Remover outline de focus sem substituto
- Usar cores como único indicador

#### Segurança
- Usar `dangerouslySetInnerHTML` sem sanitização
- Expor tokens/secrets no código cliente
- Confiar em validação apenas no cliente

---

## Testes (!)

### Configuração Recomendada

```json
// package.json
{
  "devDependencies": {
    "vitest": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@vitest/ui": "^2.0.0",
    "jsdom": "^25.0.0"
  }
}
```

### Testes de Componentes

```tsx
// src/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza com children', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });
  
  it('chama onClick quando clicado', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    
    await userEvent.click(screen.getByText('Clique'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('está desabilitado quando disabled=true', () => {
    render(<Button disabled>Clique</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Testes de Hooks

```tsx
// src/hooks/use-counter.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from './use-counter';

describe('useCounter', () => {
  it('inicia com valor 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  it('incrementa o contador', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

### Testes com React Query

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useUsers } from './use-users';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useUsers', () => {
  it('carrega usuários com sucesso', async () => {
    const mockUsers = [{ id: 1, name: 'João' }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    ) as any;
    
    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockUsers);
  });
});
```

### Testes de Integração

```tsx
// src/features/auth/LoginForm.integration.test.tsx
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from './LoginForm';
import { BrowserRouter } from 'react-router-dom';

describe('LoginForm Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('realiza login com sucesso', async () => {
    const mockLogin = vi.fn(() => Promise.resolve({ token: 'abc123' }));
    
    render(
      <BrowserRouter>
        <LoginForm onLogin={mockLogin} />
      </BrowserRouter>
    );
    
    await userEvent.type(screen.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(screen.getByLabelText('Senha'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  });
  
  it('mostra erros de validação', async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
  });
});
```

### Cobertura de Testes

```bash
# Executar testes com cobertura
npm run test:coverage

# Meta de cobertura recomendada:
# - Statements: > 80%
# - Branches: > 75%
# - Functions: > 80%
# - Lines: > 80%
```

---

## Estrutura de Arquivos Recomendada

```
src/
├── components/
│   ├── ui/                    # Componentes base (Button, Input, Card, Badge, etc)
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Input.tsx
│   │   └── index.ts           # Barrel export
│   ├── shared/                # Componentes compartilhados complexos
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── index.ts
│   └── seo/                   # Componentes de SEO
│       ├── SEO.tsx
│       └── index.ts
├── features/                  # Features organizadas por domínio
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   ├── pages/
│   │   │   └── LoginPage.tsx
│   │   ├── schemas/
│   │   │   └── auth.schemas.ts
│   │   └── index.ts
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── index.ts
│   └── cart/
│       ├── components/
│       ├── hooks/
│       └── pages/
├── hooks/                     # Custom hooks globais
│   ├── use-auth.ts
│   ├── use-cart.ts
│   ├── use-toast.ts
│   └── index.ts
├── stores/                    # Zustand stores
│   ├── auth-store.ts
│   ├── auth-store.test.ts
│   ├── cart-store.ts
│   └── index.ts
├── api/                       # API functions
│   ├── auth-api.ts
│   ├── product-api.ts
│   └── index.ts
├── lib/                       # Configurações de bibliotecas
│   ├── api-client.ts          # Fetch wrapper
│   ├── react-query.ts         # Query client config
│   └── utils.ts               # cn() helper, etc
├── utils/                     # Funções utilitárias
│   ├── formatters.ts
│   ├── validators.ts
│   ├── currency.ts
│   ├── currency.test.ts
│   └── index.ts
├── types/                     # Tipos TypeScript globais
│   ├── api.types.ts
│   ├── user.types.ts
│   ├── product.types.ts
│   └── index.ts
├── constants/                 # Constantes e enums
│   ├── routes.ts
│   ├── endpoints.ts
│   └── index.ts
├── styles/                    # Estilos globais
│   ├── globals.css
│   └── theme.ts
├── routes/                    # Configuração de rotas
│   └── index.tsx
├── test/                      # Configuração de testes
│   ├── setup.ts
│   └── utils.tsx              # Test helpers
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

### Convenções de Nomenclatura de Arquivos

- **Componentes**: `PascalCase.tsx` (ex: `UserProfile.tsx`)
- **Hooks**: `use-kebab-case.ts` (ex: `use-user-data.ts`)
- **Utils**: `kebab-case.ts` (ex: `date-formatters.ts`)
- **Types**: `kebab-case.types.ts` (ex: `user.types.ts`)
- **Stores**: `kebab-case-store.ts` (ex: `auth-store.ts`)
- **Testes**: `*.test.tsx` ou `*.test.ts` (ao lado do arquivo testado)
- **CSS Modules**: `*.module.css` (ex: `Button.module.css`)
- **Barrel exports**: `index.ts` em cada pasta

### Organização por Feature

Cada feature deve ser auto-contida:

```
features/products/
├── components/           # Componentes específicos da feature
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── ProductFilters.tsx
├── hooks/               # Hooks específicos
│   ├── use-products.ts
│   └── use-product-filters.ts
├── pages/               # Páginas da feature
│   ├── ProductListPage.tsx
│   └── ProductDetailPage.tsx
├── schemas/             # Schemas de validação
│   └── product.schemas.ts
├── types/               # Tipos específicos (se não forem globais)
│   └── product.types.ts
└── index.ts             # Exports públicos da feature
```

---

*Documento de boas práticas React - Versão 1.0*