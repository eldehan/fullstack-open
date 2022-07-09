const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
   <>
    <h1>Greetings</h1>
    <Hello name="Hans" age={26 + 3} />
    <Hello name={name} age={age}/>
    <Hello name="Launch School"/>
   </>
  )
}

export default App