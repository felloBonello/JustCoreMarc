var userList = require('../modules/userlist');


// export function for listening to the socket
module.exports = function (socket) {
    io.on( 'connection', function ( socket )
    {
        console.log('new connection established')
        io.emit('updateFlag');
        io.on('select.run', (data) => {
            io.broadcast.emit('remove.run',
                {
                    //TODO
                }
            )
        })

        io.on('disconnect', (data) => {
            console.log('connection disconnected')
        })
    })
};