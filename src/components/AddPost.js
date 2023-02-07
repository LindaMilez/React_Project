import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost, setError } from "../store/actions";
import Input from "./Input";
import Select from "./Select";
import Text from "./Text";

const AddPost = memo((props) => {
  const [postObj, setPostObj] = useState({});
  const { title = "", content = "", categoriesId = "" } = postObj;
  const history = useHistory();
  const { categories = [] } = props;
  const handleChange = (e) => {
    setPostObj({ ...postObj, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (!title) {
      props.setError("Please enter title");
    } else if (!content) {
      props.setError("Please enter content");
    } else if (!categoriesId) {
      props.setError("Please select a category");
    } else {
      const post = {
        authorId: parseInt(props.author.id, 10),
        title: postObj.title,
        content: postObj.content,
        categoriesId: postObj.categoriesId,
        timestamp: new Date(),
      };
      props.addPost(post, history);
    }
  };

  const handleSelectChange = (val) => {
    setPostObj({ ...postObj, categoriesId: val });
  };

  return (
    <div className="add-post">
      <h2>New Post</h2>
      <div className="add-post-form">
        <Input
          type="text"
          label="Title"
          value={title}
          name="title"
          onInput={handleChange}
        />
        <Text
          label="Type in your thoughts in 200 words or less"
          value={content}
          onUpdate={handleChange}
          name="content"
        />
        <span className="char-count">{content.length} of 200 Characters</span>
        <Select
          label="Select a category"
          options={categories}
          name="categoriesId"
          onChange={handleSelectChange}
          value={categoriesId}
        />
        <button id="add-post-btn" onClick={handleSubmit}>
          + Add
        </button>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => ({
  categories: state.posts.categories,
  author: state.users,
});

const mapDispatcherToProps = () => (dispatch) => ({
  addPost: (post, history) => dispatch(addPost(post, history)),
  setError: (error) => dispatch(setError(error)),
});

export default connect(mapStateToProps, mapDispatcherToProps)(AddPost);
