import './App.css'
import Banner from "./Components/Banner";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Favourites from './Components/Favourites';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Banner />
     <Switch>
        <Route path="/" component={Movies} exact/>
        <Route path="/favourites" component={Favourites} exact/>
    </Switch>
    </Router>
      </>  
  );
}

export default App;
