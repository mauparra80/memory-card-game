

function WinScreen({score, restartGame}) {
  return (
  <div className="winScreen">
    <h1>You Win!</h1>
    <p className="score">Score: {score}</p>
    <button onClick={() => restartGame()} className="restartGameBtn">Restart</button>
  </div>
    
  )
}

export default WinScreen;