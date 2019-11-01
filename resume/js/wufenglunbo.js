let n = 1

init()

setInterval(() => {
    makeLeave(getImage(n)).one('transitionend', (e) => {
        makeEnter($(e.currentTarget))
    })
    makeCurrent(getImage(n + 1))
    n += 1
}, 3000)


function init() {
    $('.images>img:nth-child(' + n + ')').addClass('current')
        .siblings().addClass('enter')
}

function getImage(m) {
    return $('.images>img:nth-child(' + getReal(m) + ')')
}

function getReal(m) {
    if (m > 3) {
        m = m % 3
        if (m === 0) {
            m = 3
        }
    }
    return m
}

function makeLeave(image) {
    return image.removeClass('enter current').addClass('leave')
}

function makeCurrent(image) {
    return image.removeClass('enter leave').addClass('current')
}

function makeEnter(image) {
    return image.removeClass('current leave').addClass('enter')
}