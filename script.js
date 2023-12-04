const form = document.querySelector('form')
const botoes = document.querySelectorAll('button')
let pokemonAtual
let controller = new AbortController();
let numeroAtual = 1
botoes.forEach(botao => {
    botao.addEventListener('click', ()=>{
        if (botao.className === 'esquerda'){
            numeroAtual--
        }else if(botao.className === 'direita'){
            numeroAtual++
        }
        numeroAtual = Math.max(1, Math.min(numeroAtual, 649));
        if (numeroAtual === 1){
            numeroAtual = 649
        }else if (numeroAtual === 649){
            numeroAtual = 1
        }
        pokeapi(numeroAtual);

    })
});
form.addEventListener('input', (e) => {
    const nomeInput = form.nome;
    nomeInput.value = nomeInput.value.toLowerCase();
        // Remover caracteres não permitidos (símbolos)
        nomeInput.value = nomeInput.value.replace(/[^a-zA-Z0-9]/g, '');

        // Remover zeros à esquerda
        if (/^\d+/.test(nomeInput.value)) {
            nomeInput.value = parseInt(nomeInput.value, 10).toString()
        }      
})
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nome = form.nome.value.trim()
    if (nome === '' || nome <= 0 || nome > 649){
        alert('Coloque um nome válido ou um numéro de 1 até 649')
        return
    }
    try {
        pokeapi(nome)
        form.reset()
    } finally {
        setTimeout(() => {
        }, 1000);
    }
})


function redenrizar(poke) {

    let pokemonImagem = document.querySelector('.pokemonImagem')
    let nomePoke = document.querySelector('.nomePoke')
    let numero = document.querySelector('.numero')
    numero.textContent = poke.id
    pokemonImagem.src = poke.sprites.versions['generation-v']['black-white'].animated['front_default']
    nomePoke.textContent = poke.name
    numeroAtual = poke.id
}

function pokeapi(pokemon) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            pokemonAtual = data.name
            redenrizar(data)
        })
        .catch(error => {
            if (error.message === '404') {
                alert("Não encontrado o pokémon " + pokemon)
                alert('Coloque um nome válido ou um numéro de 1 até 649')
                document.querySelector('input').value = ''
            }
        })
}
pokeapi(1)

document.querySelector('.pokemonImagem').addEventListener('mouseenter', () => {
    document.querySelector('.pokemonImagem').title = "Pokémon " + pokemonAtual
})