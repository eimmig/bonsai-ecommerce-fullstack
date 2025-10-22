# 🌱 Bonsai E-commerce - React + TypeScript

E-commerce moderno especializado em bonsais, migrado de HTML/CSS/JavaScript vanilla para React + TypeScript com integração completa ao backend.

## 📋 Sobre o Projeto

O Bonsai E-commerce é uma plataforma completa para venda de bonsais online, oferecendo:

- 🛍️ Catálogo completo de produtos com filtros e busca
- 🔐 Sistema de autenticação e autorização
- 🛒 Carrinho de compras persistente
- 💳 Processo de checkout com múltiplas formas de pagamento
- 📦 Gestão de pedidos
- 👤 Perfil de usuário e endereços
- 🌍 Suporte a internacionalização (PT/EN)
- ♿ Acessibilidade (WCAG AA)
- 📱 Design responsivo

## 🚀 Stack Tecnológica

### Core
- **React 19.1.1** - Biblioteca UI
- **TypeScript 5.9.3** - Superset JavaScript tipado
- **Vite 7.1.14** - Build tool ultrarrápido

### Estado e Dados
- **Zustand 5.0.8** - Estado global (auth, cart)
- **TanStack Query 5.90.5** - Server state management
- **Axios 1.12.2** - Cliente HTTP

### UI e Estilo
- **Tailwind CSS 4.1.15** - Framework CSS utility-first
- **Radix UI** - Componentes primitivos acessíveis
- **Lucide React 0.546.0** - Ícones SVG
- **Class Variance Authority** - Variantes de componentes

### Formulários e Validação
- **React Hook Form 7.65.0** - Gestão de formulários performática
- **Zod 4.1.12** - Schema validation
- **@hookform/resolvers 5.2.2** - Resolvers para React Hook Form

### Roteamento
- **React Router DOM 7.9.4** - Roteamento declarativo

### Utilitários
- **date-fns 4.1.0** - Manipulação de datas

### Testes
- **Vitest 3.2.4** - Test runner
- **Testing Library** - Testes de componentes React
- **jsdom 27.0.1** - Ambiente DOM para testes

### Dev Tools
- **ESLint 9.38.0** - Linter JavaScript/TypeScript
- **Prettier 3.6.2** - Formatador de código
- **rollup-plugin-visualizer 6.0.5** - Análise de bundle

## 📁 Estrutura do Projeto

```
src/
├── api/                    # Funções de requisição HTTP
├── assets/                 # Imagens, ícones
├── components/
│   ├── ui/                 # Componentes base reutilizáveis
│   └── shared/             # Componentes compartilhados complexos
├── constants/              # Constantes (routes, endpoints)
├── features/               # Features organizadas por domínio
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── products/
│   └── home/
├── hooks/                  # Custom hooks globais
├── lib/                    # Configurações (api-client, react-query)
├── pages/                  # Componentes de página/rota
├── stores/                 # Zustand stores
├── styles/                 # Estilos globais
├── types/                  # Tipos TypeScript globais
├── utils/                  # Funções utilitárias
└── translations/           # Arquivos de i18n
```

## 🎨 Paleta de Cores

As cores do projeto original foram preservadas:

- **Primary**: `#006d3b` (verde escuro)
- **Title/Button**: `#4D933E` (verde médio)
- **Button Hover**: `#44593A` (verde oliva)
- **Success**: `#4CAF50`
- **Error**: `#dc3545`
- **Discount**: `#e74c3c`

Ver configuração completa em `tailwind.config.js`.

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🌍 Variáveis de Ambiente

Criar arquivo `.env` na raiz:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_DEFAULT_LANGUAGE=pt
```

## 🔐 Rotas e Autenticação

### Rotas Públicas (sem login necessário):
- `/` - Home
- `/products` - Listagem de produtos
- `/products/:id` - Detalhes de produto
- `/login` - Login/Cadastro
- `/about` - Sobre

### Rotas Protegidas (requerem autenticação):
- `/cart` - Carrinho
- `/checkout` - Checkout
- `/orders` - Histórico de pedidos
- `/profile` - Perfil do usuário

## 📝 Convenções de Código

Seguindo o guia `.github/instructions/instructions.md`:

- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase com prefixo "use" (`use-user-data.ts`)
- **Utils**: kebab-case (`date-utils.ts`)
- **Types**: kebab-case com sufixo `.types.ts` (`user.types.ts`)
- **Interfaces**: Sem prefixo "I" (`interface User {}`)

### Ordem de Importações:
1. React imports
2. Third-party libraries
3. Internal imports (absolute paths com `@/`)
4. Relative imports

### Ordem dentro do Componente:
1. State hooks
2. Store hooks
3. Custom hooks
4. Effect hooks
5. Event handlers
6. Render helpers
7. Return JSX

## 🧪 Testes

```bash
# Rodar todos os testes
npm test

# Rodar testes em modo watch
npm test -- --watch

# Rodar testes com UI
npm run test:ui

# Gerar relatório de cobertura
npm run test:coverage
```

### Cobertura Atual
- ✅ 34 testes passando
- ✅ Utils: currency, discount, input-masks (21 testes)
- ✅ Stores: auth-store, cart-store (7 testes)
- ✅ Components: Button (6 testes)

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento (porta 5173)

# Build
npm run build        # Compila TypeScript e cria build de produção
npm run preview      # Preview do build de produção

# Testes
npm test             # Roda testes uma vez
npm run test:ui      # Abre UI do Vitest
npm run test:coverage # Gera relatório de cobertura

# Linting
npm run lint         # Executa ESLint
```

## 🏗️ Arquitetura e Padrões

### Entity Pattern (Design Pattern)
O projeto utiliza o **Entity Pattern** para organização de features:

```typescript
features/
  └── products/
      ├── api/              # API calls
      ├── components/       # Componentes específicos
      ├── hooks/           # Custom hooks
      ├── pages/           # Páginas da feature
      ├── types/           # Tipos TypeScript
      └── index.ts         # Barrel export
```

### State Management
- **Zustand** para estado global (auth, cart)
- **React Query** para estado do servidor (produtos, pedidos)
- **React Hook Form** para estado de formulários

### Error Handling
- Interceptors de API para tratamento centralizado
- Error boundaries para erros de renderização
- Toasts para feedback ao usuário
- Retry automático em falhas de rede

### Performance
- ✅ Code splitting com React.lazy()
- ✅ Memoização com React.memo, useMemo, useCallback
- ✅ Lazy loading de imagens
- ✅ Stale time configurado no React Query
- ✅ Bundle analyzer para otimização

## 🚧 Status do Projeto

### ✅ Concluído:
- [x] **Fase 1-2**: Setup e Infraestrutura
- [x] **Fase 3-4**: Tipos e Utilitários
- [x] **Fase 5-7**: Stores, APIs e Hooks
- [x] **Fase 8-9**: Componentes UI e Layout
- [x] **Fase 10-15**: Features (Auth, Products, Cart, Checkout, Home, About)
- [x] **Fase 16**: Internacionalização
- [x] **Fase 17**: Routing com lazy loading
- [x] **Fase 18**: Estilos (Tailwind CSS)
- [x] **Fase 19**: Testes (34 testes passando)
- [x] **Fase 20**: Performance (code splitting, memoização)
- [x] **Fase 21**: Integração Backend (APIs reais, error handling, retry logic)

### 🔄 Em Andamento:
- [ ] **Fase 22**: Acessibilidade
- [ ] **Fase 23**: SEO
- [x] **Fase 24**: Documentação
- [ ] **Fase 25**: Deploy
- [ ] **Fase 26**: Validação Final
- [ ] Componentes UI base
- [ ] Features (auth, products, cart, checkout, home, about)
- [ ] Routing e rotas protegidas
- [ ] Migração de estilos CSS
- [ ] Internacionalização (i18n)

## 📚 Próximos Passos

Ver `MIGRATION-CHECKLIST-REACT.md` para o checklist completo de migração.

## 🤝 Contribuindo

Seguir sempre as diretrizes do arquivo `.github/instructions/instructions.md`.

---

**Versão**: 0.1.0  
**Data**: Janeiro 2025
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
