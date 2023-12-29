import { useDispatch } from 'react-redux';
import { addDataAsync , fetchPostsAsync } from '../../Actions/Actions'
import Swal from 'sweetalert2';
import FormComponent from "./formComponent/formcomponent";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Form() {
    const dispatch = useDispatch();
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e, postId, userId) => {
        e.preventDefault();
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
                dispatch(addDataAsync(postId, postBody, postTitle, userId))
                Swal.fire({
                    title: "Posted",
                    text: "Your post was successfully added",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        e.target[0].value = '';
                        e.target[1].value = '';
                       navigate('/')
                    }
                });
            } catch (error) {
                console.error("Error submitting post:", error);
            }
        } else {
            setValidation(true);
        }
    };

    return (
        <>
            <FormComponent 
            handleSubmit={handleSubmit}
            validation={validation}
            />
        </>
    );
}
