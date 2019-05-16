import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import classes from './Posts.module.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log(this.props);
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
                this.setState({ posts: updatedPosts });
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        // this.props.history.push({ pathname: '/posts/' + id });
        this.props.history.push('/posts/' + id);
    };

    render() {
        let posts = <p style={{ textAlign: 'center' }} >Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        // sending all parent props with a spread operator
                        // {...this.props}
                        // or sending just one prop
                        // match={this.props.match}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;