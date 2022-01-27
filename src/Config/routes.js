import Index from '../Pages/Index';
import Post from '../Pages/Post';
import Comment from '../Pages/Comment';



const Routes = [
    { path: "/", name: "index", element: <Index />},
    { path: "/post", name: "post", element: <Post />},
    { path: "/comment", name: "comment", element: <Comment />},
];

export default Routes;

