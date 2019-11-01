import { Imprimivel } from "./Imprimivel";

export class Negociacao extends Imprimivel {

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {
        super();
    }

    get volume() {
        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log(`Data: ${this.data}\nQuantidade: ${this.quantidade}\nValor: ${this.valor}`);
    }
    
}