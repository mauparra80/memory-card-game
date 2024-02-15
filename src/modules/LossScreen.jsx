

function LossScreen({score, restartGame}) {
  return (
  <div className="lossScreen">
    <h1>Game Over</h1>
    <p className="score">Score: {score}</p>
    <button onClick={() => restartGame()} className="restartGameBtn">Restart</button>
  </div>
    
  )
}

export default LossScreen;