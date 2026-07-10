"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col h-full w-full overflow-hidden">
      {/* Black hole video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover z-0 opacity-90"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-5 sm:px-10 lg:px-20 mt-32 lg:mt-40 mb-20 w-full gap-10"
      >
        {/* Left: copy */}
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start max-w-2xl">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">
              Full-Stack · Disponible para proyectos
            </h1>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.5)}
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
            variants={slideInFromLeft(0.8)}
            className="text-lg text-gray-400 my-5 max-w-[600px]"
          >
            Construyo software que resuelve problemas reales en El Salvador.
            Backend sólido, producto con propósito.
          </motion.p>

          <motion.div
            variants={slideInFromLeft(1)}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#proyectos"
              className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
            >
              Ver proyectos
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
            variants={slideInFromLeft(1.2)}
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
          variants={slideInFromRight(0.8)}
          className="w-full h-full hidden lg:flex justify-center items-center"
        >
          <Image
            src="/hero-bg.svg"
            alt="work icons"
            height={650}
            width={650}
            draggable={false}
            className="select-none"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
