const baseURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&per_page=25'



class Crypto{
    constructor(id, nombre, cotizacion, logo){
        this.id = id;
        this.nombre = nombre;
        this.cotizacion = cotizacion;
        this.logo = logo;
    }
}

//Declaro array de criptomonedas
const cryptos = [];


$.get(baseURL, (res, estado) => {
    if(estado === 'success'){
        let coins = res;
        for(const coin of coins){
            cryptos.push(new Crypto(coin.id, coin.name, coin.current_price, coin.image))
        }
        console.log(cryptos);
    }
})
.fail(()=>{
    $('main').prepend(`
        <div class="mt-5 container text-center w-25">
            <img class="img-fluid" src="../assets/error.png">
            <h5 class="mt-5">Lo lamento, volvé a intentar luego.</h5>
            <a class="btn btn-dark mt-5" href="../index.html">Volver al inicio<a>
        </div>
        `)
})
$(document).ajaxStop(() =>{

    const cryptoCatalogue = $('#crypto-catalogue');
    const cotizadorCrypto = $('#cotizadorCrypto');
    let card;
    let logo;
    let cardBody;

    for (let crypto of cryptos) {
        card = document.createElement('div');
        logo = document.createElement('img');
        cardBody = document.createElement('div');
        card.classList.add('card', 'crypto-card', 'text-center', 'bg-light');
        logo.classList.add('card-img-top');
        logo.setAttribute('src', crypto.logo);
        cardBody.classList.add('card-body');
        cardBody.innerHTML = `
            <h5 class="card-title">${crypto.nombre}</h5>
            <p class="card-text">ARS ${crypto.cotizacion}</p>
            <button class="btn btn-outline-dark buy-crypto" value=${crypto.id}>Comprar</button>`

        card.appendChild(logo);
        card.appendChild(cardBody);

        cryptoCatalogue.append(card);

    }


    const inputFiat = $('#inputFiat');
    const inputCrypto = $('#inputCrypto')
    let seleccion;

    $('.buy-crypto').click((e) => {
        seleccion = cryptos.find(coin => coin.id === e.target.value);
        $('#labelCrypto b').text(seleccion.nombre);
        inputCrypto.val("");
        inputFiat.val("");
        $('#cotizadorWrapper').show();
        document.querySelector('#cotizadorWrapper').scrollIntoView({behavior: 'smooth'});
        
    })

    $('#inputCrypto').on('input', (e) =>{
        if(e.target.value > 0){
            let importe = e.target.value * seleccion.cotizacion;
            inputFiat.val(importe);
            $('.invalid-feedback').hide();}
        else{
            $('.invalid-feedback').show();
        }
    })
    inputFiat.on('input', (e) =>{
        if(e.target.value > 0){
            let importe = e.target.value / seleccion.cotizacion;
            inputCrypto.val(importe);
            $('.invalid-feedback').hide();}
        else{
            $('.invalid-feedback').show();
        }
    })

    $('#borrar').click(()=>{
        inputCrypto.val("");
        inputFiat.val("");
    })
})