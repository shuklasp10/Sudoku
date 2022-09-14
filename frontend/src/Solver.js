const checkBox = (matrix, startI, startJ, num) => {
    for (let i = startI; i < (startI + 3); i++) {
        for (let j = startJ; j < (startJ + 3); j++) {
            if (matrix[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

const checkSides = (side, num) => {
    let res = true;
    side.map(item => {
        if (item === num) {
            res = false;
        }
    })
    return res;
}
const isValid = (matrix, i, j, num) => {
    let col = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => matrix[k][j]);
    let row = matrix[i];
    let startI = parseInt(i / 3) * 3;
    let startJ = parseInt(j / 3) * 3;
    if (checkSides(row, num) && checkSides(col, num) && checkBox(matrix, startI, startJ, num)) {
        return true;
    }
    return false;
}

const generateRow = ( grid) =>{
    let i = Math.floor(Math.random()*9);
    let num;
    for(let j=0;j<9;j++){
        do{
            num = Math.floor(Math.random()*9)+1;
        }while(!isValid(grid,i,j,num));
        grid[i][j]=num;
    }
}
const getNew = (i,j) =>{
    return j!==8 ? [i,j+1] : i!==8 ? [i+1,0] : [0,0]; 
}
const solvePuzzle = (grid,i=0,j=0) =>{
    if(grid[i][j]!==0){
        if(i!==8 || j!==8){
            let [newi,newj] = getNew(i,j);
            return solvePuzzle(grid,newi,newj);
        }
    }
    for(let num = 1; num<=9;num++){
        if(isValid(grid,i,j,num)){
            grid[i][j]=num;
            let [newi,newj] = getNew(i,j);
            if(!newi && !newj){
                return true;
            }
            if(solvePuzzle(grid,newi,newj)){
                return true;
            }
            else{
                grid[i][j]=0;
            }
        }
    }
    return false;
}
const createPuzzle = (grid) =>{
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(Math.random()>0.3){
                grid[i][j]=0;
            }
        }
    }
}

export const gridGenerator = () =>{
    let grid = [];
    for(let i=0;i<9;i++){
        grid[i] = Array(9).fill(0);
    }
    generateRow(grid);
    solvePuzzle(grid);
    createPuzzle(grid);
    return grid;
}

export const checkSolution = (grid) =>{
    console.log(grid);
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let num = grid[i][j];
            grid[i][j]=0;
            if(!isValid(grid,i,j,num)){
                return false;
            }
            grid[i][j]=num;
        }
    }
    return true;
}