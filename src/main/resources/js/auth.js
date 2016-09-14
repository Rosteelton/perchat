$(document).ready(function () {

    $("#auth-button").click(function () {
        $.ajax({
            url: "https://oauth.vk.com/authorize",
            data: {
                client_id: "5622760",
                redirect_uri: "http://www.mydomain.com/",
                display: "page",
                response_type: "token",
                scope: "friends",
                v: "5.53",
                state: "OK"
            }
        });
    });

});


//https://oauth.vk.com/authorize?client_id=5622760&display=page&redirect_uri=http://www.mydomain.com/&scope=friends&response_type=token&v=5.53&state=123456