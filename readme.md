# Node Mail sender

This project is destinaded for easy email sending for productive environments.

## Technologies
This is project is built using the following technologies
- NodeJs
- RabbitMQ (can be changed to other AMQP queue manager)


## Installation

move or copy .env.example to .env and change settings according to your environment.

```bash
mv .env.example .env
```
## Running the project

### Running the web api
``` bash
node index.js
```

### Running the consumer
``` bash
node consumer.js
``` 

## Adding email templates
In order to add new email templates, just add a new directory in emails directory named as your template. Like the example below:

/emails/helloworld/html.ejs

/emails/helloworld/subject.ejs


## Contributing
Next steps: Create and configure docker-compose for easier install and run.
## License
[MIT](https://choosealicense.com/licenses/mit/)