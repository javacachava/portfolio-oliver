"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type SkillIconProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
};

export default function SkillIcon({
  src,
  name,
  width,
  height,
  index,
}: SkillIconProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * 0.1 }}
      title={name}
    >
      <Image src={`/skills/${src}`} width={width} height={height} alt={name} />
    </motion.div>
  );
}
