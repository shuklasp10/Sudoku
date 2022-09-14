var intervalId=null;

export const startTimer = (timer,setTimer) =>{
    setTimer({min:0,sec:0});
    intervalId = setInterval(()=>{

      setTimer((timer)=>{
        if(timer.sec===59){
          return {min:timer.min+1,sec:0}
        }
        else{
          return {...timer,sec:timer.sec+1}
        }
    });
    },1000);
    return intervalId;
  }
export const stopTimer = () =>{
  if(intervalId){
    clearInterval(intervalId)
  }
}
  