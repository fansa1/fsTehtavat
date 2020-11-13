import diagnoseData from '../../data/diagnoses';
import { Diagnosis} from '../types/types';


const getEntries = (): Array<Diagnosis> => {
  
  return diagnoseData;
};


//const addEntry = () => {
//  return null;
//};

export default getEntries;
  