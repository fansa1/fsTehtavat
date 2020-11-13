
type argumentParserResult = Array<number> | undefined;

const parseArguments1 = (args: Array<string>): argumentParserResult => {

      //console.log(args)
    //console.log(args.length)
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

    if(isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
    throw new Error('Provided values were not numbers');
  }
   if(!(Number(args[0])>0 && Number(args[1])>0)){
   throw new Error('Value for weight or height is missing');
  }

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))){
    //console.log("onnistui");
    return(
      [Number(args[0]),Number(args[1])]
     );}else{
       return(
         undefined
       );}
};

const calculateBmi = (a: number, b: number):string => {
       const bmi = b/(a/100)/(a/100);
       console.log(bmi);
       if(bmi<19){
           return("Abnormal (under weight)");
       }
       else if(bmi>=19 && bmi<=25){
           return("Normal (healthy weight)");
       }
       else if(bmi>25){
            return("Abnormal (over weight)");
       }
       else{
         return '';
       }
};


export {calculateBmi, parseArguments1};
