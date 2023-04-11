// Page panier

function displayCartItems() {
    const basket = document.querySelector("#cart__items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = {};
    let totalArticle = 0;
    let totalPrice = 0;
  
    cart.forEach((product) => {
      const key = `${product._id}_${product.color}`;
      if (cartItems[key]) {
        cartItems[key].quantity += product.quantity;
      } else {
        cartItems[key] = {
          id: product._id,
          color: product.color,
          quantity: product.quantity,
        };
      }
    });
  
    const products = Object.values(cartItems);

    basket.innerHTML = "";

    totalArticle = 0;
    totalPrice = 0;
  
    if (products && products.length > 0) {        
      products.forEach((product) => {
        fetch(`http://localhost:3000/api/products/${product.id}`)
          .then((response) => response.json())
          .then((productDetails) => {
            basket.innerHTML += `
              <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${productDetails.imageUrl}" alt="${productDetails.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productDetails.name}</h2>
                    <p>${product.color}</p>
                    <p>${productDetails.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}"onchange="updateCartItemQuantity(event, '${product.id}', '${product.color}')">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem"  onclick= "removeFromCart('${product.id}', '${product.color}')" >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
            `;
            totalArticle += product.quantity;
            totalPrice += product.quantity * productDetails.price ;
            document.getElementById("totalQuantity").textContent = totalArticle;
            document.getElementById("totalPrice").textContent = totalPrice;
           
           
          })
          .catch((error) => {
            console.error(`Error fetching product with id ${product.id}`, error);
          });
      });
    } else {
         
      basket.innerHTML = "<p>Votre panier est vide.</p>";
      totalArticle = 0;
      totalPrice = 0;
      document.getElementById("totalQuantity").textContent = totalArticle;
      document.getElementById("totalPrice").textContent = totalPrice;
    }
  }
  
  displayCartItems();
  


//   // function updateCartItemQuantity(event) {
    
//   //   const input = event.target;
//   //   const article = input.closest(".cart__item");
//   //   const productId = article.dataset.id;
//   //   const productColor = article.dataset.color;
//   //   const productQuantity = parseInt(input.value);


  
//   //   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   //   let updatedCart = cart.map((product) => {
//   //     if (product._id === productId && product.color === productColor) {
//   //       product.quantity = productQuantity;
//   //     }
//   //     return product;
//   //   });
//   //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  
//   //   displayCartItems();
//   // }

  function updateCartItemQuantity(event) {
    const input = event.target;
    const article = input.closest(".cart__item");
    const productId = article.dataset.id;
    const productColor = article.dataset.color;
    const productQuantity = parseInt(input.value);
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let updatedCart = cart.map((product) => {
      if (product._id === productId && product.color === productColor) {
        product.quantity = productQuantity;
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    // Recalculate total quantity and price
    let totalArticle = 0;
    let totalPrice = 0;
  
    updatedCart.forEach((product) => {
      const key = `${product._id}_${product.color}`;
      totalArticle += product.quantity;
      fetch(`http://localhost:3000/api/products/${product._id}`)
        .then((response) => response.json())
        .then((productDetails) => {
          totalPrice += product.quantity * productDetails.price;
          document.getElementById("totalQuantity").textContent = totalArticle;
          document.getElementById("totalPrice").textContent = totalPrice;
        })
        .catch((error) => {
          console.error(`Error fetching product with id ${product.id}`, error);
        });
    });
  }
  


  function addToCart(productId, color, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const existingItemIndex = cart.findIndex(
      (item) => item._id === productId && item.color === color
    );
  
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        _id: productId,
        color,
        quantity,
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    
  }
  
  function removeFromCart(productId, color) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const updatedCart = cart.filter(
      (item) => item._id !== productId || item.color !== color
    );
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    displayCartItems();
  
  }





// Formulaire

  // Variables associées aux différents inputs du formulaire
const prenom = document.getElementById('firstName');
const nom = document.getElementById('lastName');
const adresse = document.getElementById('address');
const ville = document.getElementById('city');
const mail = document.getElementById('email');

// Création de RegExp pour les prénoms et noms
const nameRegExp = /^[a-zA-ZÀ-ÿ\s'-]{2,20}$/;

// Création de RegExp pour l'adresse et la ville
const addressRegExp = /^[a-zA-ZÀ-ÿ0-9\s,'-]*$/;

// Création de RegExp pour l'adresse mail
const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Fonction pour validation du prénom ou erreur
const validFirstName = () => {
  if (!nameRegExp.test(prenom.value)) {
    document.getElementById('firstNameErrorMsg').textContent = 'Veuillez entrer un prénom valide.';
    return false;
  } else {
    document.getElementById('firstNameErrorMsg').textContent = '';
    return true;
  }
};

// Fonction pour validation du nom ou erreur
const validLastName = () => {
  if (!nameRegExp.test(nom.value)) {
    document.getElementById('lastNameErrorMsg').textContent = 'Veuillez entrer un nom valide.';
    return false;
  } else {
    document.getElementById('lastNameErrorMsg').textContent = '';
    return true;
  }
};

// Fonction pour validation de l'adresse ou erreur
const validAddress = () => {
  if (!addressRegExp.test(adresse.value)) {
    document.getElementById('addressErrorMsg').textContent = 'Veuillez entrer une adresse valide.';
    return false;
  } else {
    document.getElementById('addressErrorMsg').textContent = '';
    return true;
  }
};

// Fonction pour validation de la ville ou erreur
const validCity = () => {
  if (!addressRegExp.test(ville.value)) {
    document.getElementById('cityErrorMsg').textContent = 'Veuillez entrer une ville valide.';
    return false;
  } else {
    document.getElementById('cityErrorMsg').textContent = '';
    return true;
  }
};

// Fonction pour validation de l'adresse mail ou erreur
const validEmail = () => {
  if (!emailRegExp.test(mail.value)) {
    document.getElementById('emailErrorMsg').textContent = 'Veuillez entrer une adresse email valide.';
    return false;
  } else {
    document.getElementById('emailErrorMsg').textContent = '';
    return true;
  }
};

// Evenement d'écoute de l'input prénom
prenom.addEventListener('input', validFirstName);

// Evenement d'écoute pour l'input nom
nom.addEventListener('input', validLastName);

// Evenement d'écoute pour l'input adresse
adresse.addEventListener('input', validAddress);

// Evenement d'écoute pour l'input ville
ville.addEventListener('input', validCity);

// Evenement d'écoute pour l'input mail
mail.addEventListener('input', validEmail);





// Fonction pour tester si le formulaire est valide
function testForm() {
  return (
  validFirstName() &&
  validLastName() &&
  validAddress() &&
  validCity() &&
  validEmail()
  );
  }

//---------------  COMMANDE ---------------
// Pointage sur le bouton Commander et écoute de l'évènement formulaire au clic
document.querySelector("#order").addEventListener("click", formulaire);


function formulaire(event) {
    event.preventDefault();
    if (testForm()) {
      let contact = {
        firstName: prenom.value,
        lastName : nom.value,
        address : adresse.value,
        city : ville.value,
        email : mail.value
        };
            
        let cart = JSON.parse(localStorage.getItem("cart"));
        let products = cart.map(item => item._id);

        numeroCommande(contact, products);
    }
}


async function numeroCommande(contact, products) {
    let body = {contact, products};

    const post = await fetch("http://localhost:3000/api/products/order", {
        method : "POST",
        headers : {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body)
    })

    const res = await post.json();
    const orderId = res.orderId;
    localStorage.setItem("orderId", orderId);
    window.location.href = `confirmation.html?orderId=${orderId}`;
    // Supprimer le panier du localStorage après avoir passé une commande
    localStorage.removeItem("cart");
}