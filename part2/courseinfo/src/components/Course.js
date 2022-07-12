const Subheader = ({title}) => {
  return (
    <h2>{title}</h2>
  )
}

const Total = ({ total }) => {
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Part = ({ name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = (props) => {
  const { parts } = props
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Course = (props) => {
  const { course } = props

  const total = course.parts.reduce((sum, currentPart) => {
    return sum += currentPart.exercises
  }, 0)

  return (
    <div>
      <Subheader title={course.name}/>
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}



export default Course