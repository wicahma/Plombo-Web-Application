import React, { useEffect, useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import parse from "html-react-parser";

const containerHome = {
  muncul: {
    y: 0,
    opacity: 1,
  },
  keluar: {
    y: -40,
    opacity: 0,
  },
};

const ContainerImg = (props) => {
  const [animate, setAnimate] = useState(false);
  const [image, setImage] = useState();

  useEffect(() => {
    const imgLoader = new Image();
    imgLoader.src = `${props.img}`;
    imgLoader.onload = () => setImage(imgLoader.src);
  }, [props.img]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={containerHome}
        initial={{
          y: 40,
          opacity: 0,
        }}
        onViewportEnter={() => setAnimate(true)}
        animate={animate ? "muncul" : "keluar"}
        transition={{
          staggerChildren: 0.15,
          type: "spring",
          mass: 1,
          damping: 15,
          stiffness: 150,
        }}
      >
        <m.h2 className="pleasant-text" id="pText">
          {parse(props.judul)}
        </m.h2>
        <p className="pleasant-desc fs-4" id="pDesc">
          {props.deskripsi}
        </p>
      </m.div>
      <div
        className="img-section"
        id="img-bg"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </LazyMotion>
  );
};

export default ContainerImg;
