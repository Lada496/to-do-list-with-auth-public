import { Fragment } from "react";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const content = (
    <ul className="list">
      {props.list.map((item) => (
        <TodoItem key={item.id} item={item} onDelete={props.onDelete} />
      ))}
    </ul>
  );
  return (
    <Fragment>
      {props.list.length === 0 && (
        <h3 className="list__heading">No todo item</h3>
      )}
      {props.list.length !== 0 && content}
    </Fragment>
  );
};
export default TodoList;
