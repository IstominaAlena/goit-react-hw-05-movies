import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import SectionWrapper from "../../SectionWrapper";

const Cast = lazy(() =>
  import("../../../pages/Cast" /* webpackChunkName: "cast-page" */)
);
const Reviews = lazy(() =>
  import("../../../pages/Reviews" /* webpackChunkName: "reviews-page" */)
);

const RoutsForMovie = () => {
  return (
    <SectionWrapper>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/movies/:movieId/cast">
            <Cast />
          </Route>

          <Route path="/movies/:movieId/reviews">
            <Reviews />
          </Route>
        </Switch>
      </Suspense>
    </SectionWrapper>
  );
};
export default RoutsForMovie;
