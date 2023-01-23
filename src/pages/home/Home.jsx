import React, { Component } from "react";
import "../../main.css";
import img1 from "../../assets/img/surfing.webp";
import img2 from "../../assets/img/waterfall.webp";
import img3 from "../../assets/img/pelawangan.webp";
import ContainerImg from "../../components/home/ContainerImg";

// let img = document.getElementById("img-bg");
// let pText = document.getElementById("pText");
// let pDesc = document.getElementById("pDesc");
// let btnImg = document.querySelectorAll(".img-when");

// const align = ["align-items-center", "align-items-start", "align-items-end"];
// const text = ["text-center", "text-start", "text-end"];
// const pDisplay = document.querySelector(".pleasant-display").classList;
// const innerP = document.querySelector(".inner-pleasant").classList
// let changer = (sec) => {
//   pDisplay.replace(pDisplay[2],align[sec]);
//   innerP.replace(innerP[1],text[sec]);
// //   .replace(,text[sec])
// };

// let arr = 0;

// async function looper() {
//   pText.classList.add("out");
//   pDesc.classList.add("out");
//   btnImg[arr].classList.remove("glow");
//   setTimeout(() => {
//     arr == 0 ? changer(1) : false;
//     arr == 1 ? changer(0) : false;
//     arr == 2 ? changer(2) : false;
//     pText.classList.remove("out");
//     pDesc.classList.remove("out");
//     pText.innerHTML = arrTxt[arr];
//     pText.classList.add("in");
//     pDesc.classList.add("in");
//     img.style.backgroundImage = `url(${arrImg[arr]})`;
//     btnImg[arr].classList.add("glow");
//     pDesc.innerHTML = arrDesc[arr];
//   }, 250);
//   setTimeout(() => {
//     pText.classList.remove("in");
//     pDesc.classList.remove("in");
//   }, 550);
//   arr += 1;
//   arr == 3 ? (arr = 0) : false;
//   console.log(arr);
// };
// setInterval(looper, 3000);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: true,
      arrImg: [img1, img2, img3],
      arrDesc: [
        "Enjoy the diverse beauty of Lombok with just 1 tap on Plombo.",
        "Enjoy the freshness of the natural air that is very beautiful.",
        "Explore every single place that so beautiful in Lombok.",
      ],
      arrTxt: [
        "Explore the Beauty of <br/>Lombok <span>Explore the Beauty of <br/>Lombok</span>",
        "Feel the Beauty of <br/>Nature <span>Feel the Beauty of <br/>Nature</span>",
        "Explore the Best <br/>Place <span>Explore the Best <br/>Place</span>",
      ],
      loadImg: false,
    };
  }

  render() {
    return (
      <>
        <section className="pleasant-display d-flex align-items-start">
          <div className="container-fluid">
            <div className="inner-pleasant text-start">
              <ContainerImg
                judul={this.state.arrTxt[0]}
                deskripsi={this.state.arrDesc[0]}
                img={this.state.arrImg[0]}
              />
              {/* <ContainerImg judul={this.state.arrTxt[1]} deskripsi={this.state.arrDesc[1]} img={this.state.arrImg[1]} />
              <ContainerImg judul={this.state.arrTxt[2]} deskripsi={this.state.arrDesc[2]} img={this.state.arrImg[2]} /> */}

              <div className="pleasant-footer">
                <div className="section-btn">
                  <img
                    className="position-absolute top-50 start-0 translate-middle"
                    src={"Assets/img/rounded-footer.svg"}
                    alt=""
                  />
                  <img
                    className="position-absolute top-50 start-100 translate-middle"
                    src="Assets/img/rounded-footer.svg"
                    alt=""
                  />
                  <div className="btn-img d-flex position-absolute top-50 start-50 translate-middle">
                    <img
                      className="img-when glow"
                      src={img1}
                      alt="Gambar Pelawangan"
                    />
                    <img src="Assets/img/rounded-footer.svg" alt="" />
                    <img
                      className="img-when"
                      src={img2}
                      alt="Gambar Air Terjun"
                    />
                    <img src="Assets/img/rounded-footer.svg" alt="" />
                    <img className="img-when" src={img3} alt="Gambar Surfing" />
                  </div>
                </div>

                <a className="btn-begin d-flex align-items-center" href="#">
                  <p className="m-0">
                    Begin the Journey.
                    <i className="bi bi-arrow-right panah-begin"></i>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Home;
