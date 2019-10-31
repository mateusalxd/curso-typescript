export function logarTempoDeExecucao(emSegundos: boolean = false) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function (...args: any[]): any {
            let divisor = 1;
            let unidade = 'ms';
            if (emSegundos) {
                divisor = 1000;
                unidade = 's';
            }

            const t1 = performance.now();
            const resultado = metodoOriginal.apply(this, args);
            const t2 = performance.now();

            console.log(`- Método: ${propertyKey}\n- Parâmetros: ${JSON.stringify(args)}\n- Tempo: ${(t2 - t1) / divisor} ${unidade}`);
            return resultado
        }

        return descriptor;
    }

}