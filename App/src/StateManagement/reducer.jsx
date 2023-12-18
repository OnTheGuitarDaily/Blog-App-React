export const ACTIONS = {
    SET_POSTS: 'set_posts',
    SET_USERS: 'set_users',
    SET_COMMENTS: 'set_comments',
    ADD_POST: 'add',
    DELETE_POST: 'delete',
    EDIT_POST: 'edit'
}

export default function reducer(state, action){
    switch(action.type){
        case ACTIONS.SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            }
        case ACTIONS.SET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case ACTIONS.SET_COMMENTS:
            return {
                ...state,
                posts: action.payload,
            }
        case ACTIONS.ADD_POST:
            return{
                ...state,
                posts: [...state.posts, action.payload] 
            }
        case ACTIONS.DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload.id)
            }
        case ACTIONS.EDIT_POST:
            return{
                ...state,
                posts: state.posts.map((post) =>  
                post.id === action.payload.id ? { ...post, body: action.payload.body } : post
                )
            }
        default:
            return state
    }
}