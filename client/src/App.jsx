
import { useEffect, useState } from "react"
function App() {
const [people, setPeople] = useState( [])

  useEffect(()=>{
    const getPeople =async ()=>{

      const response = await fetch("/api/person")
      const people = await response.json()
      console.log(people)
      setPeople(people)
    }
getPeople()
  },[])
  return (
    <>
      <h1>welcome to the Movie app</h1>
      {people.map((person) => (
        <p>{person.name}</p>
      ))}
    </>
  )
}

export default App
