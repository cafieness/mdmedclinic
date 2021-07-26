import { Route } from "react-router-dom";
import { Header, Footer } from "./components";

import { Home, About } from "./pages";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} exact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
