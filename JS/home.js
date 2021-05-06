window.onload = () => {
let getTeddies = new XMLHttpRequest();
getTeddies.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
        console.log(response.length);
        let tedContain = document.getElementById("test");

        for(i = 0; i < response.length; i++) {
        tedContain.innerHTML+='<div class="col-lg-4"><a class="" href="product.html?id='+response[i]._id+'"><img class="img-fluid" src="'+response[i].imageUrl+'" alt="'+response[i].name+'"><p>'+response[i].name+'</p><button type="button" class="btn btn-outline-warning">Plus d\'informations</button></a></div>';
        }
    }
};
getTeddies.open("GET", "https://jwdp5.herokuapp.com/api/teddies");
getTeddies.send();
};