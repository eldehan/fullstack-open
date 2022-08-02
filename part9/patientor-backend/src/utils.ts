import { NewPatient, Gender } from './types'

const isString = (text:unknown):text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseName = (name:unknown):string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name
}

const parseOccupation = (occupation:unknown):string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation
}

const parseSSN = (ssn:unknown):string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }

  return ssn
}

const isDate = (date:string):boolean => {
  return Boolean(Date.parse(date));
}

const parseDate = (date:unknown):string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error ('Incorrect or missing date');
  }
  return date;
}

const isGender = (gender:any):gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender:any):string => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
}

const toNewPatient = (object: any):NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
}

export default toNewPatient