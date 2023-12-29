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
import Post from './Components/Post/post';
import Form from './Components/Form/form';
import Error from './Components/Error/Error';
import PostLayout from './Components/layouts/PostLayout';
import PostEdit from './Components/Post/postEdit';
import store from './app/Store.js'
import { Provider } from 'react-redux'


const router = createBrowserRouter(
    createRoutesFromElements(
   
        <Route path='/' element={<RootLayout/>}>
            <Route index element={<List/>}/>
            <Route path='create' element={<Form/>}/>
            <Route path='post/:id' element={<PostLayout />}>
                <Route index element={<Post/>}/>
                <Route path='edit' element={<PostEdit/>}/>
            </Route>
            <Route path='*' element={<Error/>}/>
        </Route>
        
    )
)

export default function App(){
    return (
    <>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
    </>
)
}