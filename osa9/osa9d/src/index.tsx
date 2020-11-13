import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBase2 extends CoursePartBase{
  description: string;
}

interface CoursePartOne extends CoursePartBase2 {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase2 {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase2 {
   name: "Typescript basics";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

type CourseParts = {courseParts: CoursePart[]}

const assertNever = (value: never): never => {
  throw new Error(
  `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const Header = ({name}: {name: string}): JSX.Element => {
return(
<h1>{name}</h1>
)};
 


const Part = (courseParts: CoursePart[]): CoursePart[] => {

  courseParts.forEach(part => {
  switch (part.name) {
    case "Fundamentals":
    break;
    case "Using props to pass data":
    break;
    case "Deeper type usage":
    break;
    case "Typescript basics":
    break;
    default:
    return assertNever(part);
  }})
return(
  courseParts
)
}


const Content: React.FC <CourseParts> = ({courseParts})=> {
  return(
    <div>
    {Part(courseParts).map(o=>{
      return(
      <p key={o.name}>
      {o.name} {o.exerciseCount}
      </p>
      )})}
    </div>
  )}


const App: React.FC = () => {

  const courseName = "Half Stack application development";

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
    {
    name: "Typescript basics",
    exerciseCount: 12,
    description: "Something completely different"
  },
];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
    </div>
  )
};


ReactDOM.render(<App />, document.getElementById("root"));