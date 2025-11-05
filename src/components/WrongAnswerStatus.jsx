import { statusStyles } from "../datas/style"
import { getFarewellText } from "../datas/utils"
import { languages } from "../datas/language"

export default function WrongAnswerStatus ({wrongGuessCount}) {
    return (
        <section className="game-status" style={statusStyles.wrong}>
            <p>{getFarewellText(languages[wrongGuessCount -1].name)}</p>
        </section>
    )
}