import { motion } from "motion/react";

interface AnimatedTextProps {
  children: string;
}

export default function AnimatedText({ children }: AnimatedTextProps) {
  return (
    <motion.div
      className="text-white w-full text-center p-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.02,
          },
        },
      }}
    >
      {(children ?? "").split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
