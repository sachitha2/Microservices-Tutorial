const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

const app = express();

app.use(bodyParser.json());

app.use(cors());

const posts = {};

const handleEvent = (type,data)=>{
    if(type === 'PostCreated'){
        const {id, title} = data;
        posts[id] = {id, title , comments: []};
    }
    if(type === 'CommentCreated'){  
        const {id, content, postId,status} = data;
        posts[postId].comments.push({id, content,status});
    }
    if(type === 'CommentUpdated'){
        const {id, content, postId,status} = data;
        const comment = posts[postId].comments.find(comment => comment.id === id);
        comment.content = content;
        comment.status = status;
    }
}

app.get('/posts', (req, res) => {
    res.json(posts);
})


app.post('/events', (req, res) => {
    const {type,data} = req.body;

    handleEvent(type,data);
    
    res.send({});
});

app.listen(4002,async ()=>{
    console.log('listening on port 4002');

    const res = await axios.get('http://localhost:4005/events');

    res.data.forEach(event => {
        handleEvent(event.type,event.data);
    });
});
