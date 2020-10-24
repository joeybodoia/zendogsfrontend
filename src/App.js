import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  // Variable to hold url
  const url = "https://jb-zendogsbackend.herokuapp.com"
  // state to hold dogs
  const [dogs,setDogs] = React.useState([])
  // create empty dog
  const emptyDog = {
    name: "",
    age:0,
    img: ""
  }

  // selectedDog state, this will represent dog to be edited
  const [selectedDog, setSelectedDog] = React.useState(emptyDog)


  // function to get dogs from API
  const getDogs = () => {
    fetch(url+"/dog")
    .then(response => response.json())
    .then(data => {
      setDogs(data)
    })
  }
  // useEffect to do intiial fetch of dogs
  React.useEffect(() => {
    getDogs()
  },[])

  // handleCreate function for creating new dogs
  const handleCreate = (newDog) => {
    fetch(url+"/dog", {
      method:"post",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(newDog),
    }).then(response=>{
      getDogs()
    })
  }

  // handleUpdate function for when you use the updateform
  const handleUpdate = (dog) => {
    fetch(url+"/dog/" + dog._id, {
      method: "put",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dog)
    })
    .then((response) => getDogs())
  }

  // set the state when you select a dog to edit

  const selectDog = (dog) => {
    setSelectedDog(dog)
  }

  // function to delete dog
  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete"
    })
    .then((response) => getDogs())
  }



  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add New Dog</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} selectDog = {selectDog} dogs = {dogs} deleteDog={deleteDog}/>} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
