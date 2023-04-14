function getProductHtml(product){
  return ` <a href="./product.html?id=${product._id}">
  <article>
  <img src="${product.imageUrl}" alt="${product.altTxt}" />
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>
</a>`
}
// URL de l'API pour récupérer les produits
const ApiUrl = 'http://localhost:3000/api/products/';

// Sélectionne l'élément HTML avec l'ID "items" pour afficher les produits
const items = document.querySelector('#items');

// Fonction qui récupère les produits depuis l'API et les affiche dans la page
const container = () => {
  // Appelle l'API pour récupérer les produits
  fetch(ApiUrl)
    .then(response => response.json())
    .then(products =>{
      let html = "";
      for (const product of products) {

      html+= getProductHtml(product)
         
      }
      items.innerHTML = html; 

    })
    // Si une erreur survient, affiche un message d'erreur dans la page
    .catch((err) =>
      document.querySelector('#items').innerText = `Le produit est introuvable !`);

}

// Appelle la fonction "container" pour afficher les produits dans la page
container();

