# Instruções de Desenvolvimento - Boas Práticas

## Introdução

Esse guia tem como objetivo definir os padrões e convenções utilizadas no time de Onboarding para desenvolvimento front-end. São definições criadas para consistência do projeto e garantia de qualidade. Sugestões são sempre bem vindas! :)

Além das sugestões, sempre ter em mente essas recomendações principais:

- **Simplicidade**: buscar soluções simples, não trazendo overengineering desnecessário. Complexidade nem sempre é necessário
- **Divisão de responsabilidade**: procurar sempre quebrar as responsabilidades, onde cada elemento (podendo ser um componente, serviço, etc) tenha uma única função, sem agrupar diferentes funções

## Índice
- [Introdução](#introdução)
- [Guia de Estilo de Código](#guia-de-estilo-de-código)
- [Guia de Boas Práticas](#guia-de-boas-práticas)
- [Entidades/Entities](#entidadesentities)
- [Features](#features)
- [Componentes Compartilhados](#componentes-compartilhados)
- [Shared Components](#shared-components)
- [Decorators](#decorators)
- [Pipes](#pipes)

---

## Guia de Estilo de Código

Nessa seção estão definidas as convenções de estilização do código. Essas padronizações e convenções foram baseadas no guia de estilo definido pelo próprio time do Angular, onde são especificadas as regras recomendadas: https://angular.dev/style-guide

### Convenções de Nomenclatura

#### Modificadores Públicos

Mesmo definindo uma propriedade ou método como público, sempre utilizar o modificador `public`:

```typescript
// ❌ Não fazer
readonly isReady = false;

getAllUsers(): Users[] {}

// ✅ Fazer
public readonly isReady = false;

public getAllUsers(): Users[] {}
```

#### Modificadores Privados

Modificadores de acesso privados **não devem** ter `_` (underline) antes do nome. O modificador `private` já indica sua visibilidade:

```typescript
// ❌ Não fazer
private readonly _isReady: boolean = false;

// ✅ Fazer
private readonly isReady: boolean = false;
```

#### Interfaces

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
```

#### Nomenclatura de Arquivos

Os arquivos do projeto (componentes, diretivas, pipes, etc) sempre devem utilizar o padrão **kebab-case**, juntamente com o seu tipo:

- `user-profile.component.ts`
- `email-validator.directive.ts`
- `currency-formatter.pipe.ts`

### Convenções de Ordem

#### Ordem das Propriedades

As propriedades devem respeitar a seguinte ordem: **públicas → protegidas → privadas**

```typescript
// ❌ Não fazer
private readonly isReady: boolean = false;
public readonly isDone: boolean = true;
protected readonly isFinished: boolean = true;

// ✅ Fazer
public readonly isDone: boolean = false;
protected readonly isFinished: boolean = false;
private readonly isReady: boolean = true;
```

#### Ordem dos Métodos do Ciclo de Vida

Os métodos relacionados ao ciclo de vida do componente (`ngOnInit`, `ngOnDestroy`, etc) devem seguir a ordem em que são executados, conforme definição do Angular:

1. `ngOnChanges`
2. `ngOnInit`
3. `ngDoCheck`
4. `ngAfterContentInit`
5. `ngAfterContentChecked`
6. `ngAfterViewInit`
7. `ngAfterViewChecked`
8. `ngOnDestroy`

---

## Guia de Boas Práticas

Aqui estão contidas algumas definições de boas práticas de desenvolvimento, visando sempre a qualidade do código e do projeto. São recomendações que devem ser levadas em conta na hora de desenvolver. Algumas estão marcadas com "!" por serem obrigatórias para garantir, além de qualidade, outros pontos como performance.

### Tratamento de Observables (!)

A inscrição de observables deve sempre estar configurada para ser finalizada, usando diversas técnicas disponíveis. **Esta regra é obrigatória**, pois observables sem desinscrição podem causar estouro de memória.

```typescript
private ngUnsubscribe: Subject<void> = new Subject<void>();

public testMethod(): void {
    this.service.getAllUsers()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({})
}

ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}
```

Observables relacionados a requests (chamadas para o servidor, APIs, etc) devem ter uma configuração para não ficarem esperando resposta. O Angular fornece operadores como `first()` e `take(1)`:

```typescript
public getFirstUser() {
    this.http.get('https://api.example.com/users')
      .pipe(first())
      .subscribe({
        next: (data) => console.log(data),
        error: (err) => console.error(err),
      });
}
```

### Uso de any (!)

A utilização de `any` não é uma boa prática recomendada. Quando não se há conhecimento do tipo de dado, deve ser utilizado o tipo `unknown`:

```typescript
// ❌ Não fazer
private readonly unknowData: any;

// ✅ Fazer
private readonly unknowData: unknown;
```

### Não modificar o ViewEncapsulation dos componentes (!)

**NÃO** remover o encapsulamento colocando como `None`:

```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  encapsulation: ViewEncapsulation.None // ❌ Deve ser evitado
})
export class ExampleComponent {}
```

### Usar renderização de rotas lazyLoading (!)

Sempre renderizar rotas na forma `lazyLoading` usando o método `loadChildren`:

```typescript
export const routes: Routes = [
    {
        path: 'agent',
        loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule),
    },
];
```

### Uso de formControlValueAcessor (!)

Sempre que necessário controlar um componente relacionado a formulário, é preferível implementar o componente como um `formControlValueAcessor`.

**Referência**: [Form Controls customizados no Angular](https://andrewrosario.medium.com/form-controls-customizados-no-angular-com-controlvalueaccessor-367e773e3fec)

### Utilizar changeDetectionStrategy.onPush

Para componentes que não precisam mudar após criação, usar `OnPush` melhora performance:

```typescript
@Component({
    templateUrl: './main.component.html',
    styleUrls: [],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
    public dependencies = environment.project.serviceDependencies;
}
```

### Criar DTOs para todo tráfego de dados

Sempre criar DTOs separados para request e response:

```typescript
export interface GetUserResponseDTO {
    id: string;
    name: string;
}

export interface GetUserRequestDTO {
    id: string;
}

export interface User {
    id: string;
    name: string;
}
```

### Tratamento de datas

#### Convertendo de String para Date

Utilizar o método `createDateFromString` da classe `DateUtils` para evitar problemas de fuso horário.

#### Recebendo datas do backend da forma correta

Definir campos de data como `string` no DTO response e converter usando `DateUtils`:

```typescript
// DTO Response
export interface UserResponseDTO {
    id: string;
    name: string;
    birthDate: string; // String no DTO
}

// Model para negócio
export interface User {
    id: string;
    name: string;
    birthDate: Date; // Date no model
}
```

### Usar variáveis de estilo definidas no projeto

Sempre utilizar variáveis CSS já definidas para cores, tipografia, tamanhos, etc. Isso garante consistência e centralização.

### Evitar uso excessivo do módulo shared

O módulo shared deve receber elementos apenas quando forem usados uma segunda vez e sejam realmente reutilizáveis.

### Mapeamento em entidades

Os arquivos de entidade não devem realizar o mapeamento das suas entidades aninhadas diretamente:

```typescript
export class User {
    id: string;
    name: string;
    address: Address;
    
    fromDto(userDTO: any): void {
        this.id = userDTO.id;
        this.name = userDTO.name;
        this.address = Address.fromDTO(userDTO.address); // ✅ Chama o mapeamento da entidade Address
    }
}
```

### Renderização utilizando métodos (!)

Evitar uso de métodos complexos no template. Atribuir o resultado a uma variável:

```typescript
// ❌ Não fazer
@Component({
    template: `<div *ngIf="isArrayNotEmpty()"></div>`
})
export class ExampleComponent {
    public items: any[] = [1, 2, 3];

    public isArrayNotEmpty(): boolean {
        return this.items.length > 0;
    }
}

// ✅ Fazer
@Component({
    template: `<div *ngIf="hasItems"></div>`
})
export class ExampleComponent {
    public items: any[] = [1, 2, 3];
    public hasItems: boolean = this.items.length > 0;
}
```

### Usar ENUMs sempre que possível

Dar preferência a criar ENUMs para centralizar strings:

```typescript
// ❌ Não fazer
const routes: Routes = [
    { path: 'main', component: MainComponent },
];

// ✅ Fazer
export enum RouteEnum {
    MAIN = 'main'
}

const routes: Routes = [
    { path: RouteEnum.MAIN, component: MainComponent },
];
```

### Utilizar serviço de intermédio entre bibliotecas externas

Sempre estabelecer uma camada entre a biblioteca e a aplicação:

```typescript
// src/app/services/external-lib-adapter.service.ts
import { Injectable } from '@angular/core';
import ExternalLib from 'external-lib';

@Injectable({
  providedIn: 'root'
})
export class ExternalLibAdapterService {
  public adaptedMethod(param: string): string {
    return ExternalLib.someMethod(param);
  }
}

// src/app/app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private externalLibAdapter: ExternalLibAdapterService) {}

  ngOnInit() {
    const result = this.externalLibAdapter.adaptedMethod('example');
  }
}
```

---

## Entidades/Entities

As entidades têm a responsabilidade de garantir aos componentes do projeto a estrutura correta dos dados, evitando quebras por NPE (Null Pointer Exception) e evitando assimetria das informações apresentadas.

É nesta camada que faremos as requisições às primitivas, modelagem dos dados através de DTOs e compartilhamento de informações entre features distintas.

### entity.service.ts

O `entity.service.ts` é o serviço de acesso às informações. Nele serão adicionadas as chamadas ao serviço de primitiva, serviço de estado e outros serviços. Sua principal responsabilidade é servir de comunicação entre os dados processados e os componentes do projeto.

**Estrutura padrão:**

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { first, map, switchMap } from "rxjs/operators";
import { EmployeeRequisitionService } from "./employee-requisition.service";
import { GetEmployeeInfo } from "../dtos/get-employee-info";
import { EmployeeStoreService } from "../store/employee-store.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends EmployeeRequisitionService {
    constructor(readonly httpClient: HttpClient,
        private readonly employeeStore: EmployeeStoreService
    ) {
        super(httpClient);
    }

    get store(): EmployeeStoreService {
        return this.employeeStore;
    }

    public getEmployeeInfo(payload: GetEmployeeInfoPayload): Observable<GetEmployeeInfo> {
        return of(payload)
            .pipe(
                map(GetEmployeeInfo.toDto),
                switchMap((data) => this.getEmployeeInfoRequisition(data)),
                map(GetEmployeeInfo.fromDto)
            );
    }
}
```

**Responsabilidades:**
- ❌ **NÃO** fazer chamadas diretas às primitivas do backend
- ✅ Utilizar o `entity-requisition.service.ts` para chamadas HTTP
- ✅ Garantir que todas as tratativas de dados ficam localizadas no `entity.service.ts`
- ✅ Processar todos os dados enviados/recebidos através de DTOs (exceto tipos primitivos devidamente tipados)

### entity-requisition.service.ts

Serviço responsável por realizar as requisições ao backend. Deve ser simples e sem regras complexas, sendo responsável apenas por receber os dados tratados e utilizar o serviço de `HttpClient` do Angular.

**Estrutura padrão:**

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { PrefixRequisition } from "../../../enums/prefix-requisitions/prefix-requisition.enum";
import { EmployeePrimitives } from "../primitives/employee-primitives.enum";
import { GetEmployeeInfoResponse } from "../primitives/get-employee-info-primitive.interface";

@Injectable()
export class EmployeeRequisitionService {
    constructor(private readonly http: HttpClient) { }

    public getEmployeeInfoRequisition(): Observable<GetEmployeeInfoResponse> {
        const url = `${PrefixRequisition.QUERIES}/${EmployeePrimitives.GET_EMPLOYEE_INFO}`;
        return this.http.post<GetEmployeeInfoResponse>(url, {});
    }
}
```

### entity-store.service.ts

Responsável por armazenar informações das entidades para reutilização em todo o projeto.

**Características obrigatórias:**
- ✅ Sempre conter `providedIn: 'root'`
- ✅ Não possuir constructor

**Estrutura padrão:**

```typescript
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Employee } from '../dtos/employee/employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeStoreService {
    readonly employee$: BehaviorSubject<Employee> = new BehaviorSubject(new Employee());
    
    setEmployeeName(employeeName: string) {
        const employee = this.employee$.value;
        employee.employeeName = employeeName;

        this.employee$.next(employee);
    }

    getEmployeeName(): string {
        return this.employee$.value.employeeName;
    }
}
```

---

## Features

As features são componentes específicos que atuam diretamente com uma regra de negócio individual. Seu compartilhamento é improvável, o que os torna componentes únicos.

**Princípios:**
- ✅ Manter a ideia de **Atomic Design**
- ✅ Criar componentes menores que possam ser reutilizados
- ✅ Evitar entrelaçamento entre componentes durante manutenções
- ✅ Cada feature deve ter responsabilidade única e bem definida

---

## Componentes Compartilhados

Componentes compartilhados devem ter **isolamento total** do restante da aplicação.

**⚠️ ATENÇÃO:** Caso um componente compartilhado possua regra de negócio compartilhada, o mesmo se torna acoplado e permite compartilhar erros entre features diferentes.

**Diretrizes:**
- ✅ Manter componentes sem regras de negócio específicas
- ✅ Garantir isolamento total
- ✅ Evitar acoplamento entre features
- ❌ **NÃO** incluir lógica de negócio específica

---

## Shared Components

Os componentes criados no projeto foram desenvolvidos visando a reutilização em quaisquer outros projetos.

### Componentes Disponíveis

| Componente | Descrição |
|------------|-----------|
| **add-link** | Modal com campo de texto que valida se o texto é um link. Emite evento via `dynamicDialogRef` retornando a interface `LinkConfiguration` |
| **automatic-fields** | Permite adicionar textos da interface `AutomaticFieldFolder` e ao clicar em um valor, adiciona ao p-editor. Altura configurável igual ao p-editor |
| **editor** | Componente modularizado do p-editor com campos customizados, incluindo campo estilizado para inclusão de vídeos |
| **highcharts** | Renderiza gráficos usando a lib highcharts com tipagem forte (oposto à lib highcharts v9) |
| **html-preview** | Renderiza duas views (mobile e desktop) a partir de HTML recebido |
| **icons** | Agrupa ícones personalizados do projeto, facilitando exportação e reutilização |

---

## Decorators

Implementações criadas para evitar código repetitivo e melhorar usabilidade, inspirados nas annotations do Java.

### Decorators Disponíveis

| Decorator | Funcionalidade |
|-----------|----------------|
| **@block-until-complete** | Garante que uma requisição não possa ser chamada novamente até a requisição anterior ser finalizada |
| **@share-execution** | Permite entrar em uma instância da requisição em andamento. Quando finalizada, todas as chamadas compartilham o resultado |
| **@share-replay** | Armazena em cache os dados retornados, garantindo que novas chamadas recebem dados recuperados anteriormente |

---

## Pipes

Pipes criados para garantir implementação de DOM mais limpa, sem muitas regras e com reutilização clara.

### Pipes Disponíveis

| Pipe | Descrição |
|------|-----------|
| **cpf** | Formata o CPF |
| **date - internationalizeDate** | Formata a data considerando o padrão americano |

---

## Resumo das Boas Práticas

### ✅ Fazer
- Usar DTOs para modelagem de dados
- Manter isolamento entre componentes
- Seguir o padrão de Atomic Design
- Usar decorators para evitar código repetitivo
- Manter stores com `providedIn: 'root'` e sem constructor
- Separar responsabilidades: service, requisition-service e store-service

### ❌ Não Fazer
- Fazer chamadas diretas às primitivas no entity.service.ts
- Criar componentes compartilhados com regras de negócio específicas
- Acoplar features diferentes
- Repetir código que pode ser abstraído em decorators
- Misturar responsabilidades entre as camadas

---

## Estrutura de Arquivos Recomendada

```
src/
├── entities/
│   ├── [entity-name]/
│   │   ├── dtos/
│   │   ├── services/
│   │   │   ├── [entity-name].service.ts
│   │   │   └── [entity-name]-requisition.service.ts
│   │   └── store/
│   │       └── [entity-name]-store.service.ts
├── features/
│   └── [feature-name]/
├── shared/
│   ├── components/
│   ├── decorators/
│   └── pipes/
└── ...
```

---

*Documento de boas práticas - Versão 1.0*