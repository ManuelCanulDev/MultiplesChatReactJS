import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";

export default class Blogs extends Component {
    render() {
        return (
            <div className="home">
                <Header></Header>
                <section>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-lg-8 col-md-12 mx-auto">
                            <div className="post-preview">
                                <Link to="/post">
                                    <h2 className="post-title">
                                        Como hackear facebook diciendo por favor.
                                    </h2>
                                </Link>
                                <p className="post-meta">Posteado Por:
                                    <Link to="/autor">
                                        Manuel Canul
                                    </Link>
                                    el 24 de septiembre del 2017</p>
                            </div>
                            <hr />
                            <div className="post-preview">
                                <Link to="/post">
                                    <h2 className="post-title">
                                        Venta de Software para clases del profe Victor.
                                    </h2>
                                </Link>
                                <p className="post-meta">Posteado Por:
                                    <Link to="/autor">
                                        Manuel Canul
                                    </Link>
                                    el 24 de septiembre del 2017</p>
                            </div>
                            <hr />
                            <div className="post-preview">
                                <Link to="/post">
                                    <h2 className="post-title">
                                        Contrata un desarrollador con hambre :v.
                                    </h2>
                                </Link>
                                <p className="post-meta">Posteado Por:
                                    <Link to="/autor">
                                        Manuel Canul
                                    </Link>
                                    el 24 de septiembre del 2017</p>
                            </div>
                            <hr />
                            <div className="post-preview">
                                <Link to="/post">
                                    <h2 className="post-title">
                                        Hackea las elecciones ahora!
                                    </h2>
                                </Link>
                                <p className="post-meta">Posteado Por:
                                    <Link to="/autor">
                                        Manuel Canul
                                    </Link>

                                    el 24 de septiembre del 2017</p>
                            </div>
                            <hr />

                            <div className="clearfix">
                                <Link to="/masentradas" className="btn btn-secondary float-right">
                                    Más Entradas &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer></Footer>
            </div>
        )
    }
}
