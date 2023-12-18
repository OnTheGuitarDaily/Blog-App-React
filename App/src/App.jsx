import {
    createBrowserRouter,
    createRoutesFromElements,
    Route, 
    RouterProvider,
} from 'react-router-dom'
import RootLayout from './Components/layouts/RootLayouts'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import List from './Components/List/list';
import PostProvider from "./StateManagement/context";
import Post from './Components/Post/post';
import Form from './Components/Form/form';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout/>}>
            <Route index element={<List/>}/>
            <Route path='create' element={<Form/>}/>
            <Route path='post' element={<Post/>}/>
        </Route>
    )
)

export default function App(){
    return (
    <>
    <PostProvider>
        <RouterProvider router={router}/>
    </PostProvider>
    </>
)
}