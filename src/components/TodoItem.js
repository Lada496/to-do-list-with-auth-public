const TodoItem = (props) => {
  const deleteHandler = () => {
    props.onDelete(props.item.id);
  };
  return (
    <li className="item">
      <h1 className="item__heading">{props.item.title}</h1>
      <p className="item__text">{props.item.description}</p>
      <button className="item__btn" onClick={deleteHandler}>
        Delete
      </button>
    </li>
  );
};
export default TodoItem;
