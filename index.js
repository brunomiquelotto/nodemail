require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var amqp = require('amqplib/callback_api');

app.use(express.json());

app.post('/templated-email', (req, res) => {
  amqp.connect(process.env.AMQP_HOST, function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = process.env.QUEUE_NAME;
      var msg = JSON.stringify(req.body);
      console.log(msg);
      channel.assertQueue(queue, { durable: false });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
      res.send('queued');
    });
  });
});
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});