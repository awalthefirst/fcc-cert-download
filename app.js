var fs = require('fs');
var gm = require('gm');
var express = require('express');
var app = express();

app.get('/',function(req,res){
    var height = 1600; 
    var width = 2000;
    var font = 64;
    var frontEnd = __dirname+'/fccFront.jpg';
    var dataVis = __dirname+'/fccDataVis.jpg';
    var backEnd = __dirname+'/fccBack.jpg';
    var cert_type  = req.query.cert_type || frontEnd;
    var cert_name = req.query.cert_name || 'camper name';
    var cert_date = req.query.cert_date || 'December, 4th 2014';
    var cert_link = req.query.cert_link || 'verify this certification at: http://freecodecamp.com/camper Name/back-end-certification';
    
    
     // trigger auto download 
    // res.attachment('free code camp certificate.jpg');
     
    // load image 
    gm(cert_type)
        .fill('black')
        
        // draw users name on image
        .fontSize(font)
        .drawText(startingX(cert_name),750,cert_name)
        
        //draw date of completion on image
        .fontSize(font)
        .drawText((width/2)-220,1054,cert_date)
    
         
        //draw cert validation text
        .fontSize(22)
        .drawText(120,1488,cert_link)
        
        //font family for all text 
        .font(__dirname+'/saxmono.ttf')
        
        .stream()
        .pipe(res);
 
      // dynamicaly calculate x coordinate so that the name on  
      // cert will be centered 
    function startingX(name){
     return (width/2) - ( ((name.length*font)/2)/2 )
    }    
    
})

app.listen(parseInt(process.env.PORT))