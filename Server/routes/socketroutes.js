// var userList = require('../modules/userlist');
//
//
// // export function for listening to the socket
// module.exports = function (socket) {
//     console.log('new connection established')
//
//     socket.on('select.run', (data) => {
//         socket.emit('removeRun',
//             {
//                 //TODO
//                 data,
//             }
//         )
//
//         console.log("Work id is " + data);
//     })
//
//     socket.on('disconnect', (data) => {
//         console.log('connection disconnected')
//         userList.leave(data.employeeId);
//     })
// };