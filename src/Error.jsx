import { Link } from "react-router-dom";
import './App.css';

const Error = () => {

  return (
    <section className="error-section">
      <article>
        <h3>Sorry! Page Not found</h3>
        <Link to={'/'}>
          <p>Return to Homepage</p>
        </Link>
      </article>
    </section>
  )
}

export default Error