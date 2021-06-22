import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Galeria extends Component {
    render() {
        return (
            <div className="home">
                <Header></Header>
                <section>
                    <div className="jumbotron jumbotron-fluid py-5">
                        <div className="container text-center py-5">
                            <h1 className="display-4">Somos cualquiera que esté molesto y quiera hacer algo al respecto.</h1>
                            <p className="lead">Existimos sin nacionalidad, color de piel o sesgo religioso.</p>
                            <div className="row">
                                <div className="col-md-4">
                                    <img src="https://www.eltiempo.com/files/image_640_428/uploads/2017/02/12/58a08a1f4f0ea.jpeg" alt="..." className="img-thumbnail" />
                                </div>
                                <div className="col-md-4">
                                    <img src="https://static.eldiario.es/clip/20204cd3-1eef-4200-9bbc-7ef02a626a15_16-9-aspect-ratio_default_0.jpg" alt="..." className="img-thumbnail" />
                                </div>
                                <div className="col-md-4">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSY0s2Cf5F8mDphgeSYGLXsDAUnd-FFePGw&usqp=CAU" alt="..." className="img-thumbnail" />
                                </div>
                                <div className="col-md-4">
                                    <img src="https://phantom-marca.unidadeditorial.es/3d203db64d7f62f7f2f35aaa44223040/resize/1320/f/jpg/assets/multimedia/imagenes/2021/05/06/16203052729490.jpg" alt="..." className="img-thumbnail" />
                                </div>
                                <div className="col-md-4">
                                    <img src="https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/styles/bi_960x400/public/media/image/2021/06/miembro-anonymous-2360967.jpg" alt="..." className="img-thumbnail" />
                                </div>
                                <div className="col-md-4">
                                    <img src="https://i.blogs.es/95542b/anonymous/840_560.jpg" alt="..." className="img-thumbnail" />
                                </div>
                                <div className="col-md-4">
                                    <img src="https://www.lavozdemichoacan.com.mx/wp-content/uploads/2020/07/DeepWeb-que-es-1024x576.jpg" alt="..." className="img-thumbnail" />
                                </div>
                                <div className="col-md-4">
                                    <img src="https://tuul.tv/sites/default/files/styles/660n/public/DEEPWEB.png" alt="..." className="img-thumbnail" />
                                </div>
                                <div className="col-md-4">
                                    <img src="https://elcomercio.pe/resizer/6xupOD90Ajo9p47BTxE13N_nFY0=/400x0/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/MSXLP7JPNZHGNLXJZ72UDJM4Y4.jpg" alt="..." className="img-thumbnail" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer></Footer>
            </div>
        )
    }
}
