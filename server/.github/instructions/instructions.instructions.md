---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# Diretrizes para Revisão de Código e Boas Práticas - Java & Spring

Este documento serve como um guia para a revisão de todo o código-fonte do projeto. O objetivo é garantir que o código seja limpo, legível, manutenível, eficiente e que siga os padrões e as melhores práticas da comunidade Java e do ecossistema Spring.

**Ação Requerida:** Revise **todas as classes** do projeto com base nas diretrizes abaixo. Refatore o código quando necessário para alinhá-lo a estes padrões.

---

## 1. Princípios Fundamentais (Clean Code & SOLID)

Antes de analisar detalhes de implementação, verifique se o design geral do código segue estes princípios:

- **S.O.L.I.D.:**
  - **S (Single Responsibility Principle):** Cada classe ou método deve ter uma, e apenas uma, razão para mudar. Evite classes "faz-tudo".
  - **O (Open/Closed Principle):** As entidades de software (classes, módulos, funções) devem ser abertas para extensão, mas fechadas para modificação.
  - **L (Liskov Substitution Principle):** Subtipos devem ser substituíveis por seus tipos base sem alterar a corretude do programa.
  - **I (Interface Segregation Principle):** Muitas interfaces específicas são melhores do que uma única interface geral.
  - **D (Dependency Inversion Principle):** Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.

- **DRY (Don't Repeat Yourself):** Evite a duplicação de código. Se um trecho de lógica se repete, extraia-o para um método reutilizável.

- **KISS (Keep It Simple, Stupid):** Prefira soluções simples e diretas. Não complique o código desnecessariamente.

- **YAGNI (You Ain't Gonna Need It):** Não implemente funcionalidades que você "acha" que vai precisar no futuro. Implemente apenas o que é necessário agora.

---

## 2. Padrões de Nomenclatura e Estrutura do Projeto

A consistência na nomenclatura é crucial para a legibilidade. Verifique se todo o projeto segue o mesmo padrão.

- **Pacotes:** Nomenclatura em minúsculas, seguindo o padrão de domínio reverso.
  - Exemplo: `br.com.suaempresa.projeto.controller`, `br.com.suaempresa.projeto.service`, `br.com.suaempresa.projeto.repository`, `br.com.suaempresa.projeto.model`, `br.com.suaempresa.projeto.dto`, `br.com.suaempresa.projeto.config`, `br.com.suaempresa.projeto.exception`.

- **Classes e Interfaces:** `UpperCamelCase`.
  - Exemplo: `ClienteService`, `ProdutoController`, `PedidoRepository`.

- **Métodos:** `lowerCamelCase`.
  - Devem ser verbos ou frases curtas que descrevam a ação.
  - Exemplo: `buscarClientePorId`, `salvarNovoProduto`.

- **Variáveis:** `lowerCamelCase`.
  - Nomes devem ser descritivos. Evite abreviações (e.g., `user` em vez de `u`).

- **Constantes:** `UPPER_SNAKE_CASE`.
  - Exemplo: `public static final int MAXIMO_TENTATIVAS = 3;`

- **DTOs (Data Transfer Objects):** Sufixo `DTO`.
  - Exemplo: `ClienteRequestDTO`, `ProdutoResponseDTO`.

- **Entidades JPA:** Sem sufixo, representando o modelo de domínio principal.
  - Exemplo: `Cliente`, `Produto`, `Pedido`.

---

## 3. Checklist para o Code Review

Use esta lista para revisar cada parte do código.

### ✅ **Geral e Lógica**
- [ ] A lógica de negócio está correta e atende aos requisitos?
- [ ] O código é fácil de entender? Um novo desenvolvedor conseguiria compreendê-lo rapidamente?
- [ ] O código compila sem `warnings`?
- [ ] Foram removidos códigos comentados, `System.out.println` e importações não utilizadas?
- - [ ] Foram removidos loggers desnecessários?

### ✅ **Tratamento de Erros e Exceções**
- [ ] **Null Safety:** O código está protegido contra `NullPointerException`? Use `Optional` ou verificações explícitas onde for necessário.
- [ ] **Exceções Específicas:** São usadas exceções personalizadas e específicas em vez de exceções genéricas como `Exception` ou `RuntimeException`? (Ex: `RecursoNaoEncontradoException`).
- [ ] **Global Exception Handler:** Existe um `@ControllerAdvice` para capturar exceções e retornar respostas de erro HTTP padronizadas?
- [ ] **Logs de Erro:** As exceções são logadas com informações úteis (stack trace, contexto) para facilitar a depuração?

### ✅ **Boas Práticas com Spring Framework**
- [ ] **Injeção de Dependência:** A injeção de dependência está sendo feita **via construtor**? (Evite `@Autowired` em campos).
- [ ] **Anotações:** As anotações do Spring (`@Service`, `@Repository`, `@RestController`) estão sendo usadas corretamente em suas respectivas camadas?
- [ ] **Camadas de Serviço:** A lógica de negócio está concentrada na camada de `Service`? O `Controller` deve ser "enxuto", apenas orquestrando as chamadas.
- [ ] **Configurações Externalizadas:** Valores como URLs de banco de dados, chaves de API e outros parâmetros estão em `application.properties` ou `application.yml`? (Não há valores "hardcoded" no código).
- [ ] **Validação:** A validação dos dados de entrada (`DTOs`) é feita usando `Bean Validation` (`@Valid`, `@NotNull`, `@Size`, etc.) na camada de `Controller`?

### ✅ **API REST**
- [ ] **Verbos HTTP:** Os verbos corretos estão sendo utilizados? (`GET` para consulta, `POST` para criação, `PUT` para atualização total, `DELETE` para remoção, `PATCH` para atualização parcial).
- [ ] **Status Codes HTTP:** Os códigos de status de retorno são apropriados? (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
- [ ] **URIs:** As URIs representam recursos e seguem o padrão REST? (e.g., `GET /clientes/{id}`).

### ✅ **Banco de Dados e Spring Data JPA**
- [ ] **Padrão DTO:** A API está expondo DTOs em vez das entidades JPA diretamente? Isso evita a exposição de dados internos e problemas de serialização.
- [ ] **Transações:** A anotação `@Transactional` está sendo usada corretamente (geralmente nos métodos da camada de `Service`)?
- [ ] **Problema N+1:** Verifique se consultas que envolvem relacionamentos (`@OneToMany`, `@ManyToMany`) não estão causando o problema de N+1 selects. Use `JOIN FETCH` ou `@EntityGraph` para otimizar.
- [ ] **Carregamento (Loading):** O tipo de carregamento (`FetchType.LAZY` ou `FetchType.EAGER`) está definido de forma consciente? `LAZY` é o padrão preferido para evitar carregar dados desnecessários.

### ✅ **Testes**
- [ ] Existem testes unitários para a lógica de negócio na camada de serviço?
- [ ] Existem testes de integração para os endpoints da API?
- [ ] A cobertura de testes é adequada para as funcionalidades críticas?

---

Antes de realizar qualquer atualização, espere a confirmação.

Ao final da revisão, o projeto deve estar consistente, robusto e alinhado com as melhores práticas de mercado, facilitando futuras manutenções e a entrada de novos desenvolvedores na equipe.