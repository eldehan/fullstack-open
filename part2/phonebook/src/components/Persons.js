const Persons = (props) => {
  const resultsToShow = props.resultsToShow
  return (
    <div>
      {resultsToShow.map(person => 
      <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default Persons