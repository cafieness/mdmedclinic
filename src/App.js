import { Header, Footer, Router } from "./components";
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  console.log(location.pathname);
  let isFooter = true;

  if(location.pathname==="/login" || location.pathname==="signup"){
    isFooter=false;
  }
  
  return (
    <div className="App">
      <Header />
        <Router />
        {
          isFooter&&
          <Footer />
        }
        
    </div>
  );
}

export default App;
