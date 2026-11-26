"use client";
import { motion } from "framer-motion";
const list = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = { hidden: { opacity: 0, y: 28, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } } };
export function StaggerList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.ul className={className} variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>{children}</motion.ul>;
}
export function StaggerItem({ children }: { children: React.ReactNode }) { return <motion.li variants={item}>{children}</motion.li>; }
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} variants={item} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>{children}</motion.div>;
}
