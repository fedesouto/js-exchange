class Moneda{
    
    constructor(id, nombre, cotizacion, comi){
        this.id = id;
        this.nombre = nombre;
        this.cotizacion = cotizacion;
        this.comi = comi;
    }
    //Calcula el subtotal sin comision
    cotizar(monto){
        let total = monto * this.cotizacion;
        return total;        
    }
    //Calcula la comision sobre el total
    calcularComision(total){
        let comision = total * (this.comi / 100);
        return comision;
    }
    
}

class Operacion{
    constructor(moneda, monto, total, comision){
        this.moneda = moneda;
        this.monto = monto;
        this.total = total;
        this.comision = comision;
    }
    mostrarResultado() {
        resultDiv.innerHTML = `
        <div class="container mt-5 text-white">
            <div>
                <h2>${this.monto} ${this.moneda.nombre} son AR$${this.total}.</h2>
                <p>Debe sumarle una comisión de AR$${this.comision}.</p>
            </div>
            <div class="container pt-5">
                <button class="btn btn-outline-light btn-lg">Comprar</button>
            </div>
        </div>`
        resultDiv.scrollIntoView();
    }
}

//Declaro array de monedas
const monedas = [];


monedas.push(new Moneda("dolares", "Dolares", 168, 1));
monedas.push(new Moneda("euros", "Euros", 197, 1.2));
monedas.push(new Moneda("reales", "Reales", 32, 1.5));
monedas.push(new Moneda("pesosUruguayos", "Pesos Uruguayos", 2.25, 1.5));
monedas.push(new Moneda("pesosChilenos", "Pesos Chilenos", 785.5, 1.5));
monedas.push(new Moneda("guaranies", "Guaranies", 6971, 1.5));
monedas.push(new Moneda("pesosMexicanos", "Pesos Mexicanos", 20.43, 1.5));

console.log(monedas);


//Input del usuario (monto a comprar)
const elegirMonto = () => {
    monto = prompt("Ingrese el monto que desea comprar");
    while(isNaN(monto) || monto<=0){
        monto = prompt("Ingrese el monto válido.");
    };
    return monto;
}


const tablaMonedas = document.querySelector('#tabla__monedas')

for (const moneda of monedas) {
    const tr = document.createElement('tr');
    tr.innerHTML = `  
        <th scope="row">${moneda.nombre}</th>
        <td>ARS ${moneda.cotizacion}</td>
        <td>${moneda.comi} %</td>`;
    tablaMonedas.appendChild(tr)
}

const selectMoneda = document.querySelector('#selectMone')

for (const moneda of monedas) {
    const opt = document.createElement('option');
    opt.setAttribute('value', moneda.id);
    opt.innerHTML = moneda.nombre;
    selectMoneda.appendChild(opt);
    
}

const form = document.querySelector('#inputCalculadora');
const resultDiv = document.querySelector('#result');
const inputMonto = document.querySelector('#inputMonto');
const divMontoInvalido = document.querySelector('#montoInvalido');



form.addEventListener('submit', (event) => {
    event.preventDefault();

    let mont = form.elements[1].value;
    if(mont !== "" && mont !== '0'){
    mont = parseInt(mont);
    const mone = form.elements[0].value;
    const seleccionado = monedas.find(elemento => elemento.id === mone);
    const total = seleccionado.cotizar(mont);
    const comision = seleccionado.calcularComision(total);

    const operacion = new Operacion(seleccionado, mont, total, comision);
    operacion.mostrarResultado();

    inputMonto.classList.remove('is-invalid');
    divMontoInvalido.style.display = 'none';
    }
    else {
        inputMonto.classList.add('is-invalid');
        divMontoInvalido.style.display = 'block';
    }
    

})



