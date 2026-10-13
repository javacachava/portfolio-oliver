"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import AmbientVideo from "@/components/ui/AmbientVideo";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // El texto pinta primero; el video (que ya respeta movimiento reducido) entra después.
    const timeoutId = window.setTimeout(() => setShowVideo(true), 600);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section className="relative flex flex-col h-full w-full overflow-hidden">
      {/* Black hole video */}
      {showVideo && (
        <AmbientVideo
          src="/videos/blackhole.webm"
          maxOpacity={0.9}
          className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover z-0"
        />
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-5 sm:px-10 lg:px-20 mt-24 sm:mt-32 lg:mt-40 mb-14 sm:mb-20 w-full gap-6 sm:gap-10"
      >
        {/* Left: copy */}
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start max-w-2xl">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">
              Ingeniería de Software · Cofundador de WUJU
            </h1>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.1)}
            className="flex flex-col gap-6 mt-6 text-4xl sm:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          >
            <span>
              Hola, soy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                Oliver Ascencio
              </span>
              .
            </span>
          </motion.div>

          <motion.p
            variants={slideInFromLeft(0.18)}
            className="text-lg text-gray-400 my-5 max-w-[600px]"
          >
            Estudiante de Ingeniería en Desarrollo de Software y cofundador de
            WUJU. Desarrollo software, coordino equipos técnicos y participo en
            proyectos de datos e IA aplicada, con la ciberseguridad como base.
          </motion.p>

          <motion.div
            variants={slideInFromLeft(0.26)}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#proyectos"
              className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
            >
              Ver proyectos
            </a>
            <a
              href="/cv/Oliver_Ascencio_Master_CV.pdf"
              download="Oliver_Ascencio_Master_CV.pdf"
              className="py-2 px-6 text-center text-white cursor-pointer rounded-lg max-w-[200px] border border-[#7042f88b] hover:bg-[#7042f8]/10 transition-colors"
            >
              Descargar CV
            </a>
            <a
              href="#contacto"
              className="py-2 px-6 text-center text-white cursor-pointer rounded-lg max-w-[200px] border border-[#7042f88b] hover:bg-[#7042f8]/10 transition-colors"
            >
              Hablemos
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={slideInFromLeft(0.34)}
            className="flex items-center gap-5 mt-2"
          >
            <a
              href="https://github.com/javacachava"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <GithubIcon size={16} />
              javacachava
            </a>
            <span className="text-[#2a0e61]">·</span>
            <a
              href="https://linkedin.com/in/oliver-ascencio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <LinkedinIcon size={16} />
              oliver-ascencio
            </a>
          </motion.div>
        </div>

        {/* Right: hero illustration */}
        <motion.div
          variants={slideInFromRight(0.2)}
          className="w-full h-full hidden lg:flex justify-center items-center"
        >
          <Image
            src="/hero-bg.svg"
            alt="Logotipos de las tecnologías que uso: Python, Java, JavaScript, C#, React, Node.js, Spring Boot, PostgreSQL, Git, GitHub y DigitalOcean"
            height={650}
            width={650}
            draggable={false}
            className="select-none"
            loading="lazy"
            sizes="650px"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
