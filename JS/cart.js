window.onload = () => {

    function cartResume() {
        let getTheOrder = localStorage.getItem("tedArray");
        let displayOrder = JSON.parse(getTheOrder);
        let idProducts = displayOrder.map(item => item.id);
        let cartContent = document.getElementById("cartstore");
        let teddiesTotal = 0;

        for(i = 0; i < displayOrder.length; i++) {
            cartContent.innerHTML += '<div class="col-lg-4" id="cart-content"><p>'+displayOrder[i].name+'</p><p>'+displayOrder[i].color+'</p><p>'+displayOrder[i].price+' €</p><p>'+displayOrder[i].quantity+'</p></div>';
            teddiesTotal += Number(displayOrder[i].total);
        };
        document.getElementById("cart-content").innerHTML+='<div><p>TOTAL</p>'+teddiesTotal+' €</div>';


        function sendingData() {
            document.getElementById('Form').onsubmit = async (e) => {
                e.preventDefault();
                let sendingForm = new FormData(Form);
                var object = {};
                sendingForm.forEach((value, key) => object[key] = value);
                var json = object;
                let teddiesOrder = { 
                    "contact" : json,
                    "products" : idProducts
                };
                
                let response = await fetch("https://jwdp5.herokuapp.com/api/teddies/order", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(teddiesOrder),
                });

                let result = await response.json();
                return window.location.replace('order.html?orderId='+result.orderId+'&total='+teddiesTotal+'')
            };
        };
        sendingData();

    };
cartResume();

};
