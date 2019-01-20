let messageBox, chatContainer;
let ownerName = "richardwiden";
let remoteName = "bot";

$(function () {
    console.log("ready!");
    chatContainer = $('#chat');
    messageBox = $('#messageBox');
});

function submitForm() {
    let message = messageBox.val();
    console.log(message);

    sendMessage(message, "richardwiden");
}

function sendMessage(message, name) {
    let messageClass = name === ownerName ? "local-side" : "remote-side";
    let chatbox = $('<div></div>').addClass(messageClass).addClass('chatbox')
    chatContainer.append(chatbox);
}