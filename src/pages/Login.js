import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { signin, signInWithGoogle, signInWithGitHub,signInWithFacebook } from "../helpers/auth";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.githubSignIn = this.githubSignIn.bind(this);
    this.facebookSignIn = this.facebookSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async githubSignIn() {
    try {
      await signInWithGitHub();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async facebookSignIn() {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.log(error)
      this.setState({ error: error.code });
    }
  }

  render() {
    return (
      
      <div className="container">
        <Header></Header>
        <form
          className="mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            Entra a
            <Link className="title ml-2" to="/">
              DeepWeb
            </Link>
          </h1>
          <p className="lead">
            Introduce tus datos de acceso para continuar.
          </p>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className="form-group">
            {this.state.error ? (
              <p className="text-danger">{this.state.error}</p>
            ) : null}
            <button className="btn btn-primary px-5" type="submit">Entrar</button>
          </div>
          <p>Tambien puedes iniciar Sesión con alguna de estas alternativas.</p>
          <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
            Google
          </button>
          <button className="btn btn-secondary mr-2" type="button" onClick={this.githubSignIn}>
            GitHub
          </button>
          <button className="btn btn-primary" type="button" onClick={this.facebookSignIn}>
            Facebook
          </button>
          <hr />
          <p>
            No estas registrado? <Link to="/signup">Registrate</Link>
          </p>
          <p>
            Olvidaste tu contraseña? <Link to="/recovery">Recuperala</Link>
          </p>
        </form>
        <Footer></Footer>
      </div>
    );
  }
}
