import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      if (isCountingDown && time > 0) {
        interval = setInterval(() => {
          setTime((time) => time - 1);
        }, 1000);
      } else if (!isCountingDown) {
        interval = setInterval(() => {
          setTime((time) => time + 1);
        }, 1000);
      } else if (time === 0) {
        setIsRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, isCountingDown, time]);

  const formattedTime = ("00000" + time).slice(-5);

  const handleStart = () => {
    if (isCountingDown) {
      setTime(initialTime);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setInitialTime(0);
    setIsRunning(false);
    setIsCountingDown(false);
  };

  const handleTimeChange = (event) => {
    setInitialTime(event.target.value);
  };

  const handleCountdownChange = (event) => {
    setIsCountingDown(event.target.checked);
  };

  return (
	<div>
  	<div className='Counter'>
		<div className='clock'>
    		<i class="fa-solid fa-clock-nine"></i>
			<p>4geeks</p>
		</div>
    		<div className='four'>
				{formattedTime}
			</div>
	</div>
	<div className='Buttons'>
		<input type="number" value={initialTime} onChange={handleTimeChange} disabled={isRunning}/>
		<label>
        	<input type="checkbox" checked={isCountingDown} onChange={handleCountdownChange} disabled={isRunning}/> Cuenta regresiva
      	</label>
		<button onClick={handleStart}>Start</button>
    	<button onClick={handlePause}>Pause</button>
    	<button onClick={handleReset}>Reset</button>
	</div>
	</div>
  );
}

export default Timer;


