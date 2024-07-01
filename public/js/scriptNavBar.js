document.getElementById("mobile-menu").addEventListener("click", function () {
  var navLinks = document.getElementById("nav-links");
  var menuIcon = document.querySelector(".menu-toggle i");

  if (navLinks.classList.contains("show")) {
    navLinks.classList.remove("show");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  } else {
    navLinks.classList.add("show");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  }
  menuIcon.classList.toggle("rotate-icon"); // Toggle rotate class
});
