import { Link, useRouteError } from "react-router-dom";

type AppError = { statusText: string; message: string };

export default function ErrorPage() {
  const error = useRouteError() as AppError;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go Home</Link>
    </div>
  );
}
