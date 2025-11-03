import {useState, useEffect, useRef} from "react"
import { languages } from "./datas/language"
import LoseStatus from "./components/LoseStatus"
import WinStatus from "./components/WinStatus"
import Header from "./components/Header"
import { nanoid } from "nanoid"
import LanguageElements from "./components/LanguagesElements"
import clsx from "clsx"

export default function AssemblyEndgame() {

    const [currentWord, setCurrentWord] = useState("react")
    const [guessedLetters, setGuessedLetters] = useState([])

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

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

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>
    ))

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
                
        return (<button
            className={clsx(
                isCorrect && "correct",
                isWrong && "wrong"
            )}
            key={letter}
            onClick={() => addGuessedLetter(letter)}
        >
            {letter.toUpperCase()}
        </button>)
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

            <section className="word">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            
        </main>
    )
}
