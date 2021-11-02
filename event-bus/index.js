const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    console.log(event);
    axios.post('http://posts-clusterip-srv:4000/events', event);
    axios.post('http://comments-srv:4001/events', event);
    axios.post('http://query-srv:4002/events', event);
    axios.post('http://moderation-srv:4003/events', event);//moderation service

    res.send({status:"OK"});
});


app.get('/events',(req, res)=>{
    res.send(events);
});

app.get('/',(req, res)=>{
    res.send("<h1>Helloo from event bus</h1>");
});

app.listen(4005, () => {
    console.log('Listening on 4005');
});