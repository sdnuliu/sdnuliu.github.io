var n = 0;
var allImages = $('#images >img')
var allButtons = $('#buttons >span')

function show() {
    var p = (n % allImages.length) * -1125;
    activeButton(n % allImages.length);
    n += 1;
    $('#images').css({
        transform: 'translate(' + p + 'px)'
    })
}

var timeId = setTimer();

function setTimer() {
    return setInterval(
        show, 1500
    );
}


function activeButton(p) {
    $(allButtons.eq(p)).addClass('red').siblings('.red').removeClass('red')
}

for (var i = 0; i < allButtons.length; i++) {
    $(allButtons[i]).on('click', function (x) {
        clearInterval(timeId);
        n = $(x.currentTarget).index();
        show();
        timeId = setTimer();
    })
}