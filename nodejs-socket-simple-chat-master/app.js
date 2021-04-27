var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

/*监听端口*/
server.listen(3000, function () {
    console.log('listening port: 3000')
});

/*设置静态资源目录*/
app.use('/static', express.static('static'));

/*默认路由*/
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});


var connectionList = {}; //存储当前连接信息
users = [];
groups = [];
usocket = [];
/*客户端建立连接*/
io.sockets.on('connection', function (socket) {
	console.log("刚进查看"+socket);
    var socketId = socket.id;
	//console.log(socketId+"11111");
	
    /*客户端连接时，保存socketId和用户名*/
    connectionList[socketId] = {
        socket: socket
    };
	
    /* 用户进入聊天室，向其他用户广播其用户名*/
    socket.on('join', function (data) {
		
		var flag = 0;
		for(var u =0;u<users.length;u++){
			if(data.isDoc==1){
				if(users[u].userId==data.docId){
					flag = 1;
					break;
				}
			}else{
				if(users[u].userId==data.username){
					flag = 1;
					break;
				}
			}
		}
		if(data.isDoc==0){//会员进入
			//判断医生是否在线
			for(var g =0;g<groups.length;g++){
				if(groups[g].docId==data.docId){//医生在线
				console.log(data.docId+"000000000000000000000");
					if(groups[g].openId==data.username){//正在聊天
					console.log(data.username+"---------------------");
						//socket.broadcast.emit('broadcast_join', data);
						
					}else{
						socket.broadcast.emit('broadcast_quit', {
						username: data.username
					});
					}
				}else {//医生不在线
					
				}
			}
		}
		if(flag == 0) {
			date = new Date(),
			//console.log(data.username + ' join, IP: ' + socket.client.conn.remoteAddress);
			connectionList[socketId].username = data.username;
			var nodeUser = new Object(); //用户对象
			console.log(data.isDoc+"is doc");
			if(data.isDoc==1){//医生登录
				nodeUser.userId = data.docId;;			//医生id
				usocket[data.docId] = socket;
				console.log("doc socket"+usocket[data.docId]);
			}else{
				nodeUser.userId = data.username;;			//用户id
				usocket[data.username] = socket;
				console.log("user socket"+usocket[data.username]);
			}
			nodeUser.joinTime = date,
			nodeUser.socketId = socketId;		//socketID
			nodeUser.isDoc=data.isDoc;
			users.push(nodeUser);	     //数组中添加对象nodeUser
			var groupUser = new Object(); //用户对象
			if(data.isDoc==1){//医生登录
				groupUser.openId = data.username;
				groupUser.docId = data.docId;
				groups.push(groupUser);
			}
			//socket.broadcast.emit('broadcast_join', data);
		}
    });

    /*用户离开聊天室，向其他用户广播其离开*/
    socket.on('disconnect', function () {
        if (connectionList[socketId].username) {
            console.log(connectionList[socketId].username + ' quit');
			 var len  = users.length;
			if(len > 0) {

					 var ss = delSocketData(connectionList[socketId], len);
					
					 console.log("user 删除后的长度: " + ss.length);
			}
			
			 console.log("清理后users 对象个数: " + users.length);

            for (var i=0; i< users.length; i++) {
				console.info("清理后users 对象信息 " + "userId :" + users[i].userId + "  socketId: " +  users[i].socketId);       

             }
		  /**

			   获取需要删除的用户信息

		  */

		  function delSocketData(socketid, usersLen) {

			var indexF ;

			   for(var i=0,n=0; i<usersLen; i++){

					if(users[i].socketId == socketid){
						indexF = i;
						 break;
						 var gg = delGroupData(users[i].userId);
						 console.log("=---=-="+gg.length);
					}

				}

			//删除指定的数据里面的对象，再重新复制给users

			users = users.slice(0,indexF).concat(users.slice(indexF+1,users.length));;
			return users;

		  }
		  
		  /**

			   获取需要删除的用户信息

		  */

		  function delGroupData(docId) {

			var indexg ;

			   for(var j=0; j<groups.length; j++){

					if(groups[j].docId == docId){
						indexg = j;
						 break;
					}

				}

			//删除指定的数据里面的对象，再重新复制给users

			groups = groups.slice(0,indexg).concat(groups.slice(indexg+1,groups.length));;
			return groups;

		  }
		
            socket.broadcast.emit('broadcast_quit', {
                username: connectionList[socketId].username
            });
        }
        delete connectionList[socketId];
    });

	
	 //私聊：服务器接受到私聊信息，发送给目标用户  
    /*socket.on('private_message', function (from,to,msg)  
    {  
        var target = usocket[to];  
        if(target)  
        {  
            console.log('emitting private message by ', from, ' say to ',to, msg);  
            target.emit("pmsg",from,to,msg);  
        }  
    });*/  
	
    //私聊：服务器接受到私聊信息，发送给目标用户  
    socket.on('say', function (data) {
        //console.log("Received Message: " + data.text);
		//console.log("Received people: " + data.to);
		//console.log("from people: " + data.userfrom);
		 var target = usocket[data.to];  
		 console.log(target+"target");
			if(target)  
			{  
				console.log('emitting private message by ', data.userfrom, ' say to ',data.to, data.text);  
				target.emit("pmsg",data.userfrom,data.to,data.text);  
			}else{
				//存库里，发通知给医生	
			}  
    });
	
});