window.onload = () => {

    function thankYou() {
        if (localStorage.length>0) {
        localStorage.clear()
        }

        const x = new URLSearchParams(window.location.search);
        let total = x.get('total');
        let orderId = x.get('orderId');
        document.getElementById('thank-you').innerHTML='<div><p>Merci pour votre commande numéro : '+orderId+' pour un montant de '+total+' €</p><a href="index.html"><button type="button" class="btn btn-outline-warning" id="back-home">Retour à l\'accueil</a></button></div>';
    };

    thankYou();
};

