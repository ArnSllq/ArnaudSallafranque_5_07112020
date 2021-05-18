window.onload = () => {

    function thankYou() {
        // On vide le localStorage, quand la commande est confirmée
        if (localStorage.length>0) {
        localStorage.clear()
        }
        // Constante qui nous permet de récupérer les données à afficher sur la page, le total de la commande ainsi que son ID unique
        const urlData = new URLSearchParams(window.location.search);
        let total = urlData.get('total');
        let orderId = urlData.get('orderId');
        // On crée le message de confirmation de commande, avec les informations récupérées au-dessus
        document.getElementById('thank-you').innerHTML='<div><p>Merci pour votre commande numéro : '+orderId+' pour un montant de '+total+' €</p><a href="index.html"><button type="button" class="btn btn-outline-warning" id="back-home">Retour à l\'accueil</a></button></div>';
    };

    thankYou();
};

