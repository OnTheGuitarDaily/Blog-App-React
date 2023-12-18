export default function FormComponent({handleSubmit, title, body, validation}){
return (<>
<form className="my-5 p-2 col-12 d-flex flex-column align-items-center justify-content-center gap-4" onSubmit={handleSubmit}>
        <div className="d-flex gap-2 col-12 justify-content-center">
            <label htmlFor="">Title: </label>
            <input className="col-10" type="text" defaultValue={title}/>
        </div>
        <div className="d-flex flex-column gap-2 col-12 p-3 justify-content-center">
            <label htmlFor="">Body: </label>
            <textarea cols="30" rows="10" defaultValue = {body}/>
        </div>
        {validation && <p style={{ color: 'red' }}>Please fill up this form</p>}
        <button className="submitBtn" type='submit'>submit</button>
</form>
</>)

}