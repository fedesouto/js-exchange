let id = localStorage.getItem('id');
let userName = localStorage.getItem('nombre');
let funds = localStorage.getItem('funds');
const historial = JSON.parse(localStorage.getItem('operaciones'));
const tablaHistorial = $('#tablaHistorial')

const headingNombre = document.querySelector('#nombre')
headingNombre.innerText = userName;
badgeNombre.innerText = userName.charAt(0)

if(historial.length > 0) {
    let id = 1;
    tablaHistorial.show()
    $('#messageHistorial').text('Conozca su historial de compras.')
    for(operacion of historial) {
    let {comision, total, moneda, monto, subtotal} = operacion;
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <th>${id}</th>
    <td>${moneda.nombre}</td>
    <td>${monto}</td>
    <td>$${moneda.cotizacion}</td>
    <td>$${total}</td>
    `
    id+=1;
    tablaHistorial.append(tr)
    
}}

