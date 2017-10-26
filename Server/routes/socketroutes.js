var userList = require('../modules/userlist');


// export function for listening to the socket
module.exports = function (socket) {
    console.log('new connection established')

    socket.on('select.run', (data) => {
        socket.broadcast.emit('remove.run',
            {
                //TODO
            }
        )
    })

    socket.on('disconnect', (data) => {
        userList.leave(data.employeeId);
    })
};