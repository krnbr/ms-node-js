import express = require('express');
//import Eureka = require("eureka-js-client");
const Eureka = require('eureka-js-client').Eureka;

// Create a new express application instance
const app: express.Application = express();

const PORT = 3000;
const HOST = 'localhost';

const client = new Eureka({
    instance: {
        app: 'ms-node-js',
        hostName: HOST,
        ipAddr: '127.0.0.1',
        vipAddress: 'ms-node-js',
        port: {
            $: PORT,
            '@enabled': 'true',
        },
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
            // this is required, i was trying some random value previously, only allowed are MyOwn, Amazon and Netflix
        },
        registerWithEureka: true,
        fetchRegistry: true,
        statusPageUrl: 'http://'+HOST+':'+PORT+'/info',
        healthCheckUrl: 'http://'+HOST+':'+PORT+'/health',
    },
    eureka: {
        // eureka server host / port
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
    },
});

client.logger.level('debug');
client.start(error => {

    console.log(error || 'NodeJS Eureka Started!');

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/info', function (req, res) {
        res.send({status:'UP'});
    });

    app.get('/health', function (req, res) {
        res.send({status:'UP',health:'PERFECT'});
    });

});

app.listen(3000, function () {
    console.log('micro service listening on port 3000!');
});
