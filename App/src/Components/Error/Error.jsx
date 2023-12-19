import { Link } from "react-router-dom"

export default function Error(){
    return <div className="Error col-12 d-flex justy-content-center align-items-center gap-5 flex-column my-5">
        <h2>404 Page Not Found</h2>
        <div className="d-flex gap-2">
        <p>Go to </p>
        <Link to='/'>Home</Link>
        <p> page</p>
        </div>
        
    </div>
}