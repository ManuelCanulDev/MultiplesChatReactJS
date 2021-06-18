import React, { useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import 'firebase/auth'
import firebase from 'firebase/app'

export const Recovery = () =>{

    const [usuario, setUsuario] = useState()

    const handleSubmit= (e) => {
        e.preventDefault()
        alert("Correo de recuperación enviado")
        recuperar(usuario)
    }

    return (
    
        <div className="container">
        <Header></Header>
        <form
          className="mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1>
            Recuperar Contraseña de
            <Link className="title ml-2" to="/">
              DeepWeb
            </Link>
          </h1>
          <p className="lead">
            Introduce el correo con el que te registraste.
          </p>
          <div className="form-group">
            <input required
              className="form-control"
              onChange= { e => setUsuario(e.target.value) }
              value={usuario}
              placeholder="Email"
              name="email"
              type="email"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary px-5" type="submit">Solicitar Recuperación</button>
          </div>
        </form>
        <Footer></Footer>
      </div>
    )
}

function recuperar(usuario){
    firebase
    .auth()
    .sendPasswordResetEmail(usuario)
    .then(res =>{
  
    })
  
    .catch(e =>{
      console.log(e.message)
    })
  }