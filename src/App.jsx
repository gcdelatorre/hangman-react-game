import {useState, useEffect, useRef} from "react"
import { languages } from "./datas/language"
import LoseStatus from "./components/LoseStatus"
import WinStatus from "./components/WinStatus"
import Header from "./components/Header"
import { nanoid } from "nanoid"
import LanguageElements from "./components/LanguagesElements"

export default function AssemblyEndgame() {

    const languageElements = languages.map(language => {
      const styles = {
        color: language.color,
        backgroundColor: language.backgroundColor,
      }
      return <LanguageElements 
        style={styles}
        name={language.name}
        key={nanoid()}
        />
    })

    return (
        <main>

            <Header />
            
            <WinStatus /> {/*just conditional render if win or lose */}

            <section>
              <div className="languages-container">
                  {languageElements}
                </div>
            </section>
            
        </main>
    )
}
