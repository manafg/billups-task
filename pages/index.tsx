import Head from "next/head";
import { useState } from "react";
import { Header } from "../components/Header";
import { Play } from "../components/Play";
import { Rules } from "../components/Rules";
import { Results } from "../components/Results";

export default function Home() {
  const [advancedMode, setAdvancedMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [score, setScore] = useState(0);

  
  return (
    <div>
      <Head>
        <title>Bilups Task</title>
        <link rel="icon" href="/bilups-logo.svg" />
      </Head>
      <Header advanced={advancedMode} score={score} />
      <footer>
        <div className="rules" onClick={() => setOpen(!open)}>
          Rulles
        </div>
      </footer>
      {selected >= 0 ? (
        <Results
          advanced={advancedMode}
          selected={selected}
          setselected={(value) => setSelected(value)}
          setscore={setScore}
        />
      ) : (
        <Play
          setselected={(value) => setSelected(value)}
          advanced={advancedMode}
        />
      )}

      <Rules
        open={open}
        advanced={advancedMode}
        setopen={() => setOpen(!open)}
      />
    </div>
  );
}
