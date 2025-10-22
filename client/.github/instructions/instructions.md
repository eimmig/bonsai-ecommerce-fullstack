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

### Core Dependencies
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "^5.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0"
}
```

### State Management
```json
{
  "zustand": "^4.4.0",
  "@tanstack/react-query": "^5.0.0"
}
```

### Forms & Validation
```json
{
  "react-hook-form": "^7.45.0",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0"
}
```

### Routing & HTTP
```json
{
  "react-router-dom": "^6.15.0",
  "axios": "^1.5.0"
}
```

### Styling
```json
{
  "styled-components": "^6.0.0",
  "@types/styled-components": "^5.1.0",
  "tailwindcss": "^3.3.0"
}
```

### Utilities
```json
{
  "date-fns": "^2.30.0",
  "clsx": "^2.0.0",
  "react-error-boundary": "^4.0.0"
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

### Convenções de Nomenclatura

#### Componentes React

Componentes devem usar **PascalCase** e sempre ser nomeados com substantivos:

```tsx
// ❌ Não fazer
const userProfile = () => { };
const User_Profile = () => { };

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
const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
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

Use `React.memo` para componentes que renderizam frequentemente sem mudanças nas props:

```tsx
// ✅ Para componentes puros/dummy
const UserCard = React.memo<UserCardProps>(({ user }) => {
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

### Custom Hooks para Lógica de Formulários (!)

Use React Hook Form com Zod para validação:

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

### Usar CSS-in-JS ou CSS Modules

Preferir Styled Components ou CSS Modules para isolamento:

```tsx
// styled-components
import styled from 'styled-components';

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: ${props => 
    props.variant === 'primary' ? '#007bff' : '#6c757d'
  };
  color: white;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

// CSS Modules
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary' }) => (
  <button className={clsx(styles.button, styles[variant])}>
    {children}
  </button>
);
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
    isLoading,
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
import { ApiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';
import {
  GetEmployeeInfoRequest,
  GetEmployeeInfoResponse,
  Employee,
} from '@/types/employee.types';

export const employeeApi = {
  getById: async (id: string): Promise<Employee> => {
    const response = await ApiClient.get<Employee>(`${ENDPOINTS.EMPLOYEES}/${id}`);
    return response.data;
  },
  
  getInfo: async (request: GetEmployeeInfoRequest): Promise<GetEmployeeInfoResponse> => {
    const response = await ApiClient.post<GetEmployeeInfoResponse>(
      `${ENDPOINTS.QUERIES}/${ENDPOINTS.GET_EMPLOYEE_INFO}`,
      request
    );
    return response.data;
  },
  
  update: async (employee: Partial<Employee>): Promise<Employee> => {
    const response = await ApiClient.put<Employee>(
      `${ENDPOINTS.EMPLOYEES}/${employee.id}`,
      employee
    );
    return response.data;
  },
};
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

export const UserManagement: React.FC = () => {
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

export const Button: React.FC<ButtonProps> = ({
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

export const LinkModal: React.FC<LinkModalProps> = ({
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
- Usar TypeScript com tipagem forte
- Implementar custom hooks para lógica reutilizável
- Usar Zustand para estado global simples
- Usar React Query para server state
- Implementar Error Boundaries
- Usar React.memo para componentes puros
- Sempre fazer cleanup de effects
- Usar lazy loading para rotas
- Criar adapter patterns para bibliotecas externas
- Usar Zod + React Hook Form para formulários

### ❌ Não Fazer
- Usar `any` sem necessidade real
- Fazer mutações diretas no estado
- Criar componentes compartilhados com lógica de negócio
- Props drilling excessivo
- Renderização com métodos complexos
- Ignorar cleanup de effects
- Usar `useEffect` para sincronização que pode ser derivada

---

## Estrutura de Arquivos Recomendada

```
src/
├── components/
│   ├── ui/                    # Componentes base (Button, Input, etc)
│   └── shared/                # Componentes compartilhados complexos
├── features/
│   └── [feature-name]/
│       ├── components/
│       ├── hooks/
│       └── types/
├── hooks/                     # Custom hooks globais
├── stores/                    # Zustand stores
├── api/                       # API functions
├── utils/                     # Funções utilitárias
├── types/                     # Tipos TypeScript globais
├── constants/                 # Constantes e enums
├── lib/                       # Configurações de bibliotecas
└── pages/                     # Componentes de página/rota
```

---

*Documento de boas práticas React - Versão 1.0*