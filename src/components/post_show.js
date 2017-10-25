import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost }  from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        // console.log(id);
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, ()=>{
            this.props.history.push('/');
        });
    }

    render() {
        // console.log(this.props);
        const { post } = this.props;
        // console.log(post);
        if(!post) return <div className="loader"></div>;
        return (
            <div>
                <Link to='/' className="btn btn-primary">Back</Link>
                <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)} >Delete Post</button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>                
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    // console.log(posts);
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);