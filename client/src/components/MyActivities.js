
import React, {useState, useEffect} from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from 'date-fns/locale/en-US';
import "react-big-calendar/lib/css/react-big-calendar.css"


const locales = {
    "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// const events = [
//     {
//        title: "Meeting @ Prospect Park",
//        start: new Date(2023,6,15),
//        end: new Date(2023,6,15)
//     },
//     {
//         title: "Graduation",
//         start: new Date(2023,6,20),
//         end: new Date(2023,6,21)
//     }
// ]

const serveActivityDataToCalendar = (activity) => {
    let calendarActivityTitle = activity.title;
    let activityDateArray = [...activity.date.day.split(",")]
    let calendarActivityDate = new Date(
        Number(activityDateArray[0]), 
        Number(activityDateArray[1]), 
        Number(activityDateArray[2])
    )
    const calendarActivityObject = {
        title: calendarActivityTitle,
        start: calendarActivityDate,
        end: calendarActivityDate
    }
    return calendarActivityObject
}


function MyActivities ({activities, setActivities, renderEventDateDay}){


      
    const [newEvent, setNewEvent] = useState({
        title:"",
        start: "",
        end:"",
    })
//     const [allEvents, setAllEvents] = useState(events)

    const handleAddEvent = () => {
        const { title, start, end } = newEvent;
        if (title && start && end) {
          const event = {
            title,
            start,
            end,
          };

          setActivities(activities)
        //   setActivities((prevActivities) => [...prevActivities, event]);
//         setAllEvents([...allEvents, event]);
          setNewEvent({
            title: "",
            start: null,
            end: null,
          });
         }
       };

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

    const handleRemoveActivity = (activityId) => {
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity.id !== activityId)
        );
    };



    return (
        <div id="my-activities">
        <div class="container" id="my-activities-container">
            <div class="container" id="my-activities-list">
            <h3 className="my-activities-header">My activities...</h3>
                <div className="activity-wrap">
                {activities.map(activity => (
                <div class="card" key={activity.id} id="activity-card">
                    <div class="card-body">
                        <h3 class="card-title">{activity.title}</h3>
                        <h3 class="card-subtitle">{activity.location.name}</h3>
                        <div class="card-text">{activity.description}</div>
                        <h4 className="card-text">{renderEventDateDay(activity.date.day)} @ {activity.date.time}</h4>
                        <button class="button" onClick={() => handleRemoveActivity(activity.id)}>
                            Cancel Activity
                        </button>
                    </div>
                </div>
                ))}
                </div>

            </div>

            </div>

     
           
            <Calendar
              localizer={localizer}
              events = {activities.map((activity) => {return serveActivityDataToCalendar(activity)})}
              startAccessor="start" 
              endAccessor="end"
              style={{height: 600, margin: "50px", width: 800}}   
            />

        

        </div>   
    )
}

export default MyActivities;




//add event function (not working yet)
/* <h2>Add a Note</h2>
<div>
<input 
    type="text" 
    placeholder="...scribble away" 
    value={newEvent.title} 
    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
    />
<DatePicker placeholderText="start" selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
<DatePicker placeholderText="end" selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
<button onClick={handleAddEvent}>
    Add Note
</button>
</div> */





//old code

//     const [checkedOut, setCheckedOut] = useState(false)

//     function toggleCheckOut(){
//         setCheckedOut(checkedOut => !checkedOut)
//     }

//     const priceArray = cart.map(cartItem => {
//         return Number(cartItem.price) 
//     })
   
//     let sum = 0
//     for(let price of priceArray){ 
//         sum  = sum +  price
        
//     }
    

//     if(checkedOut){
//      return (
//         <div className="cart">
            
//              <h1 className="order-confirmation" >Thank you for your purchase! your order is being processed</h1>
           
//         </div>
//      )           
//     }else{
//         return(
// <div className="cart">
            
//            <ul className="cart-list" >
//                 {cart.map(cartItem => {
//                 return <CartItem key={cartItem.id} cartItem={cartItem} removeFromCart={removeFromCart} />
//             })}</ul>
            
//             <h4 className="cart-total" >Cart Total:${sum}</h4>
//             <button class="btn btn-dark" onClick={toggleCheckOut} >CHECK OUT</button> 
            
//         </div>
//         )
//     }