// URL de l'API pour récupérer les produits
const ApiUrl = 'http://localhost:3000/api/products/';

// Sélectionne l'élément HTML avec l'ID "items" pour afficher les produits
const items = document.querySelector('#items');

// Fonction qui récupère les produits depuis l'API et les affiche dans la page
const container = () => {
  // Appelle l'API pour récupérer les produits
  fetch(ApiUrl)
    .then(response => response.json())
    .then(data =>{
      // Boucle sur les produits pour les afficher dans la page
      for (i = 0; i < data.length; i++) {
        items.innerHTML += `
        <a href="./product.html?id=${data[i]._id}">
            <article>
            <img src="${data[i].imageUrl}" alt="${data[i].altTxt}" />
              <h3 class="productName">${data[i].name}</h3>
              <p class="productDescription">${data[i].description}</p>
            </article>
          </a>
        `;
      }
    })
    // Si une erreur survient, affiche un message d'erreur dans la page
    .catch((err) =>
      document.querySelector('#items').innerText = `Le produit est introuvable !`);
}

// Appelle la fonction "container" pour afficher les produits dans la page
container();

