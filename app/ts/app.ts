const negociacaoController = new NegociacaoController();
const form = document.querySelector('.form');
form.addEventListener('submit', negociacaoController.adiciona.bind(negociacaoController));
