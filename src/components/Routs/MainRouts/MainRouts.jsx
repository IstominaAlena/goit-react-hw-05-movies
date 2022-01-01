import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import SectionWrapper from "../../SectionWrapper";

const Home = lazy(() =>
  import("../../../pages/Home" /* webpackChunkName: "home-page" */)
);
const Movies = lazy(() =>
  import("../../../pages/Movies" /* webpackChunkName: "movies-page" */)
);
const MovieDetails = lazy(() =>
  import(
    "../../../pages/MovieDetails" /* webpackChunkName: "movie-details-page" */
  )
);

const MainRouts = () => {
  return (
    <SectionWrapper>
      <Suspense fallback={<h1>Loading...</h1>}>
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
      </Suspense>
    </SectionWrapper>
  );
};
export default MainRouts;
