import { ErrorBoundary } from "react-error-boundary";
import styles from "./ErrorBoundary.module.css"

const DefaultErrorBoundary = (props) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error(error);
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
};

const ErrorFallback = ({ error }) => (
  <div className={styles.ErrorPage}>
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
    <p>
      <i>{error.statusText || error.message}</i>
    </p>
  </div>
);

export default DefaultErrorBoundary;
