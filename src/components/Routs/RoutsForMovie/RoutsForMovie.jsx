import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Spinner from "../../Spinner"



const Cast = lazy(() =>
  import("../../../pages/Cast" /* webpackChunkName: "cast-page" */)
);
const Reviews = lazy(() =>
  import("../../../pages/Reviews" /* webpackChunkName: "reviews-page" */)
);

const RoutsForMovie = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/movies/:movieId/cast">
          <Cast />
        </Route>

        <Route path="/movies/:movieId/reviews">
          <Reviews />
        </Route>
      </Switch>
    </Suspense>
  );
};
export default RoutsForMovie;
