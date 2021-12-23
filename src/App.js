import { Switch, Route } from "react-router-dom";

import SectionWrapper from "./components/SectionWrapper";
import Header from "./components/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import "./styles/App.css";

function App() {
  return (
    <>
      <Header />

      <SectionWrapper>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/movies" exact>
            <Movies />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>
        </Switch>
      </SectionWrapper>
    </>
  );
}

export default App;
