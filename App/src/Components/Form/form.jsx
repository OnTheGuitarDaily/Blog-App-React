import { useContext, useState } from "react";
import { TodoContext } from "../../StateManagement/context";
import Swal from 'sweetalert2';
import FormComponent from "./formComponent/formcomponent";


export default function Form({ submit }) {
    const { addPost } = useContext(TodoContext);
    const [validation, setValidation] = useState(false);

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
                await addPost(postBody, postTitle, postId, userId);

                Swal.fire({
                    title: "Posted",
                    text: "Your post was successfully added",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        e.target[0].value = '';
                        e.target[1].value = '';
                        submit();
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
