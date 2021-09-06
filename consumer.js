require('dotenv').config()
var amqp = require('amqplib/callback_api');
const Email = require('email-templates');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({ host: process.env.EMAIL_HOST, port: process.env.EMAIL_PORT, secure: false, auth: null });


const email = new Email({
    message: {
      from: process.env.EMAIL_SENDER
    },
    send: true,
    transport: transporter,
    views: {
        options: {
            extension: 'ejs'
        }
    }
});

amqp.connect(process.env.AMQP_HOST, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = process.env.QUEUE_NAME;

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            var data = JSON.parse(msg.content.toString());
            email.send({
                template: data.template,
                message: { to: data.to },
                locals: data.params
            })
            .then(() => console.log('send-true'))
            .catch((error) => console.log(error));
        }, {
            noAck: true
        });
    });
});