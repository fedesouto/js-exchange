// Barra de navegación Mobile


document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.navbar-toggler');
  burger.addEventListener('click', () =>{
    $('#navbarNavDropdown').slideToggle();
  })
    
  divisasLink.addEventListener('click', () => {
      $('#navbarNavDropdown').hide();
    })
    }  
);

// Dropdown Mi cuenta

const accountDropdown = document.getElementById('accountDropdown')

accountDropdown.addEventListener('click', () => {
  $('#accountSubMenu').slideToggle();
})
  