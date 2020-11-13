interface Input {
  daily_exercises: Array<string>;
  target: string;
}

interface Result1 {
 days: Array<number>;
 target: number
}

const parseArguments2 = (args: Input): Result1 => {
    //console.log(args)
    console.log(args.daily_exercises);
    console.log(args.target);
  if (args.daily_exercises.length < 1) throw new Error('Parameters missing');
  if (args.target.length < 1) throw new Error('Parameters missing');
  if(isNaN(Number(args.target))) throw new Error('Malformatted parameters');
  

  let argumentLength = 0;
  let emptyArray: Array<number> = [];
  for (let index = 0; index < args.daily_exercises.length; index++) {
    if(!isNaN(Number(args.daily_exercises[index]))){
        argumentLength=argumentLength+1;
        emptyArray=emptyArray.concat(Number(args.daily_exercises[index]));  
    }else{
     throw new Error('Malformatted parameters');
    }
}
    return({
      days: emptyArray,
      target: Number(args.target)
    });
};



interface Result2 {
  periodLength: number;
  trainingDays: number;
  average: number;
  target: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}



const exerciseCalculator = (args1: Result1): Result2 => {
let amountOfTrainingDays = 0;
for (let i = 0; i < args1.days.length; i++) {
    if(args1.days[i]>0){
        amountOfTrainingDays = amountOfTrainingDays+1;
    }
}

//const ArrayWithoutTargetValue = args.filter((o,i) => i!==0);
//console.log(ArrayWithoutTargetValue.length);
const averageTrainingHours = args1.days.reduce((total, number) => total + number, 0)/args1.days.length;
const targetHours = args1.target;
let trainingSuccess = false;
if(averageTrainingHours>=targetHours){
    trainingSuccess = true;
}
let ratingOfTraining=1;
let ratingDescrpitionOfTraining = 'not too bad but could be better';
if(trainingSuccess===true && averageTrainingHours<3){
    ratingOfTraining=2;
    ratingDescrpitionOfTraining = 'nice, I like';
}
if(trainingSuccess===true && averageTrainingHours >=3){
    ratingOfTraining=3;
    ratingDescrpitionOfTraining = 'great success';
}
    return(
        {
      periodLength: Number(args1.days.length),
      trainingDays: Number(amountOfTrainingDays),
      average: Number(averageTrainingHours),
      target: Number(targetHours),
      success: Boolean(trainingSuccess),
      rating: Number(ratingOfTraining),
      ratingDescription: String(ratingDescrpitionOfTraining)
    }
    );
};

export {exerciseCalculator, parseArguments2};
