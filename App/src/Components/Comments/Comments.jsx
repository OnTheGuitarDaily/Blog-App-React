import { useEffect, useState } from "react";
import { fetchData } from "../../API/Services/ApiServices";
import CardComponent from "../Card/card";


export default function Comments(){
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            const postData = JSON.parse(localStorage.getItem('post'));
          try {
            const data = await fetchData(`./posts/${postData.id}/comments`);
            setComments(data);
            console.log(data)
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        };
    
        fetchComments();
      }, []);
    return(
        <>
        <h1 className="mx-3">Comments</h1>
          {comments.map((comment) => 
            (
              <div key={comment.id} className='my-4 mx-auto col-10 d-flex flex-column'>
                <CardComponent 
                className={'col-12'}
                title= {comment.name}
                body= {comment.body}
                />
              <small className='align-self-end'>-By: {comment.email}</small>
              </div>
            ))}
        </>
    )

}