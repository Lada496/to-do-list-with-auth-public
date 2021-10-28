import { useState, useRef, Fragment } from "react";

const AddTodoItem = (props) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const inputDescriptionRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const todo = {
      title,
      description: inputDescriptionRef.current.value,
    };
    props.onAdd(todo);
    setTitle("");
    inputDescriptionRef.current.value = "";
    setShow(false);
  };

  const showHandler = () => {
    setShow(true);
  };

  const hideHandler = () => {
    setShow(false);
  };

  const content = (
    <form className="form" onSubmit={submitHandler}>
      <label htmlFor="title">Title</label>
      <br />
      <input
        type="text"
        id="title"
        name="title"
        maxLength="8"
        value={title}
        onChange={titleChangeHandler}
      />
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <textarea
        maxLength="30"
        id="description"
        name="description"
        ref={inputDescriptionRef}
      />
      <br />
      <button className="add" type="submit">
        Add
      </button>
      <button className="normal" onClick={hideHandler}>
        Cancel
      </button>
    </form>
  );

  return (
    <Fragment>
      {show && content}
      {!show && (
        <button className="open" onClick={showHandler}>
          Add Item
        </button>
      )}
    </Fragment>
  );
};

export default AddTodoItem;
