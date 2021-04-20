import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import config from "./config";

function App() {
  return (
    <div
      style={{
        maxWidth: config.extension.maxWidth,
        width: config.extension.maxWidth,
      }}
    >
      <Header />
      <Body />
    </div>
  );
}

export default App;
