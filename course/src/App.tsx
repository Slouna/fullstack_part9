const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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
      {props.parts.map(part => <p key={part.name}>{part.name} {part.exerciseCount}</p> )}
    </div>
  )

}

interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Array<Part>;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>

}

interface HeaderProps {
  courseName: string;
}

export default App;