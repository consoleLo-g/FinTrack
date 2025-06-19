import { useState } from "react";
import Nav from "./Components/Nav";
import Main from "./Components/Main";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col">
        <Nav />
        <Main />
      </div>
    </>
  );
}

export default App;
