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


cryptos.push(new Crypto("btc", "Bitcoin", 50000, "../assets/bitcoin-btc-logo.png"));
cryptos.push(new Crypto("eth", "Ethereum", 3850, "../assets/ethereum-eth-logo.png"));
cryptos.push(new Crypto("ada", "Cardano", 2.85, "../assets/cardano-ada-logo.png"));
cryptos.push(new Crypto("doge", "Dogecoin", 0.29, "../assets/dogecoin-doge-logo.png"));
cryptos.push(new Crypto("bnb", "Binance Coin", 495, "../assets/binance-coin-bnb-logo.png"));
cryptos.push(new Crypto("xrp", "XRP", 1.25, "../assets/xrp-xrp-logo.png"));

const cryptoCatalogue = $('#crypto-catalogue');
const cotizadorCrypto = $('#cotizadorCrypto');
let card;
let logo;
let cardBody;

for (let coin of cryptos) {
    card = document.createElement('div');
    logo = document.createElement('img');
    cardBody = document.createElement('div');
    card.classList.add('card', 'crypto-card', 'text-center', 'bg-light');
    logo.classList.add('card-img-top');
    logo.setAttribute('src', coin.logo);
    cardBody.classList.add('card-body');
    cardBody.innerHTML = `
        <h5 class="card-title">${coin.nombre}</h5>
        <p class="card-text">USD ${coin.cotizacion}</p>
        <button class="btn btn-outline-dark buy-crypto" value=${coin.id}>Comprar</button>`

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
    document.querySelector('#cotizadorWrapper').scrollIntoView();
    
})

$('#inputCrypto').change((e) =>{
    if(e.target.value > 0){
        let importe = e.target.value * seleccion.cotizacion * 168;
        inputFiat.val(importe);
        $('.invalid-feedback').hide();}
    else{
        $('.invalid-feedback').show();
    }
})
inputFiat.change((e) =>{
    if(e.target.value > 0){
        let importe = e.target.value / seleccion.cotizacion / 168;
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
