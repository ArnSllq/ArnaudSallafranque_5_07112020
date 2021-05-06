window.onload = () => {
function init() {
let thatOneTeddy = "/" + location.search.slice(1).split("=")[1];
console.log(thatOneTeddy);


let getTeddies = new XMLHttpRequest();
    getTeddies.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
            console.log(response.colors.length);
            let tedProduct = document.getElementById("TEDIBER");
            tedProduct.innerHTML+='<div class="col-lg-4"><img class="img-fluid" src="'+response.imageUrl+'" alt="'+response.name+'"><p class="Teddies-name">'+response.name+'</p><div class="form-group"><label for="exampleFormControlSelect1">Choisir la couleur :</label><select class="form-control Teddies-color" id="exampleFormControlSelect1"></select></div><p class="Teddies-price">'+response.price/100+' €</p><input class="Teddies-number" type="number" value="1" min="1" max="1000" step="1"/><button type="button" class="btn btn-outline-warning" id="Teddies-cart">Ajouter au panier</button></div>';

            let teddiesColor = document.getElementsByTagName("select")[0];
            let tedId = response._id;
            
            for(i = 0; i < response.colors.length; i++) {
                teddiesColor.innerHTML+='<option>'+response.colors[i]+'</option>';
            }
            
            function tedInTheCart() {
                let tedName = document.getElementsByClassName("Teddies-name").innerHTML= response.name;
                let tedPrice = document.getElementsByClassName("Teddies-price").innerHTML= response.price/100;
                let tedColor = document.getElementsByClassName("Teddies-color")[0].value;
                let tedNumber = document.getElementsByClassName("Teddies-number")[0].value;

                let tedStore = {
                    "id" : tedId,
                    "name" : tedName,
                    "price" : tedPrice,
                    "color" : tedColor,
                    "quantity" : parseInt(tedNumber),
                    "total" : tedPrice * parseInt(tedNumber)
                };

                if (localStorage.length > 0) {
                    let monBoTab = JSON.parse(localStorage.getItem("tedArray")) ?? [];
                    monBoTab.push(tedStore);
                    localStorage.setItem("tedArray", JSON.stringify(monBoTab));   
                    // localStorage.setItem("tedArray", monBoTab);    
                    console.log(monBoTab);
                } else {
                    let myFirstItem = JSON.stringify([tedStore]);
                    localStorage.setItem("tedArray", myFirstItem);
                };
            };

            document.getElementById("Teddies-cart").addEventListener("click", tedInTheCart);
        }
    };


    
getTeddies.open('GET', 'https://jwdp5.herokuapp.com/api/teddies'+thatOneTeddy+'');
getTeddies.send();
}

init()
};