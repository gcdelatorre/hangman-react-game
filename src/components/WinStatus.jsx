import { statusStyles } from "../datas/style"

export default function () {
    return (
        <section className="game-status" style={statusStyles.win}>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>
    )
}