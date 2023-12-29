import { Outlet } from 'react-router-dom';
import Comments from '../Comments/Comments';


export default function PostLayout(){
    return <div className="PostLayout">
        <Outlet/>
    </div>
}