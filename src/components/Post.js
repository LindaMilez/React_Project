import React, { memo } from "react";
import moment from "moment";
import DeletePostButton from "./DeletePostButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deletePost } from "../store/actions";

const Post = memo((props) => {
  const { user = {}, post = {} } = props;
  const formatedTimestamp = moment(post.timestamp).format(
    "dddd, MMMM Do YYYY, h:mm:ss a"
  );

  const onDeleteConfirm = () => {
    props.deletePost(post.id);
  };

  return (
    <div className="post">
      <h1>{post.title}</h1>
      {user?.id && user?.id === post?.author?.id && (
        <DeletePostButton onConfirm={onDeleteConfirm} />
      )}
      <h3>
        by{" "}
        {post.author && (
          <Link to={`/author/${post.author.id}`}>{post.author.name}</Link>
        )}
        |
        {post.categories && (
          <Link to={`/category/${post.categories.id}`}>
            {post.categories.title}
          </Link>
        )}
        | Posted on {formatedTimestamp}
      </h3>
      <p>{post.content}</p>
    </div>
  );
});

const mapStateToProps = (state) => ({
  user: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  deletePost: (postId) => dispatch(deletePost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
