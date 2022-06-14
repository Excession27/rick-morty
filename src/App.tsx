import "./App.css";
import ReactQueryProvider from "./component/ReactQueryProvider";
import Home from "./container/Home";
import CharacterDataContextProvider from "./context/DataContext";

function App() {
  return (
    <ReactQueryProvider
      children={
        <CharacterDataContextProvider>
          <Home />
        </CharacterDataContextProvider>
      }
    />
  );
}

export default App;
