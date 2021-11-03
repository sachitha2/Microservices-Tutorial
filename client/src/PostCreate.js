import React,{useState} from "react";
import axios from 'axios';
export default () => {
    const [title,setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://posts.com/posts/create',{
            title: title
        });

        setTitle('');

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input value={title} type="text" onChange={e=>setTitle(e.target.value)} className="form-control" id="title" placeholder="Title" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
    }