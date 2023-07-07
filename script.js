const form = document.querySelector("form")
form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const poke = form.poke.value
    //Usando a api do pokeapi com o framework do ajax
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${poke}`, success: function (result) {
            // Criando um paragrafo
            const resultado = document.createElement("div")
            const nome = document.createElement("p")
            const peso = document.createElement("p")
            const altura = document.createElement("p")
            const imagem = document.createElement("img")
            // //Colocando os novos elementos como filho do formulario
            form.append(nome)
            form.append(peso)
            form.append(altura)
            form.append(imagem)
            document.body.append(resultado)
            resultado.append(imagem)
           // mostrando a mensagem dinamicamente
            nome.innerHTML = (`Nome: ${result.name}`)
            peso.innerHTML = (`Peso: ${result.weight}`)
            altura.innerHTML = (`Altura: ${result.height}`)
            imagem.style.width = "300px"
            imagem.style.height = "300px"
            imagem.src = (`${result.sprites.front_default}`)

        }
    })
})