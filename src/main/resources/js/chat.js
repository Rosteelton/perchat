var host = "localhost";
var port = "8080";

main();

function parseMessageForPrint(msg) {
    var chatMessage = JSON.parse(msg);
    if (chatMessage.sender == "SYSTEM")
        return chatMessage.message;
    else
        return chatMessage.sender + ":" + chatMessage.message;
}

function main() {
    var nameField = document.getElementById('textFieldForName');
    document.getElementById('loginButton').onclick = loginIn.bind(null, nameField);
}

function loginIn(element) {
    var name = element.value;
    if (name.length > 0) {
        document.getElementById('loginWindow').style.display = 'none';
        // create connection
        var wsURL = "ws://" + host + ":" + port + "/chat?name=" + name;
        var socket = new WebSocket(wsURL);

        socket.onopen = function () {
            showMessage("Chat connection was successful!");
            var messageField = document.getElementById('textFieldForMessage');
            var sendMessageButton = document.getElementById('sendMessageButton');

            sendMessageButton.onclick = function () {
                var message = messageField.value;
                messageField.value = "";
                return socket.send(message);
            };
            return false;
        };

        socket.onmessage = function (event) {
            showMessage(parseMessageForPrint(event.data));
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