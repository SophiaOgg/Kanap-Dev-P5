//--------------- AFFICHAGE NUMERO DE COMMANDE ---------------
// Récupération de l'orderId de la commande dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");

// Pointage de l'élément et affichage du numéro de commande
const orderIdSpan = document.querySelector("#orderId");
orderIdSpan.textContent = orderId;