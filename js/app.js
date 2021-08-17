class Moneda{
    
    constructor(id, nombre, cotizacion, comision){
        this.id = id;
        this.nombre = nombre;
        this.cotizacion = cotizacion;
        this.comision = comision;
    }
    //Calcula el subtotal sin comision
    cotizar(monto){
        let total = monto * this.cotizacion;
        return total;        
    }
    //Calcula la comision sobre el total
    calcularComision(total){
        let comision = total * this.comision;
        return comision;
    }
    //Muestra los calculos en pantalla
    mostrarEnPantalla(){
        document.write(`
            <main class="container-fluid py-4">
            <div class="container text-center p-5 bg-light border rounded-4">
            <h1 class="display-5 fw-normal">Comprá divisas y criptomonedas.</h1>
            <p class="lead fw-normal">En JS Exchange, no tenés que moverte de tu casa para conseguir la mejor comisión del mercado.</p>
            <div class="container mt-5">
                <div>
                    <h2>${mont} ${this.nombre} son AR$${total}.</h2>
                    <p>Debe sumarle una comisión de AR$${comision}.</p>
                </div>
            <div class="container pt-5">
                <button class="btn btn-outline-primary btn-lg">Comprar</button>
            </div>
            </div>
            </main>`);
    }
}

//Declaro array de monedas
const monedas = [];


monedas.push(new Moneda("dolares", "Dolares", 168, 0.01));
monedas.push(new Moneda("euros", "Euros", 197, 0.012));
monedas.push(new Moneda("reales", "Reales", 32, 0.015));

console.log(monedas);



//Input del usuario (moneda)
const elegirMoneda = () => {
    moneda = prompt("Ingrese la moneda que desea comprar (DOLARES, EUROS o REALES)").toLowerCase()
    while(moneda !== "dolares" && moneda !== "euros" && moneda !== "reales") {
        moneda = prompt("Ingrese una moneda válida (DOLARES, EUROS o REALES)").toLowerCase()}
    return moneda;   
}

//Input del usuario (monto a comprar)
const elegirMonto = () => {
    monto = prompt("Ingrese el monto que desea comprar");
    while(isNaN(monto) || monto<=0){
        monto = prompt("Ingrese el monto válido.");
    };
    return monto;
}

const mone = elegirMoneda();
const mont = elegirMonto();
const seleccionado = monedas.find(elemento => elemento.id === mone);

const total = seleccionado.cotizar(mont);
const comision = seleccionado.calcularComision(total);
seleccionado.mostrarEnPantalla();






