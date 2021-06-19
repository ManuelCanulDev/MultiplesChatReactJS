import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

function Header() {

  var userActual = JSON.parse(localStorage.getItem('user'));

  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <Link className="navbar-brand" to="/">DeepWeb</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              {
                userActual.uid === 'S95f1tgrDpRSNzOUUZPAzcAtUG43' ?
                <Link className="nav-item nav-link mr-3" to="/chat-individual">Chat de Soporte</Link>
                :
                <div>
                <Link className="nav-item nav-link mr-3" to="/chat-individual">Salas Individuales</Link>
                <Link className="nav-item nav-link mr-3" to="/chat-grupal">Sala de Platica</Link>
                </div>
              }
              <button className="btn btn-primary mr-3" onClick={() => auth().signOut()}>Cerrar Sesión</button>
            </div>
            : <div className="navbar-nav">
              <Link className="navbar-brand" to="/">Inicio</Link>
              <Link className="nav-item nav-link mr-3" to="/nosotros">Nosotros</Link>
              <Link className="nav-item nav-link mr-3" to="/galeria">Galeria</Link>
              <Link className="nav-item nav-link mr-3" to="/soporte">Soporte</Link>
              <Link className="nav-item nav-link mr-3" to="/login">Login</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;