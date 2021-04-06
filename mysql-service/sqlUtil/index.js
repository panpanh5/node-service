// 获取客户
const mysql = require('mysql2');
const data = require('../data')
// 创建与数据库的连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'testnode',
    password: '1234'
});

// data.forEach(element => {
//     connection.query('INSERT INTO news (title,content,time) VALUES (?,?,?) ', [element.title, element.content, element.time], (err, result, fields) => {
//         console.log(err, result, fields)

//     })
// });
