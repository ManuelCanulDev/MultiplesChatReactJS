import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default class Soporte extends Component {
  render() {
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Bien hecho es mejor que bien dicho</h1>
              <p className="lead">Nunca subestimamos el poder de un cliente insatisfecho.</p>
              <p>Para poder brindarle un servicio de alta calidad, le pedimos por favor que se registre <Link className="title ml-2" to="signup">aquí</Link> o inicie sesión <Link className="title ml-2" to="login">aquí</Link>.</p>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>

            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}
