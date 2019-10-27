# Anotações do curso de TypeScript

- o código em TypeScript precisa ser compilado para JavaScript para ser interpretado
- as configurações de compilação do TypeScript ficam no arquivo `tsconfig.json`
- é possível utilizar modificadores de acesso como: **public**, **private** e **protected**, sendo **public** o padrão
- o típo da variável é definido logo após seu nome, se o mesmo não for informado, será considerado implicitamente o tipo `any`, que pode representar qualquer coisa

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
