import { useEffect } from 'react';
import Swal from 'sweetalert2';
import CardComponent from '../Card/card';
import AccordionComponent from '../Accordion/accordion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAsync, deleteDataAsync } from '../../Actions/Actions'
import Comments from '../Comments/Comments';


export default function Post() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.blog.users);
  const postData = JSON.parse(localStorage.getItem('post'));
  const user = users.find((user) => user.id === postData.userId); 
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleDelete = () => {
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
        dispatch(deleteDataAsync(postData.id))
        navigate('/');
      }
    });
  };

  if (!users || users.length === 0) {
    return <div className='col-12 text-center mt-5 pt-5 loading'>Loading...</div>
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
      <CardComponent
        className='col-10 my-5 mx-auto my-2 Card'
        title={postData.title}
        body={postData.body}
        id={postData.id}
      />
      <section className='d-flex mx-3 gap-4 align-self-start'>
        <button 
        className='deleteBtn' 
        onClick={() => handleDelete()}
        >
          Delete
        </button>
        <button className='deleteBtn'>
          <Link to='edit'>Edit</Link>
        </button>
      </section>
      <hr />
      <Comments/>
    </div>
  );
}
