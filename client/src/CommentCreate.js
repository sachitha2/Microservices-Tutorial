import React,{useState} from 'react'
import axios from 'axios'
function CommentCreate({postId}) {
    const [content,setContent] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(content);
        await axios.post(`http://posts.com/posts/${postId}/comments`,{content});
        setContent('');
    }
    return (
        <div>
            {/* form to create a comment */}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input className="form-control" type="text" value={content} onChange={e=>setContent(e.target.value)} type="text" name="comment" />
                    <button type="submit" className="btn btn-primary">Add Comment</button>
                </div>
            </form>
        </div>
    )
}

export default CommentCreate
