# Anotações do curso de TypeScript

- o código em TypeScript precisa ser compilado para JavaScript para ser interpretado
- as configurações de compilação do TypeScript ficam no arquivo `tsconfig.json`
- é possível utilizar modificadores de acesso como: **public**, **private** e **protected**, sendo **public** o padrão
- o tipo da variável é definido logo após seu nome, se o mesmo não for informado, será considerado implicitamente o tipo `any`, que pode representar qualquer coisa

```typescript
private minhaVariavel: any;
```

- os atributos da classe podem ser declarados de duas maneiras

```typescript
class Negociacao {

    private _data: Date;

    constructor(data: Date) {
        this._data = data;
    }

}
```

ou

```typescript
class Negociacao {

    constructor (private _data: Date) { }

}
```

- os tipos `number` e `string` são tipos literais (realizam autoboxing na utilização de métodos), enquanto `Number` e `String` são tipos objetos
- uma conversão explícita pode ser realizada através de colchetes angulares ou do operados `as`

```typescript
let _inputData = <HTMLInputElement>document.querySelector('#data');
```

ou

```typescript
// desta maneira evita problema com JSX
let _inputData = document.querySelector('#data') as HTMLInputElement;
```

- arrays podem ser declarados utilizando `Array<Classe>` ou `Classe[]`
- pode ser informado em um método qual seu tipo de retorno, semelhante ao que é feito com variáveis: `paraArray(): Negociacao[] { }`
- se `noImplicitAny` estiver habilitado, pode ser utilizada a inferência de tipos na declaração da variável: `private _negociacoes = new Negociacoes();`
- herança em TypeScript é igual ao JavaScript, utilizando `class MensagemView extends View { }`, talvez esse seja um momento para utilizar **protected**
- é possível utilizar `generics` através dos colchetes angulares na declaração da classe

```typescript
class View<T> {

    ...

    update(modelo: T): void {
        ...
    }

    template(modelo: T): string {

        ...
    }

}
```

- para criar classes ou métodos abstratos, utiliza-se a palavra chave `abstract`
- para utilizar bibliotecas de terceiros com TypeScript e não ter problemas, é necessário um *TypeScript Declaration File*, que pode ser obtido com

```shellscript
# informar a biblioteca necessária
npm install @types/jquery
```

ou

```typescript
// contorno para evitar mensagem de erro, porém não é recomendado por perder as funcionalidades do TypeScript
// utilizado $ para exemplificar o jQuery
declare var $: any;
```

- é possível organizar os arquivos através de *namespace*

```typescript
// equivalente a module Views { } de versões anteriores ao TypeScript 1.5
namespace Views {

    // dá um apelido para Views.View
    import View = Views.View;

    // necessário o uso de export
    // utiliza o apelido View no extends
    export class MensagemView extends View<string> {

        template(modelo: string): string {
            return `<p class='alert alert-info'>${modelo}</p>`;
        }

    }

}
```

- se um atributo da classe deve ser público e somente puder ser inicializado uma vez, é possível utilizar `readonly`

```typescript
export class Negociacao {

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) { }

    // não é necessário criar getters para os atributos

    get volume() {
        return this.quantidade * this.valor;
    }

}
```

- para deixar um parâmetro opcional, utiliza-se `?`, ele deve ser o último parâmetro e pode existir mais de um, caso o parâmetro não seja informado, seu valor será `undefined`

```typescript
    constructor(seletor: string, escapar?: boolean) {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }
```

- para evitar o uso de `null` e `undefined`, pode ser informada a configuração `"strictNullChecks": true` no arquivo `tsconfig.json`
- para fazer com que uma função retorne `null` mesmo com `strictNullChecks` habilitado, deve-se deixar explícito no tipo de retorno da função

```typescript
    function minhaFuncao(flag: boolean): boolean | null{

        let valor = null;
        if(flag) return null;
        return true;
    }

    let x = minhaFuncao(false);
```

- existe o tipo `never` que é aplicável a métodos ou funções que por algum motivo, planejado ou não, podem não terminar sua execução de seu bloco
- TypeScript possibilita a criação de enumerações

```typescript
    enum DiaDaSemana {
        // 0
        Domingo,
        // 1
        Segunda, // pode ser atribuído um valor, os demais itens serão incrementados a partir do valor anterior
        // 2
        Terca,
        Quarta,
        Quinta,
        Sexta,
        Sabado,
    }
```

- JavaScript disponibiliza um objeto global que pode ser utilizado para verificação de desempenho

```typescript
    meuMetodo(event: Event) {
        const t1 = performance.now();
        // código omitido
        const t2 = performance.now();
        console.log(`Tempo de execução do método adiciona(): ${(t2 - t1)/1000} segundos`);
    }
```

- é possível utilizar um decorator habilitando no `tsconfig.json` através de `"experimentalDecorators": true`, a função do decorator deve retornar outra função. Para utilizar o decorator em um método utilize `@nomeDoDecorator()` acima do método. Também é possível utilizar em atributos e classes

```typescript
export function logarTempoDeExecucao(emSegundos: boolean = false) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        // sobrescreve o método original
        descriptor.value = function (...args: any[]): any {
            let divisor = 1;
            let unidade = 'ms';
            if (emSegundos) {
                divisor = 1000;
                unidade = 's';
            }

            const t1 = performance.now();
            // executa o método original salvo anteriormente
            const resultado = metodoOriginal.apply(this, args);
            const t2 = performance.now();

            console.log(`- Método: ${propertyKey}\n- Parâmetros: ${JSON.stringify(args)}\n- Tempo: ${(t2 - t1) / divisor} ${unidade}`);
            return resultado
        }

        return descriptor;
    }

}
```

- é possível criar interfaces em TypeScript para poder ser utilizado na chamada de API externas, definindo qual o retorna da mesma

```typescript
export interface NegociacaoParcial {
    vezes: number,
    montante: number;
}

// pode ser utilizada para definição de funções também
export interface ResponseHandler {
    // a função deve receber um Response e retornar um Response
    (res: Response): Response
}

// pode ser utilizada para definição de função que deverão ser implementadas em outras classes
export interface Imprimivel {
    // a função deve ter o nome paraTexto, não receber nenhum parâmetro e retornar void
    paraTexto(): void;

}

// interfaces podem estender mais de uma interface, diferente de classes que só podem extender uma única classe
export interface MeuObjeto<T> extends Imprimivel, Igualavel<T>  { }
```

- é possível receber mais de um tipo de parâmetro em uma função utilizando `|`

```typescript
    // pode ser criado um alias para union types
    type MeuToken = string |  number;

    // Union Types é o nome dado a esta característica de receber mais de um parâmetro
    // no lugar de string | number na função abaixo, poderia ser utilizado o alias MeuToken
    function processaToken(token: string | number) {
        // Type Guards é o nome dado a esta característica de verificar o tipo de dado do parâmetro
        // é preferível polimorfismo caso exista a possibilidade
        if(typeof(token) === 'string') {
            return token.replace(/2/g,'X');
        } else {
            return token.toFixed().replace(/2/g,'X');
        }
    }
```

- é possível criar funções assíncronas através de `async`, porém é necessário que dentro da função exista o `await` que irá indicar o ponto de retorno após o processamento assíncrono

```typescript
    async importarDados() {

        ...

        try {
            const negociacoesParaImportar = await this._service.obterNegociacoes(isOk);

            ...

        } catch (err) {
            ...
        }
    }
```

## Referências

[Curso de TypeScript parte 1: Evoluindo seu Javascript](https://www.alura.com.br/curso-online-typescript-parte1)

[Curso de TypeScript parte 2: Mais técnicas e boas práticas](https://www.alura.com.br/curso-online-typescript-parte2)
