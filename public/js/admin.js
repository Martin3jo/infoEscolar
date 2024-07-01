//Despliegue de menu
document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.menu');
    const toggleBtn = document.getElementById('toggleBtn');

    function updateButtonColor() {
        const menuIsOpen = menu.style.width === '250px';
        toggleBtn.style.backgroundColor = menuIsOpen ? '#333' : 'rgb(86 48 221)';
    }

    toggleBtn.addEventListener('click', function () {
        const menuIsOpen = menu.style.width === '250px';
        if (menuIsOpen) {
            menu.style.width = '0';
        } else {
            menu.style.width = '250px';
        }
        updateButtonColor();
    });

    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && event.target !== toggleBtn) {
            menu.style.width = '0';
            updateButtonColor();
        }
    });
});
/*FIN DESPLIEGUE*/