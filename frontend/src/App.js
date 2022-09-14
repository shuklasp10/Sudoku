import './App.css';
import { useEffect, useState} from 'react';
import {startTimer,stopTimer} from './Timer';
import SudokuBoard from './SudokuBoard';
import ScoreBoard from './ScoreBoard';
import { checkSolution, gridGenerator} from './Solver';
import {postData} from './api';

function App() {

  const [initialMatrix,setInitialMatrix] = useState();
  const [matrix,setMatrix] = useState();
  const [timer,setTimer] = useState({min:0,sec:0});
  const [sudokuBoard,setSudokuBoard] = useState(false);
  const [scoreBoard,setScoreBoard] = useState(false);
  const [error,setError] = useState(false);
  const [accept,setAccept] = useState(false);
  const [name,setName] = useState('');
  
  const getDeepCopy = (arr) =>{
    return JSON.parse(JSON.stringify(arr));
  }

  useEffect(()=>{
    setTimeout(()=>{
      setError(false);
      console.log('effect runs');
    },3000);
  },[error]);
  
  const handleNewGame = () =>{
    let grid = gridGenerator();
    setInitialMatrix(getDeepCopy(grid));
    setMatrix(getDeepCopy(grid));
    setSudokuBoard(true);
    startTimer(timer,setTimer);
  }

  const handleReset = () =>{
    setMatrix(getDeepCopy(initialMatrix));
  }
  
  const handleValidate = () =>{
    let grid = getDeepCopy(matrix);
    if(checkSolution(grid)){
      stopTimer();
      setAccept(true);
    }
    else{
      setError(true);
    }
  }

  const handleSave = async() =>{
    const {min,sec} = timer;
    await postData({name,min,sec});
    setAccept(false);
    setSudokuBoard(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku</h1>

        {error && (<h6 className='error'>Sorry! Solution not accepted</h6>)}

        {accept && (<>
        <h6 className='accept'>Congratulations! Solution accepted</h6>
        <div>
        <input className='playerInput' placeholder='Enter Player Name'  onChange={((e)=>setName(e.target.value))} value={name}/>
        <button className='saveButton' onClick={handleSave}>Save</button>
        </div>
        </>
        )}

        {sudokuBoard && (<SudokuBoard initialMatrix={initialMatrix} matrix={matrix} setMatrix={setMatrix} timer={timer} />)} 
        {scoreBoard && (<ScoreBoard />)} 
        
        <div className='menu'>
          {! scoreBoard ? !sudokuBoard ? <>
            <button onClick={handleNewGame} className='menubutton'>New Game</button>
            <button onClick={()=>{setScoreBoard(true)}} className='menubutton'>Score Board</button>
          </>:
          <>
          <button onClick={handleReset} className='menubutton'>Reset</button>
          <button onClick={handleValidate} className='menubutton'>Validate</button>
          <button onClick={()=>setSudokuBoard(false)} className='menubutton'>Back</button>
          </>:
          <>
          <button onClick={()=>setScoreBoard(false)} className='menubutton'>Back</button>
          </>}
        </div>

      </header>
    </div>
  );
}

export default App;
