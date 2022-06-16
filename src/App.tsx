import "./App.css";
import ReactQueryProvider from "./component/ReactQueryProvider";
import Home from "./container/Home";

function App() {
  return <ReactQueryProvider children={<Home />} />;
}

export default App;
