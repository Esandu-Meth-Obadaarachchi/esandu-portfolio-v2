import { motion, useReducedMotion } from 'motion/react';

// Enter-on-scroll for blocks of content. Fires once, from slightly below.
export default function Reveal({ as = 'div', delay = 0, y = 28, children, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduce ? 0.3 : 0.9, delay, ease: [0.23, 1, 0.32, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
