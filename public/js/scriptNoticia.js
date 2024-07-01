window.addEventListener('load', function() {
    var elementsToTruncate = [
        { selector: '.descrip-noticia-fijada', func: truncateText, max: 300 },
        { selector: '.descrip-noticia', func: truncateText, max: 200 },
        { selector: 'h2.titulo-noticia-fijada', func: truncateText, max: 55 },
        { selector: 'h3.titulo-noticia', func: truncateText, max: 40 }
    ];

    elementsToTruncate.forEach(function(item) {
        var elements = document.querySelectorAll(item.selector);
        for (var i = 0; i < elements.length; i++) {
            item.func(elements[i], item.max);
        }
    });
});

function truncateText(element, maxCharacters) {
    var content = element.textContent.trim();
    if (content.length > maxCharacters) {
        content = content.slice(0, maxCharacters) + "...";
        element.textContent = content;
    }
}



















