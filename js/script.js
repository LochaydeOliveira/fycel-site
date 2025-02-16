function includeHTML() {
var elements = document.querySelectorAll("[data-include-html]");
elements.forEach(function(el) {
    var file = el.getAttribute("data-include-html");
    fetch(file)
    .then(response => {
        if (response.ok) return response.text();
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        el.innerHTML = data;
        el.removeAttribute("data-include-html");

        includeHTML();
    })
    .catch(error => {
        console.log('Error fetching the file:', error);
        el.innerHTML = "Page not found.";
    });
});
}

document.addEventListener("DOMContentLoaded", function() {
includeHTML();
});



document.addEventListener("DOMContentLoaded", async function () {
    try {

        const urlAtual = window.location.pathname.toLowerCase();


        const isPaginaInicial = urlAtual === "/" || urlAtual.endsWith("index.html");

        let categoriaEncontrada = null;
        let produtosJson = "produtos.json";

        if (!isPaginaInicial) {

            const categoriasResponse = await fetch("categorias.json");
            const categorias = await categoriasResponse.json();


            for (let categoriaObj of categorias) {
                let categoria = categoriaObj.category.toLowerCase();
                if (urlAtual.includes(categoria)) {
                    categoriaEncontrada = categoria;
                    produtosJson = `${categoriaEncontrada}.json`;
                    break;
                }
            }
        }

        // Carrega os produtos do JSON correto
        const produtosResponse = await fetch(produtosJson);
        const produtos = await produtosResponse.json();

        const container = document.getElementById("product-container");

        // Limpa o container antes de inserir novos produtos
        container.innerHTML = "";

        // Insere os produtos na página
        for (let produto of produtos) {
            let logo = produto.logo;
            if (produto.logo.toLowerCase() === "amazon") {
                logo = "img/Amazon-Logo.png";
            } else if (produto.logo.toLowerCase() === "shopee") {
                logo = "img/shopee-logo.png";
            }

            const card = document.createElement("div");
            card.className = "col";
            card.innerHTML = `
                <div class="card h-100 border-0 rounded--custom text-center">
                    <a class="img-prod" href="${produto.url}" target="_blank">
                        <img src="${produto.image}" class="card-img-top" alt="${produto.name}">
                    </a>
                    <div class="card-body">
                        <div class="rating">
                            <span class="stars" data-rating="${produto.rating}"></span>
                            <span class="rating-text">${produto.rating}</span>
                        </div>
                        <a href="${produto.url}" class="card-title" target="_blank">${produto.name}</a>
                        <p style="display: none!important;">${produto.price}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        }

        document.querySelectorAll(".stars").forEach(el => {
            let rating = parseFloat(el.getAttribute("data-rating"));
            let starsHTML = "";
        
            for (let i = 1; i <= 5; i++) {
                if (rating >= i || rating > 4.6 ) {
                    // Adiciona estrela cheia se a nota for maior ou igual ao índice
                    starsHTML += '<i class="bi bi-star-fill"></i>';
                } else if (rating >= i - 0.5 && rating < i ) {
                    // Adiciona estrela pela metade se a nota estiver entre (i - 0.5) e i
                    starsHTML += '<i class="bi bi-star-half"></i>';
                } else {
                    // Adiciona estrela vazia para completar as 5 estrelas
                    starsHTML += '<i class="bi bi-star"></i>';
                }
            }
        
            el.innerHTML = starsHTML;
        });
        
        
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
    }
});




let products = [];

function addProduct() {
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;
    let rating = parseFloat(document.getElementById("rating").value);
    let url = document.getElementById("url").value;
    let logo = document.getElementById("logo").value;

    let newProduct = { name, image, rating, url, logo };

    products.push(newProduct);

    document.getElementById("jsonOutput").value = JSON.stringify({ products }, null, 2);
}



document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll('.dropdown-submenu > a').forEach(function (element) {
        element.addEventListener("click", function (e) {
            if (window.innerWidth < 992) { 
                e.preventDefault(); 
                let submenu = this.nextElementSibling;
                if (submenu.style.display === "block") {
                    submenu.style.display = "none";
                } else {

                    document.querySelectorAll('.dropdown-menu .dropdown-menu').forEach(function (el) {
                        el.style.display = "none";
                    });
                    submenu.style.display = "block";
                }
            }
        });
    });
});