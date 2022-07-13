const Persons = (props) => {
  const resultsToShow = props.resultsToShow
  const handleDeleteButton = props.handleDeleteButton
  return (
    <div>
      {resultsToShow.map(person => 
      <p key={person.name}>{person.name} {person.number} <button onClick={handleDeleteButton}>delete</button></p>)}
    </div>
  )
}

export default Persons