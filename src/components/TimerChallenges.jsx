import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dailog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);

        dailog.current.open();
    }
    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }
    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 10)
        }, 10);

    }
    const handleStop = () => {
        dailog.current.open();
        clearInterval(timer.current)
    }
    return (
        <>
            <ResultModal ref={dailog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>

                <p className="challenge-time" >
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is runnig...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}