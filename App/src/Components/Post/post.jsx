import { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../../StateManagement/context';
import Swal from 'sweetalert2';
import CardComponent from '../Card/card';
import AccordionComponent from '../Accordion/accordion';
import FormComponent from '../Form/formComponent/formcomponent';
import { fetchData } from '../../API/Services/ApiServices';

export default function Post({ deleteBtn }) {
  const { state, deletePost, editPost } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);

  const postData = JSON.parse(localStorage.getItem('post'));
  const user = state.users.find((user) => user.id === postData.userId);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await fetchData(`./posts/${postData.id}/comments`);
        setComments(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postData.id]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = (postId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your post has been deleted.',
          icon: 'success',
        });
        deletePost(postId);
        deleteBtn();
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postId = postData.id
    const postTitle = e.target[0].value;
    const postBody = e.target[1].value;
    if (postTitle && postBody) {
      try {
          Swal.fire({
              title: "Loading...",
              showConfirmButton: false,
              allowOutsideClick: false,
              onBeforeOpen: () => {
                  Swal.showLoading();
              },
          });
          await editPost(postId, postBody, postTitle);

          Swal.fire({
              title: "Edited",
              text: "Your post was successfully Edited",
              icon: "success"
          }).then((result) => {
              if (result.isConfirmed) {
                setIsEditing(!isEditing)
              }
          });
      } catch (error) {
          console.error("Error submitting post:", error);
      }
  }
  }

  return (
    <div className='col-12 p-2 mb-5 d-flex flex-column align-items-center'>
      <AccordionComponent
        user={user}
        name={user.name}
        username={user.username}
        email={user.email}
        city={user.address.city}
        phone={user.phone}
      />
      {isEditing ? (
        <>
          <FormComponent
          title={postData.title}
          body={postData.body}
          handleSubmit ={handleSubmit}
          />
        </>
      ) : (
        <>
        <CardComponent
          className='col-10 my-5 mx-auto my-2 Card'
          title={postData.title}
          body={postData.body}
          id={postData.id}
          key={postData.id}
        />
        <section className='d-flex mx-3 gap-4 align-self-start'>
            <button
              className='deleteBtn'
              onClick={() => handleDelete(postData.id)}
            >
              Delete
            </button>
            <button className='deleteBtn' onClick={handleEdit}>
              Edit
            </button>
        </section>
        </>
      )}
      <hr />
      <h1>Comments</h1>
          {comments.map((comment) => 
            (
              <div className='my-4 col-10 d-flex flex-column'>
                <CardComponent 
                className={'col-12'}
                key = {comment.id}
                title= {comment.name}
                body= {comment.body}
                />
              <small className='align-self-end'>-By: {comment.email}</small>
              </div>
            ))}
    </div>
  );
}
