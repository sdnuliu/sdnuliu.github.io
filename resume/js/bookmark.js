function init() {
    var keyMap = [
        [
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'
        ],
        [
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'
        ],
        [
            'z', 'x', 'c', 'v', 'b', 'n', 'm'
        ]
    ];

    var hash = {
        'b': 'baidu.com',
        'q': 'qq.com',
        'z': 'zhihu.com',
        'j': 'jd.com',
        't': 'taobao.com',
        'g': 'google.com',
        'l': 'lol.qq.com',
        'c': 'csdn.net'
    };
    var result = JSON.parse(localStorage.getItem('localSave'));
    if (result !== null) {
        hash = result
    }
    return {keyMap: keyMap, hash: hash};
}

var __ret = init();
var keyMap = __ret.keyMap;
var hash = __ret.hash;

function createImage(i, j, childKbd) {
    var img = document.createElement('img')

    if (hash[keyMap[i][j]]) {
        img.src = 'http://' + hash[keyMap[i][j]] + '/favicon.ico'
    } else {
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    img.onerror = function (errorEvent) {
        errorEvent.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    childKbd.appendChild(img)
}

function createSpan(i, j, childKbd) {
    var chindSpan = document.createElement("span");
    chindSpan.textContent = keyMap[i][j];
    chindSpan.className = 'text'
    childKbd.appendChild(chindSpan);
    return chindSpan;
}

function createButton(i, j, childKbd) {
    var childBtn = document.createElement("button");
    childBtn.id = keyMap[i][j];
    childBtn.textContent = 'Edit';
    childBtn.onclick = function (editClickEvent) {
        console.log(editClickEvent);
        var button = editClickEvent['target']
        var image = button.previousSibling
        console.log(image)
        var hashKey = button['id'];
        var result = prompt('请输入映射网址');
        console.log(result);
        if (result !== null) {
            hash[hashKey] = result;
            image.src = 'http://' + result + '/favicon.ico'
        }
        image.onerror = function (imageErrorEvent) {
            imageErrorEvent.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
        }
        localStorage.setItem('localSave', JSON.stringify(hash));

    };
    childKbd.appendChild(childBtn);
    return childBtn;
}

function setKeyPressListener() {
    document.onkeypress = function (keyPressEvent) {
        var keyValue = hash[keyPressEvent.key];
        console.log(keyValue);
        if (keyValue !== undefined) {
            window.open('https://' + keyValue, '_blank');
        }
    }
}

window.onload = function () {
    var mainDiv = document.getElementById('mainDiv');
    for (var i = 0; i < keyMap.length; i++) {
        var childDiv = document.createElement('div');
        for (var j = 0; j < keyMap[i].length; j++) {
            var childKbd = document.createElement('kbd');
            createSpan(i, j, childKbd);
            createImage(i, j, childKbd);
            createButton(i, j, childKbd);
            childDiv.appendChild(childKbd);
        }
        mainDiv.appendChild(childDiv);
    }

    setKeyPressListener();
};

