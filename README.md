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

- se um atributo da classe deve ser público e somente puder ser inicializado uma vez, é possível utilizare `readonly`

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

- para evitar o uso de `null` e `undefined`, pode ser informada a configuração `"strictNullChecks": true` no arquivo `tsconfig.json`.
- para fazer com que uma função retorne `null` mesmo com `strictNullChecks` habilitado, deve-se deixar explícito no tipo de retorno da função

```typescript
    function minhaFuncao(flag: boolean): boolean | null{

        let valor = null;
        if(flag) return null;
        return true;
    }

    let x = minhaFuncao(false);
```

- existe o tipo `never` que é aplicável à métodos ou funções que por algum motivo, planejado ou não, podem não terminar sua execução de seu bloco.
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

## Referências

[Curso de TypeScript parte 1: Evoluindo seu Javascript](https://www.alura.com.br/curso-online-typescript-parte1)

[Curso de TypeScript parte 2: Mais técnicas e boas práticas](https://www.alura.com.br/curso-online-typescript-parte2)
