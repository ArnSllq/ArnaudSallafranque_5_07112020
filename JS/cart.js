window.onload = () => {
    let getTheOrder = localStorage.getItem("tedArray");
    let displayOrder = JSON.parse(getTheOrder);
    console.log(JSON.parse(getTheOrder));
    let idProducts = displayOrder.map(item => item.id);
    console.log(idProducts);

    let cartContent = document.getElementById("cartstore");
    for(i = 0; i < displayOrder.length; i++) {
        cartContent.innerHTML += '<div class="col-lg-4" id="cart-content"><p>'+displayOrder[i].name+'</p><p>'+displayOrder[i].color+'</p><p>'+displayOrder[i].price+' €</p><p>'+displayOrder[i].quantity+'</p></div>';
    };
    let teddiesTotal = 0;
    let x = displayOrder[0].id;
    for(i = 0; i < displayOrder.length; i++) {
        teddiesTotal += Number(displayOrder[i].total);
        console.log(teddiesTotal);
    };


    document.getElementById('Form').onsubmit = async (e) => {
        e.preventDefault();
        let x = new FormData(Form);
        var object = {};
        x.forEach((value, key) => object[key] = value);
        var json = object;
        let teddiesOrder = { 
            "contact" : json,
            "products" : idProducts
        };
        console.log(JSON.stringify(teddiesOrder));

        let response = await fetch("https://jwdp5.herokuapp.com/api/teddies/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teddiesOrder),
        });

        let result = await response.json();
        console.log(result);
        return window.location.replace('order.html?orderId='+result.orderId+'&total='+teddiesTotal+'')
    };



    document.getElementById("cart-content").innerHTML+='<div><p>TOTAL</p>'+teddiesTotal+' €</div>';
};
