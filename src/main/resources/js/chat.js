//start point
var nameField = document.getElementById('txtLogin');
nameField.value = "Антон";
document.getElementById('btnLogin').onclick = loginIn(nameField.value);

function loginIn(name) {
    if (name.length > 0) {
        document.getElementById('mainModalWindow').style.display = 'none';

        // create connection
        var wsURL = "ws://localhost:9000/chat?name=" + name;
        var socket = new WebSocket(wsURL);

        //socket logic
        socket.onopen = function (event) {
            showMessage("Chat connection was successful!");

            var sendButton = document.getElementById('btn');
            var messageField = document.getElementById('message');

            sendButton.onclick = function () {
                socket.send(messageField.value);
                messageField = ""
            };
            return event;
        };


        socket.onmessage = function (event) {
            showMessage(event.data);
        };

        socket.onerror = function (error) {
            alert("Ошибка " + error.message);
        };

        socket.onclose = function (event) {
            if (event.wasClean) {
                alert('Соединение закрыто чисто');
            } else {
                alert('Обрыв соединения'); // например, "убит" процесс сервера
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
        };

    } else {
        alert('Please write your name!');
    }
}

// отправить сообщение из формы publish
//--------------------------------------
document.forms.publish.onsubmit = function () {
    var outgoingMessage = this.message.value;

    socket.send(outgoingMessage);
    return false;
};

// показать сообщение в div#subscribe
function showMessage(message) {
    var messageElem = document.createElement('div');
    var messageElemBody = document.createElement('div');
    messageElem.className = 'newMessage';
    messageElemBody.className = 'messageBody';
    messageElem.appendChild(document.createTextNode(message));
    messageElemBody.appendChild(messageElem);
    document.getElementById('subscribe').appendChild(messageElemBody);
}


