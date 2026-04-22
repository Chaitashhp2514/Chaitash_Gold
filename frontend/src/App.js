import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#111113",
            color: "#f4f4f5",
            border: "1px solid rgba(245, 158, 11, 0.25)"
          }
        }}
      />
    </div>
  );
}

export default App;
