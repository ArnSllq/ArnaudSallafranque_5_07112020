window.onload = () => {
const x = new URLSearchParams(window.location.search);
let total = x.get('total');
let orderId = x.get('orderId');

console.log(orderId);
console.log(total);

document.getElementById('thank-you').innerHTML='<div><p>Merci pour votre commande numéro : '+orderId+' pour un montant de '+total+' €</p><a href="index.html"><button type="button" class="btn btn-outline-warning" id="back-home">Retour à l\'accueil</a></button></div>';
};