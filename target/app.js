"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
//import Eureka = require("eureka-js-client");
var Eureka = require('eureka-js-client').Eureka;
// Create a new express application instance
var app = express();
var PORT = 3000;
var HOST = 'localhost';
var IS_STANDALONE = true;
var client = new Eureka({
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
        },
        registerWithEureka: true,
        fetchRegistry: true,
        statusPageUrl: 'http://' + HOST + ':' + PORT + '/info',
        healthCheckUrl: 'http://' + HOST + ':' + PORT + '/health',
    },
    eureka: {
        // eureka server host / port
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
    },
});
client.logger.level('debug');
if (!IS_STANDALONE) {
    client.start(function (error) {
        console.log(error || 'NodeJS Eureka Started!');
        app.get('/info', function (req, res) {
            res.send({ status: 'UP' });
        });
        app.get('/health', function (req, res) {
            res.send({ status: 'UP', health: 'PERFECT' });
        });
    });
}
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('micro service listening on port 3000!');
});
//# sourceMappingURL=app.js.map