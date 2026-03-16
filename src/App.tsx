import "./App.css";
import ColasPage from "./colasPage";

function App() {
  return (
    <div className="app">
      <header className="encabezado">
        <h1>Challenge 05 — Cola en un Cajero</h1>
      </header>

      <main className="contenido">
        <ColasPage />
      </main>
    </div>
  );
}

export default App;