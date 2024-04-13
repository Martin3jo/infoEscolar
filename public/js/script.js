document.addEventListener("DOMContentLoaded", function() {
    var mobileMenu = document.getElementById("mobile-menu");
    var navLinks = document.querySelector(".nav-link");
    var toggleMobileMenu = function() {
      navLinks.classList.toggle("active");
    };
  
    mobileMenu.addEventListener("click", toggleMobileMenu);
  });
  