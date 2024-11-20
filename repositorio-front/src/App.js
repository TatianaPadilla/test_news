import Navigation from "./components/Navigation";
import ModalNew from "./components/ModalNew";

function App() {
  return (
    <div className="container p-5" style={{ fontFamily: "Outfit, sans-serif" }}>
      <div className="row">
        <div className="col">
          <h1 className="mb-5">Noticias</h1>
        </div>
        <div className="col">
          <ModalNew />
        </div>
      </div>
      <Navigation />
    </div>
  );
}

export default App;
