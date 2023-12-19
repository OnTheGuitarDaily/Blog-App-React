import Swal from 'sweetalert2';
import { useContext } from 'react';
import { TodoContext } from '../../StateManagement/context';
import FormComponent from '../Form/formComponent/formcomponent';
import { useNavigate } from 'react-router-dom';

export default function PostEdit(){
    const postData = JSON.parse(localStorage.getItem('post'));
    const { editPost } = useContext(TodoContext);
    const navigate = useNavigate();
    
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
                    navigate('/')
                  }
              });
          } catch (error) {
              console.error("Error submitting post:", error);
          }
      }
      }
    return(
        <>
          <FormComponent
          title={postData.title}
          body={postData.body}
          handleSubmit ={handleSubmit}
          />
        </>
    )
}