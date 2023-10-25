import React, { Component } from "react";

class CategoryForm extends Component {
  state = {
    categoryName: "",
  };

  handleCategoryNameChange = (event) => {
    this.setState({ categoryName: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { categoryName } = this.state;
    this.props.onSubmit(categoryName);
    this.setState({ categoryName: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Category Name:
          <input
            type="text"
            value={this.state.categoryName}
            onChange={this.handleCategoryNameChange}
          />
        </label>
        <button type="submit">Создать категорию</button>
      </form>
    );
  }
}

export default CategoryForm;
