import {useState, useEffect, useRef} from "react"
import { languages } from "./datas/language"
import LoseStatus from "./components/LoseStatus"
import WinStatus from "./components/WinStatus"
import Header from "./components/Header"
import clsx from "clsx"
import WrongAnswerStatus from "./components/WrongAnswerStatus"
import { getRandomWord } from "./datas/utils"

export default function AssemblyEndgame() {

    const [currentWord, setCurrentWord] = useState(getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    // Derived values
    const wrongGuessCount = 
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = 
        currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost

    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
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
            disabled={isGameOver}
            onClick={() => addGuessedLetter(letter)}
        >
            {letter.toUpperCase()}
        </button>)
    })

    function handleGameStatus () {
        if (isGameWon) {
            return <WinStatus />
        }
        if (isGameLost) {
            return <LoseStatus />
        } 
        if (!isGameOver && isLastGuessIncorrect) {
            return <WrongAnswerStatus wrongGuessCount={wrongGuessCount}/>
        }
        return null
    }

    return (
        <main>

            <Header />
            
            <section className="game-status">
                {handleGameStatus()}
            </section>

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
            
            {isGameOver && <button className="new-game">New Game</button>}

        </main>
    )
}
