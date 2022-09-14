import React from 'react';
import './SudokuBoard.css';


function SudokuBoard({initialMatrix,matrix,setMatrix,timer}) {
  
  const handleInputChange = (e,i,j) =>{
    let grid = JSON.parse(JSON.stringify(matrix));
    grid[i][j]=parseInt(e.target.value)%10 || 0;
    setMatrix(grid);
  }
 
  return (
    <>
    <span className='timer'>Timer: {`${("0"+timer.min).slice(-2)}:${("0"+timer.sec).slice(-2)}`}</span>
    <table className='table'>
      {matrix.map((row,i)=>(
        <tr>
          {row.map((cell,j)=>(
            <td><input disabled={initialMatrix[i][j]!==0}  onChange={(e)=>handleInputChange(e,i,j)} className="inputcell" value={cell?cell:''} /></td>
          ))}
        </tr>
      ))}
    </table>
    </>
  )
}

export default SudokuBoard;