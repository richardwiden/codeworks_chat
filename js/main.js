let messageBox, chatContainer, messageContainer, lastMessage, lastScrollToAnimationElement;
let ownerName = "richardwiden";
const remoteName = "bot";
const questions = ['How are you?', 'What\'s you name?', 'Where are you from?'];
const answers = [
    {
        regex: /^(?=.*?\bhow\b)(?=.*?\bare\b)(?=.*?\byou\b).*/gmi,
        answer: 'Im fine thank you'
    },
    {
        regex: /^(?=.*?\bwhere\b)(?=.*?\bare\b)(?=.*?\bfrom\b).*/gmi,
        answer: 'I was born in cyberspace'
    }
];

$(function () {
    chatContainer = $('#chat');
    messageContainer = $('#messages');
    messageBox = $('#messageBox');
    setTimeout(submitAnswer, 5000);
    console.log(JSON.stringify(answers));
});

function submitForm() {
    lastMessage = messageBox.val().trim();
    messageBox.val('');
    writeMessage(lastMessage, "richardwiden");
}

function submitAnswer() {
    let answer = getAnswer(lastMessage);
    lastMessage = null;
    let message = answer || getRandomQuestion();

    writeMessage(message, remoteName);
    setTimeout(submitAnswer, Math.floor(Math.random() * 5000 + 1));
}

function getAnswer() {
    if (lastMessage === null || lastMessage === undefined) return null;
    console.log('Finding answersfor:' + lastMessage);
    for (let answer of answers)
        if (lastMessage.match(answer.regex)) {
            console.log('Found answer:' + JSON.stringify(answer));
            return answer.answer;
        }
    console.log('Found no answer');
    return null;
}


function getRandomQuestion() {
    return questions[Math.floor(Math.random() * questions.length)];
}


function writeMessage(message, name) {
    let messageClass = name === ownerName ? "local-side" : "remote-side";
    let event = $('<div></div>').addClass(messageClass).addClass('event')
    event.append($('<p></p>').text(message));
    event.append($('<p></p>').text(name).addClass('name'));
    event.hide();
    messageContainer.append(event);
    event.fadeIn(500);
    scrollToElement(event);
}

function scrollToElement(element) {
    if (lastScrollToAnimationElement) lastScrollToAnimationElement.stop();
    lastScrollToAnimationElement = $('html, body').animate({
        scrollTop: element.offset().top
    }, 1000);
}