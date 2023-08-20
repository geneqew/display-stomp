const stompClient = new StompJs.Client({
    brokerURL: 'ws://192.168.2.100:8080/display-app'
});

stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/display', (display) => {
        showNewTextDisplay(JSON.parse(display.body).textToDisplay);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function connect() {
    stompClient.activate();
}

function sendNewText() {
    stompClient.publish({
        destination: "/app/display",
        body: JSON.stringify({'newText': $("#name").val()})
    });
}

function showNewTextDisplay(message) {
     $("#display-text").text(message);
}

$(function () {
    connect();
});
