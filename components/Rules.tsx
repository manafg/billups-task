import { AnimatePresence, motion } from "framer-motion";
import React, { FunctionComponent, useState } from "react";
import styles from "../styles/Rules.module.css";

type RulesProps = {
  advanced: boolean;
  setopen?: any;
  open?: boolean;
};

export const Rules: FunctionComponent<RulesProps> = ({
  open,
  advanced,
  setopen,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, borderRadius: "50%" }}
          animate={{ opacity: 1, borderRadius: "0%" }}
          exit={{ opacity: 0 }}
          className={styles.rules}
          onClick={() => setopen()}
        >
          <div className={styles.title}>
            <h1>Rules</h1>
            <img height="100" width="100" src="/icon-close.svg" alt="close" />
          </div>
          <div className={styles.image}>
              <img src="/RPSSL.gif" alt="rules for advanced" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
