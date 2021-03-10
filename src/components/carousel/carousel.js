import React from 'react';
import './carousel.css'

const Carousel = () => {
    return (
        <>
        <div className="overlay"></div>
        <div id="carouselExampleControls" className="carousel slide mb-5" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="http://albaciudad.org/wp-content/uploads/2016/10/sala_41476113785-1.jpg" className="d-block w-100 opacity" alt="Enrique_Dussel" />
                </div>
                <div className="carousel-item">
                    <img src="https://i.ytimg.com/vi/viW2cepQulI/maxresdefault.jpg" className="d-block w-100 opacity" alt="Rita_Segato" />
                </div>
                <div className="carousel-item">
                    <img src="http://4.bp.blogspot.com/-CJVHwE-aCe0/Vboa3i5cMII/AAAAAAAA91o/5DVAb00nmCY/s1600/leonor%2B1.jpg" className="d-block w-100 opacity" alt="Leonor_Silvestri" />
                </div>
                <div className="carousel-item">
                    <img src="https://www.latindadd.org/wp-content/uploads/2020/09/unnamed.jpg" className="d-block w-100 opacity" alt="Atilio_Boron" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </>
    )
}

export default Carousel;