window.onload = () => {
    // Création de la variable qui nous permettra plus tard d'ajouter les données de l'API
    let tedContain = document.getElementById("products-list");

    // Fonction globale d'appel de l'API, et d'affichage des données reçues avec une boucle for
    function displayTeddies() {
        try {
            let getTeddies = new XMLHttpRequest();
            getTeddies.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    let response = JSON.parse(this.responseText);
                    // boucle qui créait une div pour chaque ligne de l'API, et affiche les données correspondantes à la ligne [i]
                    for(i = 0; i < response.length; i++) {
                    tedContain.innerHTML+='<div class="col-lg-4"><a class="" href="product.html?id='+response[i]._id+'"><img class="img-fluid" src="'+response[i].imageUrl+'" alt="'+response[i].name+'"><p>'+response[i].name+'</p><button type="button" class="btn btn-outline-warning">Plus d\'informations</button></a></div>';
                    }
                }
            };
            // Appel type "GET"
            // getTeddies.open("GET", "https://jwdp5.herokuapp.com/api/teddies");
            getTeddies.open("GET", "http://localhost:3000/api/teddies");
            getTeddies.send();
        } catch {
            tedContain.innerHTML+= '<p>nothing to see here</p>';
        };
    };
    displayTeddies();
};