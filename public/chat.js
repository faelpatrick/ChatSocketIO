//Create rom and io
const room = window.location.pathname.replace(/\//g, '')
const socket = io(`https://chat-socket-io-phi.vercel.app/${room}`);

//create a null user
let user = null;

socket.on('update_messages', (messages) => {
    updateMessagesOnScreen(messages);
})

function updateMessagesOnScreen(messages) {
    const div_messages = document.querySelector('#messages');

    let list_messages = '<ul>'
    messages.forEach(message => {
        list_messages += `<li><strong>${message.user}:</strong> ${message.msg}</li>`
    })
    list_messages += '</ul>';

    div_messages.innerHTML = list_messages;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please define a user!')
            return;
        }

        const message = document.forms['message_form_name']['msg'].value;
        document.forms['message_form_name']['msg'].value = '';

        socket.emit('new_message', { user: user, msg: message })
    })

    const userForm = document.querySelector('#user_form');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        user = document.forms['user_form_name']['user'].value;
        userForm.parentNode.removeChild(userForm)
    })
})
