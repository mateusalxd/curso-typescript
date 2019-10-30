namespace Views {

    import View = Views.View;

    export class MensagemView extends View<string> {

        template(modelo: string): string {
            return `<p class='alert alert-info'>${modelo}</p>`;
        }

    }

}