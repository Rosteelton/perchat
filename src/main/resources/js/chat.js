var socket=null;

function loginIn() {
    var name = document.getElementById('txtLogin').value;
    if (name.length > 0) {
        document.getElementById('mainModalWindow').style.display = 'none';

        // создать подключение
        //--------------------------------------

        var wsURL = "ws://localhost:9000/chat?name=" + name;
        alert(wsURL);
            socket = new WebSocket(wsURL);

        // ------- коллбэки --------
        socket.onopen = function () {
            alert("Соединение установлено.");
        };

        socket.onclose = function (event) {
            if (event.wasClean) {
                alert('Соединение закрыто чисто');
            } else {
                alert('Обрыв соединения'); // например, "убит" процесс сервера
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
        };

        
        
        
        socket.onmessage = function (event) {
            showMessage(event.data);

            //alert("Получены данные " + event.data);
        };

        socket.onerror = function (error) {
            alert("Ошибка " + error.message);
        };
        // -----------------------
        //--------------------------------------
        
        
        
        
    } else {
        alert('Вы не ввели логин!');
    }
}

//start point
document.getElementById('btnLogin').onclick = loginIn;

// отправить сообщение из формы publish
//--------------------------------------
document.forms.publish.onsubmit = function () {
    var outgoingMessage = this.message.value;

    socket.send(outgoingMessage);
    return false;
};

// обработчик входящих сообщений
socket.onmessage = function (event) {
    var incomingMessage = event.data;
    showMessage(incomingMessage);
};

// показать сообщение в div#subscribe
function showMessage(message) {
    var messageElem = document.createElement('div');
    var messageElemBody = document.createElement('div');

    // message = document.getElementById('message').value;
    messageElem.className = 'newMessage';
    messageElemBody.className = 'messageBody';

    messageElem.appendChild(document.createTextNode(message));
    messageElemBody.appendChild(messageElem);
    document.getElementById('subscribe').appendChild(messageElemBody);
}

document.getElementById('btn').onclick = showMessage;
