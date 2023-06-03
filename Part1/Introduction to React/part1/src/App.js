const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello World {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Yogesh';
  const age = 25;
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Anonymous' age='unknown'/>
      <Hello name= {name} age = {age}/>
    </div>
  )
}

export default App