const stompClient = new StompJs.Client({
  brokerURL: "ws://pi4.local:8080/display-app",
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
  if (message == "DOXOLOGY") {
    document.getElementById("display-text").style.fontSize = "calc(9vw + 9vh)";
  } else if (message == "I am a Member of the Church of Christ") {
    document.getElementById("display-text").style.fontSize = "calc(6vw + 6vh)";
  } else {
    document.getElementById("display-text").style.fontSize =
      "calc(25vw + 15vh)";
  }
  $("#display-text").text(message);
}

$(function () {
  connect();
});
