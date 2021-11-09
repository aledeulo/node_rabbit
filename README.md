#1- Install nodeJs
####https://nodejs.org/en/download/

#2- Clone repo
```shell
git clone https://github.com/aledeulo/node_rabbit.git
```

#3- Pull and run rabbitmq image using docker compose in detach mode
### Positioned in /node_rabbit folder
### Edit /node_rabbit/docker-compose.yml if you want to add more details for rabbitmq
####Note: /node_rabbit/docker-compose.yml contains rabbitmq installation only, you can add the app too
```shell
docker-compose up -d
```

#4- Start the application
###4.1- Positioned in /node_rabbit folder
####You can configure `run` script to set your own env vars. Leave as it is for default config
###4.2 Set permissions `chmod 775 run`
```shell
./run
```

#5- Send POST request to the app to publish messages in the queue
```shell
curl --location --request POST 'http://localhost:3000/endpoint' \
--header 'Content-Type: application/json' \
--data-raw '{
    "date": "2021-10-15"
}'
```
