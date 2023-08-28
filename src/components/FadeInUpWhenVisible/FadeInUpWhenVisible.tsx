import { AnimatePresence, motion, useAnimation } from "framer-motion";
import PropTypes from "prop-types";
import React, { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface FadeInUpWhenVisibleProps {
  duration: number;
  ease: string;
  delay: number;
  yOffset?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  isVisible: boolean;
  className?: string;
}

const FadeInUpWhenVisible: FC<FadeInUpWhenVisibleProps> = ({
  duration,
  ease,
  delay,
  yOffset,
  children,
  style,
  isVisible,
  className,
}) => {

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          key="animation-item"
          ref={ref}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration, ease, delay }}
          variants={{
            visible: { opacity: 1, translateY: 0 },
            hidden: { opacity: 0, translateY: yOffset },
          }}
          style={style}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FadeInUpWhenVisible;
