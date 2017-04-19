
    const Service = require('.././models/service')
    const NodeMailer = require('nodemailer');
    
    exports.send = (req,res) => {

        var nombreModel = 'vm';

        Service.findOne({name: nombreModel},(err,response) => {
            if(err){console.log(err)}
            else{
                console.log(response);
                let remitente = req.body.mail
                let telefono = req.body.telefono
                let nombre = req.body.name
                let asunto = req.body.asunto
                let mensaje = req.body.mensaje

                let template =  '<section>'+'<br><h3>Mensaje desde el formulario de contacto!!</h3><br>'+
                                '<h4><b>Remitente: </b>'+nombre+'<br>'+
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
                        res.send(500, error.message);
                    } else {
                        console.log("Email sent");
                        res.status(200).send(info);
                    }
                });
            }
        })
    }   
    