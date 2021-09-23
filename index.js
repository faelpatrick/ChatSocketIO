//requiriments
const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');

//Routes
app.use('/group1', express.static(path.join(__dirname, 'public')))
app.use('/group2', express.static(path.join(__dirname, 'public')))

const server = app.listen(3000, () => {
    console.log('Running')
})

//create io socket
const io = socketIO(server)

//Groups
const messages = { group1: [], group2: [] };

const group1 = createGroup(messages,'group1');
const group2 = createGroup(messages,'group2');

//function for creat the groups 1 and 2
function createGroup(messages, dir) {

    const group = io.of(dir).on('connection', (socket) => {
        console.log('new connection');
        socket.emit('update_messages', messages[dir])

        socket.on('new_message', (data) => {
            messages[dir].push(data);
            group.emit('update_messages', messages[dir])
        })
    })
}