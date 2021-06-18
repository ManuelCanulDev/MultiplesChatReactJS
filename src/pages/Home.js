import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Bienvenido a la DeepWeb</h1>
              <p className="lead">Un gran lugar para compartir tus pensamientos con amigos.</p>
              <br></br>
              <br></br>
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
