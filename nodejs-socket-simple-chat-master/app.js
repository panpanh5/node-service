var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

/*�����˿�*/
server.listen(3000, function () {
    console.log('listening port: 3000')
});

/*���þ�̬��ԴĿ¼*/
app.use('/static', express.static('static'));

/*Ĭ��·��*/
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});


var connectionList = {}; //�洢��ǰ������Ϣ
users = [];
groups = [];
usocket = [];
/*�ͻ��˽�������*/
io.sockets.on('connection', function (socket) {
    console.log("�ս��鿴" + socket);
    var socketId = socket.id;
    //console.log(socketId+"11111");

    /*�ͻ�������ʱ������socketId���û���*/
    connectionList[socketId] = {
        socket: socket
    };

    /* �û����������ң��������û��㲥���û���*/
    socket.on('join', function (data) {

        var flag = 0;
        for (var u = 0; u < users.length; u++) {
            if (data.isDoc == 1) {
                if (users[u].userId == data.docId) {
                    flag = 1;
                    break;
                }
            } else {
                if (users[u].userId == data.username) {
                    flag = 1;
                    break;
                }
            }
        }
        if (data.isDoc == 0) {//��Ա����
            //�ж�ҽ���Ƿ�����
            for (var g = 0; g < groups.length; g++) {
                if (groups[g].docId == data.docId) {//ҽ������
                    console.log(data.docId + "000000000000000000000");
                    if (groups[g].openId == data.username) {//��������
                        console.log(data.username + "---------------------");
                        //socket.broadcast.emit('broadcast_join', data);

                    } else {
                        socket.broadcast.emit('broadcast_quit', {
                            username: data.username
                        });
                    }
                } else {//ҽ��������

                }
            }
        }
        if (flag == 0) {
            date = new Date(),
                //console.log(data.username + ' join, IP: ' + socket.client.conn.remoteAddress);
                connectionList[socketId].username = data.username;
            var nodeUser = new Object(); //�û�����
            console.log(data.isDoc + "is doc");
            if (data.isDoc == 1) {//ҽ����¼
                nodeUser.userId = data.docId;;			//ҽ��id
                usocket[data.docId] = socket;
                console.log("doc socket" + usocket[data.docId]);
            } else {
                nodeUser.userId = data.username;;			//�û�id
                usocket[data.username] = socket;
                console.log("user socket" + usocket[data.username]);
            }
            nodeUser.joinTime = date,
                nodeUser.socketId = socketId;		//socketID
            nodeUser.isDoc = data.isDoc;
            users.push(nodeUser);	     //���������Ӷ���nodeUser
            var groupUser = new Object(); //�û�����
            if (data.isDoc == 1) {//ҽ����¼
                groupUser.openId = data.username;
                groupUser.docId = data.docId;
                groups.push(groupUser);
            }
            //socket.broadcast.emit('broadcast_join', data);
        }
    });

    /*�û��뿪�����ң��������û��㲥���뿪*/
    socket.on('disconnect', function () {
        if (connectionList[socketId].username) {
            console.log(connectionList[socketId].username + ' quit');
            var len = users.length;
            if (len > 0) {

                var ss = delSocketData(connectionList[socketId], len);

                console.log("user ɾ����ĳ���: " + ss.length);
            }

            console.log("������users �������: " + users.length);

            for (var i = 0; i < users.length; i++) {
                console.info("������users ������Ϣ " + "userId :" + users[i].userId + "  socketId: " + users[i].socketId);

            }
            /**
  
                 ��ȡ��Ҫɾ�����û���Ϣ
  
            */

            function delSocketData(socketid, usersLen) {

                var indexF;

                for (var i = 0, n = 0; i < usersLen; i++) {

                    if (users[i].socketId == socketid) {
                        indexF = i;
                        break;
                        var gg = delGroupData(users[i].userId);
                        console.log("=---=-=" + gg.length);
                    }

                }

                //ɾ��ָ������������Ķ��������¸��Ƹ�users

                users = users.slice(0, indexF).concat(users.slice(indexF + 1, users.length));;
                return users;

            }

            /**
  
                 ��ȡ��Ҫɾ�����û���Ϣ
  
            */

            function delGroupData(docId) {

                var indexg;

                for (var j = 0; j < groups.length; j++) {

                    if (groups[j].docId == docId) {
                        indexg = j;
                        break;
                    }

                }

                //ɾ��ָ������������Ķ��������¸��Ƹ�users

                groups = groups.slice(0, indexg).concat(groups.slice(indexg + 1, groups.length));;
                return groups;

            }

            socket.broadcast.emit('broadcast_quit', {
                username: connectionList[socketId].username
            });
        }
        delete connectionList[socketId];
    });


    //˽�ģ����������ܵ�˽����Ϣ�����͸�Ŀ���û�  
    /*socket.on('private_message', function (from,to,msg)  
    {  
        var target = usocket[to];  
        if(target)  
        {  
            console.log('emitting private message by ', from, ' say to ',to, msg);  
            target.emit("pmsg",from,to,msg);  
        }  
    });*/

    //˽�ģ����������ܵ�˽����Ϣ�����͸�Ŀ���û�  
    socket.on('say', function (data) {
        //console.log("Received Message: " + data.text);
        //console.log("Received people: " + data.to);
        //console.log("from people: " + data.userfrom);
        var target = usocket[data.to];
        console.log(target + "target");
        if (target) {
            console.log('emitting private message by ', data.userfrom, ' say to ', data.to, data.text);
            target.emit("pmsg", data.userfrom, data.to, data.text);
        } else {
            //������֪ͨ��ҽ��	
        }
    });

});