import { useState, useEffect, useCallback, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddTodoItem from "../components/AddTodoItem";
import TodoList from "../components/TodoList";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/config";
import { getAuth, signOut } from "firebase/auth";
import { authActions } from "../store/auth-slice";

import {
  getDatabase,
  ref,
  child,
  remove,
  update,
  push,
  onValue,
} from "firebase/database";

import { db } from "../config/config";
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
const Home = () => {
  const dispatch = useDispatch();
  const [init, setInit] = useState(true);
  const [list, setList] = useState([]);
  const history = useHistory();
  const auth = getAuth();
  const uid = useSelector((state) => state.auth.uid);
  const dbRef = ref(db, `notes/${uid}`);
  const readData = useCallback(() => {
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const loadedList = [];
      for (const key in data) {
        loadedList.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
        });
      }
      setList(loadedList);
      setInit(false);
    });
  }, [dbRef]);

  useEffect(() => {
    if (init) {
      readData();
    }
  }, [init, readData]);

  const deleteItemHandler = (id) => {
    remove(ref(db, `notes/${uid}/${id}`));
    readData();
  };
  const addItemHandler = (item) => {
    const newPostKey = push(child(ref(db), "notes")).key;
    const updates = {};
    updates[`/notes/${uid}/${newPostKey}`] = item;
    update(ref(db), updates);
    readData();
  };
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("signout");
        dispatch(authActions.logout());
        history.replace("/auth");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <div>
        <h1 style={{ textAlign: "center", color: "#fafafa" }}>To-do list</h1>
        <button className="logout" onClick={logoutHandler}>
          Logout
        </button>
        <AddTodoItem onAdd={addItemHandler} />
        {!init && (
          <TodoList onDelete={deleteItemHandler} list={list} init={init} />
        )}
      </div>
    </Fragment>
  );
};
export default Home;
