import { statusStyles } from "../datas/style"

export default function () {
    return (
        <section className="game-status" style={statusStyles.lose}>
                <h2>Game Over!</h2>
                <p>You lose! Better start learning assembly😭</p>
            </section>
    )
}