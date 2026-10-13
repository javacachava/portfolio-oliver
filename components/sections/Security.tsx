"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

import { slideInFromTop } from "@/lib/motion";

export default function Security() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="flex flex-col relative items-center justify-center sm:min-h-screen w-full overflow-hidden px-4 py-10 sm:px-0 sm:py-0"
    >
      <div className="relative sm:absolute sm:top-6 z-[5] mb-8 sm:mb-0">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[32px] sm:text-[40px] font-medium text-center text-gray-200 px-5"
        >
          Rendimiento{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            &
          </span>{" "}
          seguridad.
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center relative sm:absolute sm:translate-y-[-50px] z-[20] w-auto h-auto">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <Image
            src="/lock-top.png"
            alt="Lock top"
            width={50}
            height={50}
            className="translate-y-5 transition-all duration-200 group-hover:translate-y-11"
          />
          <Image
            src="/lock-main.png"
            alt="Lock main"
            width={70}
            height={70}
            className="z-10"
          />
        </div>

        <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-3 sm:my-[20px] border-[#7042F88B] opacity-[0.9]">
          <h3 className="Welcome-text text-[12px]">
            OWASP Top 10 · JWT · RLS · Criptografía aplicada
          </h3>
        </div>
      </div>

      <div className="relative sm:absolute sm:bottom-[10px] z-[20] px-[5px] mt-8 sm:mt-0">
        <div className="cursive text-[20px] font-medium text-center text-gray-300">
          Seguridad en cada capa del stack.
        </div>
      </div>

      {inView && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <video
            loop
            muted
            autoPlay
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          >
            <source src="/videos/encryption-bg.webm" type="video/webm" />
          </video>
        </div>
      )}
    </section>
  );
}
