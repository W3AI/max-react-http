import React, { Component } from 'react';
import axios from '../../../axios'

import Post from '../../../components/Post/Post';
import classes from './Posts.module.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                // inside 'then' executes async when data comes from server
                const posts = response.data.slice(0, 4);    // to fetch first 4 posts
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Steve'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    };

    render () {
        let posts = <p style={{textAlign: 'center'}} >Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            });
        }

        return (
            <section className={classes.Posts}>
                {posts}
            </section>
        );
    }
}

export default Posts;