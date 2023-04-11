const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Récupération des données du produit depuis l'API
fetch(`http://localhost:3000/api/products/${id}`)
  .then(response => response.json())
  .then(productData => {
    console.log(productData)

    // Affichage des images, noms, description, prix, couleur

    // Récupération de l'élément HTML où afficher l'image
    let img = document.querySelector('.item__img');
    // Injection du code HTML pour afficher l'image
    img.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}" />`;


    let name = document.querySelector('#title');
    name.innerHTML = `<h1 id="title">${productData.name}</h1>`;

    let description = document.querySelector('#description');
    description.innerHTML = `<p id="description">${productData.description}</p>`;

    let price = document.querySelector('#price');
    price.innerHTML = `${productData.price}`;


    let colors = document.querySelector('#colors');
    // Boucle pour ajouter chaque option de couleur dans le code HTML
    for (i = 0; i < productData.colors.length; i++) {
      colors.innerHTML += `<option value='${productData.colors[i]}'>${productData.colors[i]}</option>`;
    }
  })

  // Gestion des erreurs en cas de produit introuvable
  .catch((err) => document.querySelector('.item').innerText = `Le produit est introuvable !`);

// Ajout du produit au panier au clic sur le bouton "Ajouter au panier"
const color = document.querySelector("#colors");
const qty = document.querySelector("#quantity");
const addToCart = document.querySelector("#addToCart");

addToCart.addEventListener("click", () => {
  // Création d'un objet contenant les informations du produit sélectionné
  const selectedProduct = {
    quantity: parseInt(qty.value),
    color: color.value,
    _id: id,
  };

  // Récupération du panier depuis le localStorage ou création d'un nouveau panier vide
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Vérification si l'article est déjà présent dans le panier
  const existingItem = cart.findIndex(
    (item) => item._id === selectedProduct._id && item.color === selectedProduct.color
  );

  // Vérification de la validité de la quantité et de la couleur
  if (!selectedProduct.color) {
    alert("Veuillez choisir une couleur pour votre article.");
    return;
  } else if (selectedProduct.quantity < 1 || selectedProduct.quantity > 100) {
    alert("La quantité doit être comprise entre 1 et 100.");
    return;
  }

  if (existingItem !== -1) {
    // Si l'article est déjà dans le panier, incrémenter la nouvelle quantité
    cart[existingItem].quantity += parseInt(selectedProduct.quantity);
  } else {
    // Sinon, ajouter le nouvel article dans le panier
    cart.push(selectedProduct);
  }

  // Mettre à jour le panier dans le localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Afficher une confirmation
  alert("Article ajouté au panier !");
});

