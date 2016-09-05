main();

function main() {
    var name = document.getElementById('textFieldForName');
    document.getElementById('loginButton').onclick = loginIn(name.value);
}

function loginIn(name) {
    if (name.length > 0) {
        document.getElementById('loginWindow').style.display = 'none';

        // create connection
        var wsURL = "ws://localhost:9000/chat?name=" + name;
        var socket = new WebSocket(wsURL);

        socket.onopen = function () {
            showMessage("Chat connection was successful!");

            var messageField = document.getElementById('textFieldForMessage');
            var sendMessageButton = document.getElementById('sendMessageButton');
            sendMessageButton.onclick = socket.send(messageField.value);
            return false;
        };

        socket.onmessage = function (event) {
            showMessage(event.data);
            return false;
        };

        socket.onclose = function (event) {
            showMessage(event.data + "ушел");
            return false;
        };
    } else {
        alert('Пожалуйста, представьтесь!');
    }
}

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