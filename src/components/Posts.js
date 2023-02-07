import React, { memo, useEffect } from "react";
import Categories from "./Categories";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  fetchPosts,
  fetchPostsByAuthor,
  fetchPostsByCategory,
} from "../store/actions";

const Posts = memo((props) => {
  const { type, posts, categories } = props;
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const { categoryId, authorId } = params;
    if (type === "author") {
      dispatch(fetchPostsByAuthor(authorId));
    } else if (type === "category") {
      dispatch(fetchPostsByCategory(categoryId));
    } else {
      dispatch(fetchPosts());
    }
  }, [type, params, dispatch]);

  return (
    <>
      <div className="main">
        <Categories categories={categories} />
        <div className="content">
          {posts && posts.length === 0 && (
            <div className="post" style={{ textAlign: "center" }}>
              <h1>No posts to dispay</h1>
            </div>
          )}
          {posts && posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
      </div>
    </>
  );
});

const mapStateToProps = (state) => ({
  categories: state.posts.categories,
  posts: state.posts.posts,
});

export default connect(mapStateToProps)(Posts);
