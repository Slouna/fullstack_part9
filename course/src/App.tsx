const App = () => {
  const courseName = "Half Stack application development";


const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName}/>
      <Content parts={courseParts}/>
      <Total totalExercises={totalExercises} />
    </div>
  );
};


  interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CourseWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CourseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CourseWithDescription {
  requirements: Array<string>;
  kind: "special"
}

interface CourseWithDescription extends CoursePartBase{
  description: string;
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Part = (props: PartProps) => {
  switch(props.part.kind){
    case "basic":
      return(
        <div><strong>{props.part.name} {props.part.exerciseCount}</strong>
        <p><i>{props.part.description}</i></p></div>
      );
    case "group":
      return(
        <div><strong>{props.part.name} {props.part.exerciseCount}</strong>
        <p>project exercises {props.part.exerciseCount}</p></div>
      );
    case "background":
      return(
        <div><strong>{props.part.name} {props.part.exerciseCount}</strong>
        <p><i>{props.part.description}</i></p>
        <p>submit to {props.part.backgroundMaterial}</p></div>
      )
    case "special":
      return(
        <div><strong>{props.part.name} {props.part.exerciseCount}</strong>
        <p><i>{props.part.description}</i></p>
        <p>required skills: {props.part.requirements.map(r => <>{r}, </>)}</p></div>
      )
  }
}

interface PartProps{
  part: CoursePart;
  
}

const Total = (props: TotalProps) => {
  return (
    <p>Number of exercises {props.totalExercises}</p>
  )
}

interface TotalProps{
  totalExercises: number;
}

const Content = (props: ContentProps) => {
  return(
    <div>
      {props.parts.map(part => <div key={part.name}>{<Part part={part} />}</div> )}
    </div>
  )

}

interface ContentProps {
  parts: Array<CoursePart>;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>

}

interface HeaderProps {
  courseName: string;
}

export default App;