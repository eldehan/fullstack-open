const Filter = (props) => {
  const {newFilter, handleFilterInput} = props
  return (
    <div>
      filter shown with <input value={newFilter || ''} onChange={handleFilterInput}/>
    </div>
  )
}

export default Filter