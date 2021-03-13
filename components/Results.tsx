import { motion } from "framer-motion";
import React, { FunctionComponent, useEffect, useState } from "react";
import { GameRules } from "../shared/rules";
import styles from "../styles/Results.module.css";
import styles2 from "../styles/Play.module.css";
import Button from "./Button";
import client from '../clinet/client'

type ResultsProps = {
  selected: number;
  advanced: boolean;
  setselected: any;
  setscore: any;
};

export const Results: FunctionComponent<ResultsProps> = ({
  selected,
  setselected,
  setscore,
  advanced,
}) => {
  const [result, setResult] = useState("");
  const [house, setHouse] = useState("");
  const [show, setShow] = useState(false);

  


  useEffect(() => {
    
    client.post("/play",{
      player: selected +1
    }).then((res)=>{
      debugger
      setTimeout(() => {
      setShow(true);
      setResult(res.data.results);
      setHouse(GameRules[res.data.computer].value);
      if(res.data.results == "lose") {
        setscore((score) => score - 1);
      } else if (res.data.results == "win") {
        setscore((score) => score + 1);
      } 
     
      },2000)

    })
    // client.get("/choice").then((res)=> {
    //   debugger
    //   let randomNum = res.data.id
    //   const userSelected = GameRules[selected].value;

    // setTimeout(() => {
    //   ///debugger
    //   setShow(true);
    //   setHouse(GameRules[randomNum-1].value);
    //   if (GameRules[randomNum-1].beats.includes(userSelected)) {
    //     setResult("Lose");
    //     setscore((score) => score - 1);
    //   } else {
    //     if (GameRules[randomNum-1].value === userSelected) {
    //       setResult("Tie");
    //     } else {
    //       setResult("win");
    //       setscore((score) => score + 1);
    //     }
    //   }
    // }, 2000);
      
    // } )
    
  }, []);
  return (
    <div className={show ? styles.results : styles.pending}>
      <div className={styles.pick}>
        <h3>You Picked</h3>
        <motion.div
          className={result === "win" ? styles.win : styles.house}
          initial={{ y: 20 }}
          animate={{ y: 0, transition: { loop: 3 } }}
        >
          <Button
            classN={`${styles2[GameRules[selected+1].value]} ${styles.btn}`}
          >
            <img src={`/icon-${GameRules[selected+1].value}.svg`} alt="" />
          </Button>
        </motion.div>
      </div>

      <div className={styles.pick}>
        <h3>House Picked</h3>
        <motion.div
          className={result === "Lose" ? styles.win : styles.house}
          initial={{ y: 20 }}
          animate={{ y: 0, transition: { loop: 3 } }}
        >
          {house && (
            <Button classN={`${styles2[house]} ${styles.btn}`}>
              <img src={`/icon-${house}.svg`} alt="" />
            </Button>
          )}
        </motion.div>
      </div>
      <div className={styles.result}>
        {show && (
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}>
            <h2>You {result}</h2>
            <div
              className={styles.playBtn}
              onClick={() => {
                setselected(-1);
                setResult("");
              }}
            >
              Play again
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
