import 'bulma/css/bulma.min.css';
import logo from './logo.svg';
import { Outlet, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <div className="container is-fluid">
        <div>
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img src={logo} alt={'logo'} width="112" height="28" />
              </a>

              <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item">
                  Home
                </a>

                {/* <a className="navbar-item">
                  Menu Editor
                </a> */}
                <Link className="navbar-item"
                  to={`menu-editor/${process.env.REACT_APP_MERCHANT_KEY}`}
                >
                  Menu Editor
                </Link>

                <Link className="navbar-item"
                  to={`orders/${process.env.REACT_APP_MERCHANT_KEY}`}
                >
                  Ordinazioni
                </Link>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button is-primary">
                      <strong>Sign up</strong>
                    </a>
                    <a className="button is-light">
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
