import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dailog = useRef();
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    const handleStart = () => {
        timer.current = setTimeout(() => {
            setTimerExpired(true)
            dailog.current.showModal();
        }, targetTime * 1000);
        setTimerStarted(true)
    }
    const handleStop = () => {
        clearTimeout(timer.current)
    }
    return (
        <>
            <ResultModal ref={dailog} targetTime={targetTime} result="lost" />
            <section className="challenge">
                <h2>{title}</h2>

                <p className="challenge-time" >
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Time is runnig...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}