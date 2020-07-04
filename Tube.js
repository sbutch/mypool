const net = require('net');

var coin = "Tube";

function Tube(req,log) {
  var self = this;
  this.host = req.host;
  this.state = 'orange';
  this.hash = '0/0';
  this.job = null; this.submit = null;


  log({host:self.host, color:'#F8516A',msg:'tessssssssssssssssst'});

  var wallet = req.wallet;
  var client = new net.Socket();
  client.on('data', function(data) {
    data = JSON.parse(data);
    if(data.result) {
      if(data.result.status == 'OK') {
        var t = self.hash.split('/'); 
        if(Number(t[1]) < Number(t[0])) self.hash = t[0]+'/'+(Number(t[1])+1)
      }
      if(data.result.job) myjob(data.result.job)
    }
    if(data.method == 'job') myjob(data.params)
  })
  client.on('close', function() {
    self.state = 'red';
    self.job = null; self.submit = null;
    log({host:self.host, color:'#F8516A',msg:'client close'});
    setTimeout(function() { self.reconnect() }, 60000);
  })
  client.on('error', function() {
    self.state = 'red';
    self.job = null; self.submit = null;
    log({host:self.host, color:'re#F8516Ad',msg:'client error'})
  })

  this.connect = function() {
    return new Promise((resolve, reject) => {
      var addr = self.host.split(':')[0]; var port = Number(self.host.split(':')[1]);
      client.connect(port, addr, function() {
        var data = { method:"login", params:{login:wallet, pass:"x", rigid:"", agent:"NodeMiner" }, id:1 };
        client.write(JSON.stringify(data)+String.fromCharCode(10),'ascii')
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

  this.mysubmit = function(req,yellow_pools) {
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
    res => { log({host:self.host, color:'#8ED76C',msg:'client connect'}) },
    err => { log({host:self.host, color:'#F8516A',msg:'client connect error'}) }
  )
}

module.exports = Tube;
module.exports.coin = coin;
