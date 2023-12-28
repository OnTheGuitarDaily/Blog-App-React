import { useContext } from 'react';
import { TodoContext } from '../../StateManagement/context';
import Swal from 'sweetalert2';
import CardComponent from '../Card/card';
import AccordionComponent from '../Accordion/accordion';
import { Link, useParams, useNavigate } from 'react-router-dom';


export default function Post() {
  const { state, deletePost } = useContext(TodoContext);
  const postData = JSON.parse(localStorage.getItem('post'));
  const user = state.users.find((user) => user.id === postData.userId);
  const navigate = useNavigate();
  const { id } = useParams(postData.id)

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
        navigate('/')
      }
    });
  };


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
            <button className='deleteBtn'>
             <Link to='edit'>Edit</Link>
            </button>
        </section>
      <hr />
    </div>
  );
}
