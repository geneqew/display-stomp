const stompClient = new StompJs.Client({
  brokerURL: "ws://pi4.local:8080/display-app",
});
// pi4.local

stompClient.onConnect = (frame) => {
  setConnected(true);
  console.log("Connected: " + frame);
  stompClient.subscribe("/topic/display", (greeting) => {
    showGreeting(JSON.parse(greeting.body).textToDisplay);
  });
};

stompClient.onWebSocketError = (error) => {
  console.error("Error with websocket", error);
};

stompClient.onStompError = (frame) => {
  console.error("Broker reported error: " + frame.headers["message"]);
  console.error("Additional details: " + frame.body);
};

function setConnected(connected) {
  $("#connect").prop("disabled", connected);
  $("#disconnect").prop("disabled", !connected);
  if (connected) {
    $("#conversation").show();
  } else {
    $("#conversation").hide();
  }
  $("#greetings").html("");
}

function connect() {
  stompClient.activate();
}

function disconnect() {
  stompClient.deactivate();
  setConnected(false);
  console.log("Disconnected");
}

function sendName() {
  stompClient.publish({
    destination: "/app/display",
    body: JSON.stringify({newText: $("#name").val()}),
  });
  console.log(JSON.stringify({newText: $("#name").val()}));
}

function reshow(boxName) {
  stompClient.publish({
    destination: "/app/display",
    body: JSON.stringify({newText: $(`#${boxName}`).text()}),
  });
}

function clearScreen() {
  stompClient.publish({
    destination: "/app/display",
    body: "\{\"newText\":\"\"\}"
  });
  $("#name").val("");
  $("#name").focus();
}

let reshowNum = 0;

function showGreeting(message) {
  $("#displayed").append(
    '<tr><td id="rename' +
    reshowNum +
    '">' +
    message +
    '</td> <td><button class="btn btn-lg btn-dark" onclick="reshow(\'rename' +
    reshowNum +
    "\')\">Reshow</button></td> </tr>"
  );
  reshowNum += 1;
}

// const numList = [];

function addToList() {
//   numList.push($("#name").val())
}

function removeFromList(n) {
//   numList.splice(n, 1);
}

$(function () {
  connect();
  $("form").on("submit", (e) => e.preventDefault());
  $("#connect").click(() => connect());
  $("#disconnect").click(() => disconnect());
  $("#send").click(() => sendName());
});
