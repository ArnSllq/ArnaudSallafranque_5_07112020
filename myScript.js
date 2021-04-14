// fetch("https://jwdp5.herokuapp.com/api/teddies")
// .then(function (response) {
//     return response.json()
// }).then(function (data) {
//     console.log(data)
// })

// const getTeddies = async function () {
//     let response = await fetch ('https://jwdp5.herokuapp.com/api/teddies')
//     if (response.ok) {
//         let data = await response.json()
//         console.log(data)
//     } else {
//         console.error('Retour du serveur : ', response.status)
//     }
// }
// getTeddies()

// fetch ('https://jwdp5.herokuapp.com/api/teddies')
//     .then(
//         function(response) {
//             if (response.status !== 200) {
//                 console.log("Qu'entend-je ? Un problème ? " + response.status);
//                 return
//             }
//             response.json().then(function(data) {
//                 console.log(data);
//                 });
//         }
//     )



let getTeddies = new XMLHttpRequest();
getTeddies.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
        console.log(response.length);
        let tedContain = document.getElementById("test");

        for(i = 0; i < response.length; i++) {
            tedContain.innerHTML+='<div class="col-lg-4"><a class="" href="#"><p>Plusieurs couleurs disponibles</p><button type="button" class="btn btn-outline-warning">Plus d\'informations</button></a></div>';
        }
        for(i = 0; i < response.length; i++) {
            document.createElement("div")
        }
    }
};
getTeddies.open("GET", "https://jwdp5.herokuapp.com/api/teddies");
getTeddies.send();
