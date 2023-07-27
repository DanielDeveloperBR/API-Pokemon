const form = document.querySelector("form")
// Criando um paragrafo
const resultado = document.createElement("div")
//Colocando os novos elementos como filho do formulario
document.body.appendChild(resultado)
form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const poke = form.poke.value
    const regex = /^[A-Za-z0-9\s]+$/
    if (poke.trim() === "" || !poke.match(regex)) {
        alert("Preencha um nome de um Pokemon ou um número de 0 até 1010")
        return
    }
    //Usando a api do pokeapi com o framework do ajax
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${poke}`, success: function (result) {
            // mostrando a mensagem dinamicamente
            const conteudo = `
            <p class="Personalizar"><strong>Nome:</strong> ${result.name}</p>
            <p class="Personalizar"><strong>Peso:</strong> ${result.weight}\&nbsp;kg</p>
            <p class="Personalizar"><strong>Altura:</strong> ${result.height}&nbsp;m</p>
            <img src="${result.sprites.front_default}" alt="${result.name}" />`
            resultado.style.display = "block"
            resultado.innerHTML = conteudo
        }
    })
})