const fs = require('fs');
const Service = require('.././models/service');

function template(name){
    return controller = `
    const Service = require('.././models/service')
    const NodeMailer = require('nodemailer');
    
    exports.send = (req,res) => {

        var nombreModel = '${name}';

        Service.find({name: nombreModel},(err,response) => {
            if(err){console.log(err)}
            else{
                let remitente = req.body.mail
                let telefono = req.body.telefono
                let nombre = req.body.name
                let asunto = req.body.asunto
                let mensaje = req.body.mensaje

                let template =  '<section>'+'<br><h3>Mensaje desde el formulario de contacto!!</h3><br>'+
                                '<h4><b>Remitente: </b>'+nombre+' < '+remitente+ '> </h4>'+
                                '<h4><b>Telefono: </b>'+telefono+'</h4>'+
                                '<h4><b>Asunto: </b>'+asunto+'</h4>'+
                                '<h4><b>Mensaje:</b></h4>'+
                                '<hr>'+
                                '<h4>'+mensaje+'</h4>'+
                                '</section>';


                let mailOptions = {
                    from: 'servicio de correos',
                    to: response.to,
                    subject: 'Formulario de contacto web',
                    html: template
                };

                let smtpConfig = {
                    host: 'mail.dowhile.cl',
                    port: 587,
                    tls: {
                        rejectUnauthorized:false
                    },
                    secure: false, // upgrade later with STARTTLS
                    auth: {
                        user: 'info@dowhile.cl',
                        pass: 'd0wh1l3' 
                    }
                };

                let transporter = NodeMailer.createTransport(smtpConfig);

                transporter.sendMail(mailOptions, function(error, info){
                    if (error){
                        console.log(error);
                        res.status(500).json({error:error});
                    } else {
                        console.log("Email sent");
                        res.status(200).json(info);
                    }
                });
            }
        })
    }   
    `
}

function createController(name){
    fs.writeFile(`./controllersService/${name}.js`,template(name),function(error){
        if (error)
            console.log(error);
        else
            console.log(`create controller .............. ok`);
    });
}


function createRouts(name){
    fs.appendFileSync('./routes/public.js', `router.post('/${name}', controllerService.${name}.send); \n`);
}

exports.create = (req,res) => {
    var n = req.body.name;

    createController(n);
    createRouts(n);

    let servicio = new Service({
        name: n,
        to: req.body.to
    })

    servicio.save((err,response) => {
        if(err){console.log(err)}
        else {
            res.status(200).json(response)
        }
    })
}