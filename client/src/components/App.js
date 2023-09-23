import MapPage from './MapPage'
import NavBar from './NavBar'
import HostEvent from './HostEvent'
import MyActivities from './MyActivities'
import Meet from './Meet'
import Login from './Login'
import CreateProfile from './CreateProfile'
import Profile from './Profile'
// import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

import {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom';


function App() {


const [locations, setLocations] = useState([])
const [events, setEvents] = useState([])
const [users, setUsers] = useState([])
const [currentUser, setCurrentUser] = useState(null)
const [searchText, setSearchText] = useState("")
const [formInput, setFormInput] = useState({
  title: "",
  description: "",
  event_type: "",
  people_needed: "",
  space_available: "",
  location_id: 1,
  date_id: 1
})

// This worked!!! So we just need to populate this from LocalStorage
const fakeActivity = [{
  id: 123,
  title: "Can",
  location: "this",
  description: "work",
  date: "now",
}]
// const [activities, setActivities] = useState(fakeActivity)

const populateInitialActivities = () => {
  const storedActivities = localStorage.getItem('activities');
  // if nothing is locally stored
  if (!storedActivities) {
  // then populate an empty state (useState([]))
    return [];
  // otherwise
  } else {
  // populate whatever's currently locally stored as our initial useState
    return JSON.parse(storedActivities)
  }
}

const [activities, setActivities] = useState(populateInitialActivities)     

useEffect(() => {
  fetch('/current_session')
  .then(res => {
    if (res.ok) {
      res.json()
      .then(user => setCurrentUser(user))
    }
  })
}, [])


function attemptedLogin(userInfo) {
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
  .then(res => {
    if (res.ok) {
      res.json()
      .then(user => setCurrentUser(user))
    }
  })
}




useEffect(() => {
  fetch("/locations")
  .then(resp => resp.json())
  .then(locationsData => setLocations(locationsData))
},[])

useEffect(() => {
  fetch("/events")
  .then(resp => resp.json())
  .then(eventsData => setEvents(eventsData))
},[])

useEffect(() => {
  fetch("/users")
  .then(resp => resp.json())
  .then(usersData => setUsers(usersData))
},[])


useEffect(() => {
  // Load activities from localStorage on component mount
  const storedActivities = localStorage.getItem('activities');
  if (storedActivities) {
    setActivities(JSON.parse(storedActivities));
  }
}, []);

useEffect(() => {
  // Save activities to localStorage whenever it changes
  localStorage.setItem('activities', JSON.stringify(activities));
}, [activities]);

const addToMyActivities = (event) => {
  const activity = {
    id: event.id,
    title: event.title,
    location: event.location,
    description: event.description,
    date: event.date,
  };

  setActivities((prevActivities) => [...prevActivities, activity]);
};

const renderEventDateDay = (eventDateDayString) => {
  const dateDayArray = eventDateDayString.split(",")
  dateDayArray[1] = Number(dateDayArray[1]) + 1
  return [...dateDayArray].reverse().join("-");
}

function submitItem(event){
  event.preventDefault()
  console.log({...formInput, user_id: currentUser.id})
  fetch("http://127.0.0.1:7000/events",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({...formInput, user_id: currentUser.id})
  })
    .then(resp => resp.json())
    .then(newEvent => setEvents([...events, newEvent]))
}

function updateFormData(event){
  if (event.target.name === "location_id" || event.target.name === "people_needed" || event.target.name === "date_id"){ 
    return setFormInput({...formInput, [event.target.name]: Number(event.target.value)
     })}
  else (setFormInput({...formInput, [event.target.name]: event.target.value}))
}

function updateSearchText(event) {
  setSearchText(event.target.value)
}

const filteredEvents = events.filter(event => {
  if (searchText === "") {
    return true
  }
  return event.title.toLowerCase().includes(searchText.toLowerCase()) || event.event_type.toLowerCase().includes(searchText.toLowerCase())
})



  return (
    <div className="App">
      { currentUser ? <NavBar updateSearchText={updateSearchText} setCurrentUser={setCurrentUser} /> : null}
      <Switch>
        <Route path='/profile'>
          <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} users={users}/>
        </Route>
        <Route path="/meet">
          <Meet users={users} currentUser={currentUser} />
        </Route>
        <Route path='/host-event'>
          <HostEvent submitItem={submitItem} updateFormData={updateFormData} />       
        </Route>
        <Route path="/my-activities">
          <MyActivities activities={activities} setActivities={setActivities} addToMyActivities={addToMyActivities} renderEventDateDay={renderEventDateDay}/>
        </Route>
        <Route path="/create-profile">
          <CreateProfile setCurrentUser={setCurrentUser} />
        </Route>
        <Route exact path="/">
          {currentUser ? 
          <MapPage locations={locations} events={filteredEvents} activities={activities} addToMyActivities={addToMyActivities} renderEventDateDay={renderEventDateDay}/>
          : 
          <Login attemptedLogin={attemptedLogin} />} 
        </Route>
      </Switch>

    </div>
  );
}

export default App;






// useEffect(() => {
//   fetch("http://localhost:3000/items")
//   .then(resp => resp.json())
//   .then(itemsData => setItems(itemsData))
// },[])


// function submitItem(event){
//   event.preventDefault()
//   fetch("http://localhost:3000/items",{
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       "accept": "application/json"
//     },
//     body: JSON.stringify(formInput)
//   })
//     .then(resp => resp.json())
//     .then(newItem => setItems([...items, newItem]))
// }

// function addToCart(item) {
//   setCart([...cart, item])
// }

// function removeFromCart(id) { 
//  setCart(cart.filter(cartItem => {
//   return cartItem.id !== id
//  }))
// }

// function updateFormData(event){
//   if (event.target.name === "price") { 
//     return setFormInput({...formInput, [event.target.name]: Number(event.target.value)
//      })}
//   else (setFormInput({...formInput, [event.target.name]: event.target.value}))
// }
