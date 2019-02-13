var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
      if (query['checks'] == undefined || query['checks'] < 0)  
    throw Error("Invalid value for checks");
    
   if (query['checkBal'] == undefined || query['checkBal'] != parseInt(query['checkBal']) || parseInt(query['checkBal']) < 0 )  
    throw Error("Invalid value for checking");
    
    if (query['savingsBal'] == undefined || query['savingsBal'] != parseInt(query['savingsBal']) || parseInt(query['savingsBal']) < 0)  
    throw Error("Invalid value for savingsBal");
      
    var result = {};
    if (query['cmd'] == 'CalcCharge')
    {
      result = serviceCharge(query);
      
    }
  

    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function serviceCharge(query)
{
   var checks = 0;
  var numchecks = parseInt(query['checks']);
  var savingsBal = parseInt(query['savingsBal']);;
  var checkBal = parseInt(query['checkBal']);
  var charge = 0.15;
  var fincharge =  numchecks*charge;

  if (checkBal > 999.99 || savingsBal > 1499.99 )
  {
    fincharge = 0;
  }
  else
  {
   fincharge 
  }
  
  var result = {'Charge' : fincharge}; 
  return result;
}




