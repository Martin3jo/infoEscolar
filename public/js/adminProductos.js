document.addEventListener("DOMContentLoaded", function () {
    const coloresSuaves = ["RGBA(220, 180, 171, 0.7)", "RGBA(173, 216, 230, 0.7)", "RGBA(152, 251, 152, 0.7)", "RGBA(240, 192, 203, 0.7)","RGBA(200, 200, 200, 0.7)"];
    
    const productosCajas = document.querySelectorAll('.productos-caja');

    productosCajas.forEach(function (caja, index) {
        const colorIndex = index % coloresSuaves.length;
        caja.style.backgroundColor = coloresSuaves[colorIndex];
    });
});