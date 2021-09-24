// Barra de navegación Mobile


document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.navbar-toggler');
  burger.addEventListener('click', () =>{
    $('#navbarNavDropdown').slideToggle();
  })
    
  const links = document.querySelectorAll('.nav-link')

  for(let link of links){
    link.addEventListener('click', () => {
      $('#navbarNavDropdown').hide();
    })
    }

  
  }

  
);

  