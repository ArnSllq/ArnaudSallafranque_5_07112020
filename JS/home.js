window.onload = () => {

    let tedContain = document.getElementById("products-list");

    function displayTeddies() {
        try {
            let getTeddies = new XMLHttpRequest();
            getTeddies.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    let response = JSON.parse(this.responseText);
                    
                    for(i = 0; i < response.length; i++) {
                    tedContain.innerHTML+='<div class="col-lg-4"><a class="" href="product.html?id='+response[i]._id+'"><img class="img-fluid" src="'+response[i].imageUrl+'" alt="'+response[i].name+'"><p>'+response[i].name+'</p><button type="button" class="btn btn-outline-warning">Plus d\'informations</button></a></div>';
                    }
                }
            };
            getTeddies.open("GET", "https://jwdp5.herokuapp.com/api/teddies");
            getTeddies.send();
        } catch {
            tedContain.innerHTML+= '<p>nothing to see here</p>';
        };
    };
    displayTeddies();
};