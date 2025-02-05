import { useCollection } from "../hooks/useCollection";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function About() {
  const { data } = useCollection("images");

  const deleteDocFromCollection = (id) => {
    deleteDoc(doc(db, "images", id))
      .then(() => {
        console.log("ok");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="align-elements">
      {data &&
        data.map((todo) => {
          return (
            <div key={todo.id} className="card">
              <div className="card-body mb-5 border">
                <h1 className="text-2xl font-medium">{todo.title}</h1>
                <p>{todo.description}</p>
                <div className="flex gap-5">
                  <button className="btn btn-primary self-start">
                    {todo.completed ? "completed" : "uncompleted"}
                  </button>
                  <button
                    onClick={() => deleteDocFromCollection(todo.id)}
                    className="btn btn-secondary"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default About;
