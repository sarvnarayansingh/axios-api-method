import React, { Component } from 'react';


import Post from '../../Components/Post/Post';
import FullPost from '../../Components/FullPost/FullPost';
import NewPost from '../../Components/NewPost/NewPost';
import './Blog.css';
// import axios from 'axios';
import axios from '../../axios'

class Blog extends Component {
    state = {
         posts:[],
         selectPostId:null,
         error:false
    }

    componentDidMount () {
        axios.get('/posts').then(response => {
            const post2 = response.data.slice(0,4);
            console.log("blog-post", post2)
            const updatedPosts = post2.map(post2 => {
                return {
                    ...post2,
                    Author:'Max'
                }
            })
            this.setState({posts: updatedPosts});

            console.log("blogpost-responsedata",response)
        })
        .catch(error => {
            this.setState({error:true})
            console.log("error",error)
        })
    }
   

     postSelectedHandler=(id) =>{
     this.setState({selectPostId:id})
     
    
     }
     
     

    render () {
        //below the line using bcz link given wrong then grt error then print message something went wrong 
        let posts = <p style= {{textAlign: 'center' }}> something went wrong!</p>
        if (!this.state.error) {
                posts = this.state.posts.map(post1 => {
                return <Post key={post1.id} 
                title={post1.title} 
                Author={post1.Author}
                clicked={() => this.postSelectedHandler(post1.id)}/>
            })
           

        }
       
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id = {this.state.selectPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;