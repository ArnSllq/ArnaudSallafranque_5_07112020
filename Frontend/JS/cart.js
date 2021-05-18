window.onload = () => {

    function cartResume() {
        // Création des principales variables qui nous serviront plus tard dans le script
        // Les deux premières permettent de récupérer les données du localStorage et de les mettre au bon format
        let getTheOrder = localStorage.getItem("tedArray");
        let displayOrder = JSON.parse(getTheOrder);
        // Celle-ci permet de créer un nouvel objet contenant uniquement les Id des produits qui seront envoyés à l'API
        let idProducts = displayOrder.map(item => item.id);
        let cartContent = document.getElementById("cartstore");
        let teddiesTotal = 0;
        // Boucle permettant d'afficher le contenu du localStorage, ainsi que de calculer le total
        for(i = 0; i < displayOrder.length; i++) {
            cartContent.innerHTML += '<div class="col-lg-4" id="cart-content"><p><strong>'+displayOrder[i].name+'</strong></p><p><strong>Coloris</strong> : '+displayOrder[i].color+'</p><p><strong>Prix</strong> : '+displayOrder[i].price+' €</p><p><strong>Quantité</strong> : '+displayOrder[i].quantity+'</p></div>';
            teddiesTotal += Number(displayOrder[i].total);
        };
        // Affichage du total sur la page
        document.getElementById("Tedtotal").innerHTML+='<div><p>TOTAL</p>'+teddiesTotal+' €</div>';

        // Envoie des données avec une requête de type POST après les avoir formaté au format attendu par l'API
        function sendingData() {
            document.getElementById('Form').onsubmit = async (e) => {
                e.preventDefault();
                let sendingForm = new FormData(Form);
                var object = {};
                sendingForm.forEach((value, key) => object[key] = value);
                var json = object;
                // Objet contenant les informations à transmettre, les informations contenues dans le formulaire et les ID des produits
                let teddiesOrder = { 
                    "contact" : json,
                    "products" : idProducts
                };
                // Requête type POST
                // let response = await fetch("https://jwdp5.herokuapp.com/api/teddies/order", {
                let response = await fetch("http://localhost:3000/api/teddies/order", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    // Envoi de l'objet contenant les données
                    body: JSON.stringify(teddiesOrder),
                });

                let result = await response.json();
                // Envoi de l'id unique de la commande et le total dans l'URL et redirection vers la page de confirmation de commande "order.html"
                return window.location.replace('order.html?orderId='+result.orderId+'&total='+teddiesTotal+'')
            };
        };
        sendingData();

    };
cartResume();

};
