import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import ChatSolo from "./pages/ChatSolo";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {Recovery} from "./pages/Recovery";
import { auth } from "./services/firebase";
import Nosotros from "./pages/Nosotros";
import Galeria from "./pages/Galeria";
import Soporte from "./pages/Soporte";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
            <Redirect to="/chat-individual" />
          )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Cargando...</span>
      </div>
    ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/chat-grupal"
              authenticated={this.state.authenticated}
              component={Chat}
            />
            <PublicRoute
              path="/signup"
              authenticated={this.state.authenticated}
              component={Signup}
            />
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={Login}
            />
            <PublicRoute
              path="/nosotros"
              authenticated={this.state.authenticated}
              component={Nosotros}
            />
            <PublicRoute
              path="/galeria"
              authenticated={this.state.authenticated}
              component={Galeria}
            />
            <PublicRoute
              path="/soporte"
              authenticated={this.state.authenticated}
              component={Soporte}
            />
            <PublicRoute
              path="/recovery"
              authenticated={this.state.authenticated}
              component={Recovery}
            />
            <PrivateRoute
              path="/chat-individual"
              authenticated={this.state.authenticated}
              component={ChatSolo}
            />
          </Switch>
        </Router>
      );
  }
}

export default App;
