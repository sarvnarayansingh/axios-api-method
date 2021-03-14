
import React, { Component } from 'react';

import './FullPost.css';
// import axios from 'axios';
import axios from '../../axios'


class FullPost extends Component {
    state = {
        loadedPost:null
    }

     componentDidUpdate () {
         if(this.props.id) {
             //below the line using bcz network request is get  one time ,if not using this line then network request is get infinite time
             if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
              
                axios.get( '/posts/' + this.props.id)
                 .then(response => { 
                    console.log("fullpost-id ",this.props.id);
                      this.setState({loadedPost:response.data});
                     console.log("fullpost-lodadepost",this.state.loadedPost);
                 }); 
                 
            }
          
        }
    }
    deleteDataHandler = () => {
        axios.delete('/posts/' + this.props.id)
        .then(response => {
            console.log("deletepost",response)
        })
    }

        render () {
            let post = <p style={{textAlign:'center'}} >Please select a Post!</p>;
             if(this.props.id) {
                 post=<p style={{textAlign:'center'}} >Loading...</p>;
             }
            if(this.state.loadedPost) {
                
                    post = (
                    <div className="FullPost">
                        {/* body and title comes from NewPost.js component */}
                        <h1>{this.state.loadedPost.title}</h1>
                        <p>{this.state.loadedPost.body}</p>
                        <div className="Edit">
                            <button className="Delete" onClick={this.deleteDataHandler}>Delete</button>
                        </div>
                    </div>

                );

            }
            return post;
            
            
        }
    }

export default FullPost;