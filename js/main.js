let messageBox, chatContainer, messageContainer;
let ownerName = "richardwiden";
let remoteName = "bot";
let lastScrollToAnimationElement;
$(function () {
    console.log("ready!");
    chatContainer = $('#chat');
    messageContainer = $('#messages');
    messageBox = $('#messageBox');
});

function submitForm() {
    let message = messageBox.val();
    console.log(message);
    writeMessage(message, "richardwiden");
}

function writeMessage(message, name) {
    let messageClass = name === ownerName ? "local-side" : "remote-side";
    let chatbox = $('<div></div>').addClass(messageClass).addClass('chatbox')
    chatbox.append($('<p></p>').text(message));
    chatbox.append($('<p></p>').text(name).addClass('name'));
    messageContainer.append(chatbox);
    chatbox.fadeIn('slow');
    scrollToElement(chatbox);
}

function scrollToElement(element){
    if(lastScrollToAnimationElement) lastScrollToAnimationElement.stop();
    lastScrollToAnimationElement= $('html, body').animate({
        scrollTop: element.offset().top
    }, 1000);
}