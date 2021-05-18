window.onload = () => {
    // Variable qui nous permettra plus tard de récupérer les informations du produit qui doit être affiché
    let thatOneTeddy = "/" + location.search.slice(1).split("=")[1];
    // Variable utilisée plus tard pour pour générer la fiche produit
    let tedProduct = document.getElementById("TEDIBER");
        // Fonction de requête "GET"
        function init() {
            try {
                let getTeddies = new XMLHttpRequest();
                    getTeddies.onreadystatechange = function() {
                        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                            let response = JSON.parse(this.responseText);
                            //  Affichage de la fiche produit
                            tedProduct.innerHTML+='<div class="col-lg-4"><img class="img-fluid" src="'+response.imageUrl+'" alt="'+response.name+'"><p class="Teddies-name">'+response.name+'</p><div class="form-group"><label for="exampleFormControlSelect1">Choisir la couleur :</label><select class="form-control Teddies-color" id="exampleFormControlSelect1"></select></div><p class="Teddies-price">'+response.price/100+' €</p><input class="Teddies-number" type="number" value="1" min="1" max="1000" step="1"/><button type="button" class="btn btn-outline-warning" id="Teddies-cart">Ajouter au panier</button></div>';
                            // Variable permettant plus tard d'accéder au DOM pour accéder aux couleurs
                            let teddiesColor = document.getElementsByTagName("select")[0];
                            // Variable contenant l'id du produit qui sera stocker plus tard dans le localStorage
                            let tedId = response._id;
                            // Boucle permettant de faire apparaitre les différents coloris pour le produit
                            for(i = 0; i < response.colors.length; i++) {
                                teddiesColor.innerHTML+='<option>'+response.colors[i]+'</option>';
                            }
                            // Fonction se déclenchant au clic sur ajouter au panier
                            function tedInTheCart() {
                                let tedName = document.getElementsByClassName("Teddies-name").innerHTML= response.name;
                                let tedPrice = document.getElementsByClassName("Teddies-price").innerHTML= response.price/100;
                                let tedColor = document.getElementsByClassName("Teddies-color")[0].value;
                                let tedNumber = document.getElementsByClassName("Teddies-number")[0].value;
                                // Variable stockant les informations envoyés dans le localStorage, id, nom, prix, couleur choisie, quantité et enfin le total
                                let tedStore = {
                                    "id" : tedId,
                                    "name" : tedName,
                                    "price" : tedPrice,
                                    "color" : tedColor,
                                    "quantity" : parseInt(tedNumber),
                                    "total" : tedPrice * parseInt(tedNumber)
                                };
                                // Partie qui permet de la stockage dans le localStorage, la partie If, se déclenche s'il y a déjà un objet de stocker, 
                                if (localStorage.length > 0) {
                                    let monBoTab = JSON.parse(localStorage.getItem("tedArray")) ?? [];
                                    monBoTab.push(tedStore);
                                    localStorage.setItem("tedArray", JSON.stringify(monBoTab));
                                    // sinon c'est cette partie qui se déclenche, pour stocker le première objet sous forme de tableau   
                                } else {
                                    let myFirstItem = JSON.stringify([tedStore]);
                                    localStorage.setItem("tedArray", myFirstItem);
                                };
                                document.getElementById("Thank-you").innerHTML='<div class="alert alert-info" role="alert">'+tedName+' vous attend dans le <a href="cart.html" class="alert-link">panier</a>. Vous pouvez également <a href="index.html" class="alert-link">continuer votre visite</a>.';
                            };
                            // Déclenchement de la fonction au "click"
                            document.getElementById("Teddies-cart").addEventListener("click", tedInTheCart);
                        }
                    }
                // getTeddies.open('GET', 'https://jwdp5.herokuapp.com/api/teddies'+thatOneTeddy+'');
                getTeddies.open('GET', 'http://localhost:3000/api/teddies'+thatOneTeddy+'');
                getTeddies.send();
            } catch {
                tedProduct.innerHTML='<h1>Can\'t get load informations</h1>'
            };
        };

    init()
};