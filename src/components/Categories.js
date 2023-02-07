import React from "react";
import { Link } from "react-router-dom";

const Categories = ({ categories }) => {
  return (
    <ul className="sidebar">
      {categories &&
        categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            <li>{category.title}</li>
          </Link>
        ))}
      <Link to="/">
        <li>All Posts</li>
      </Link>
    </ul>
  );
};

export default Categories;
