import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Nosotros extends Component {
    render() {
        return (
            <div className="home">
                <Header></Header>
                <section>
                    <div className="jumbotron jumbotron-fluid py-5">
                        <div className="container text-center py-5">
                            <h1 className="display-4">No hay fronteras, no hay naciones.</h1>
                            <p className="lead">No naciste para ser solo otro número en el sistema. Naciste para experimentar y apreciar. Naciste en un tiempo de revolución digital. Naciste en la guerra espiritual anticipada por muchos. Naciste diferente, porque el sistema necesita una actualización. Naciste para destruir la opresión y crear libertad. Naciste para enseñar a la misma gente que te rechaza. Naciste para expandir tu mente y eliminar el hermetismo. Naciste para volar más alto con las alas de tus ancestros.</p>
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
