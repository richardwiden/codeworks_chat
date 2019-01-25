let messageBox, chatContainer, messageContainer, lastMessage, lastScrollToAnimationElement;
let ownerName = "richardwiden";
const remoteName = "bot";
const questions = ['How are you?', 'What\'s you name?', 'Where are you from?', '...'];
const answers = [
    {
        regex: /^(?=.*?\bhow\b)(?=.*?\bare\b)(?=.*?\byou\b).*/gmi,
        answer: 'Im fine thank you'
    },
    {
        regex: /^(?=.*?\bwhere\b)(?=.*?\bare\b)(?=.*?\bfrom\b).*/gmi,
        answer: 'I was born in cyberspaced'
    },
    {
        regex: /^(?=.*?\bhello\b).*/gmi,
        answer: 'Well hello to you to'
    }
];

$(function () {
    chatContainer = $('#chat');
    messageContainer = $('#messages');
    messageBox = $('#messageBox');
    setTimeout(submitBotAnswer, 5000);
});

function submitForm() {
    lastMessage = messageBox.val().trim();
    messageBox.val('');
    writeMessage(lastMessage, "richardwiden");
}

function submitBotAnswer() {
    let message = getAnswer(lastMessage) || getRandomQuestion();
    lastMessage = null;
    writeMessage(message, remoteName);
    setTimeout(submitBotAnswer, Math.floor(Math.random() * 5000 + 1000));
}

function getAnswer(lastMessage) {
    if (lastMessage === null || lastMessage === undefined) return null;
    for (let answer of answers)
        if (lastMessage.match(answer.regex)) return answer.answer;
    return null;
}

function getRandomQuestion() {
    return questions[Math.floor(Math.random() * questions.length)];
}

function writeMessage(message, name) {
    let messageClass = name === ownerName ? "local-side" : "remote-side";
    let event = $('<div></div>').addClass(messageClass).addClass('event');
    event.append($('<p></p>').text(message).addClass('message-text'));
    event.append($('<p></p>').text(name).addClass('name'));
    event.hide();
    messageContainer.append(event);
    event.fadeIn(500);
    scrollToElement(event);
}

/**
 * Scrolls to element and stops last animation
 * @param element
 */
function scrollToElement(element) {
    if (lastScrollToAnimationElement) lastScrollToAnimationElement.stop();
    lastScrollToAnimationElement = $('html, body').animate({
        scrollTop: element.offset().top
    }, 1000);
}