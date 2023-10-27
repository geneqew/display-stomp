const stompClient = new StompJs.Client({
  brokerURL: "ws://localhost:8080/display-app",
});

stompClient.onConnect = (frame) => {
  console.log("Connected: " + frame);
  stompClient.subscribe("/topic/display", (display) => {
    showNewTextDisplay(JSON.parse(display.body).textToDisplay);
  });
};

stompClient.onWebSocketError = (error) => {
  console.error("Error with websocket", error);
};

stompClient.onStompError = (frame) => {
  console.error("Broker reported error: " + frame.headers["message"]);
  console.error("Additional details: " + frame.body);
};

function connect() {
  stompClient.activate();
}

function sendNewText() {
  stompClient.publish({
    destination: "/app/display",
    body: JSON.stringify({ newText: $("#name").val() }),
  });
}

function showNewTextDisplay(message) {
  if (message.length > 3) {
    document.getElementById("display-text").style.fontSize = "15vw";
  } else {
    document.getElementById("display-text").style.fontSize = "40vw";
  }
  $("#display-text").text(message);
}

$(function () {
  connect();
});
