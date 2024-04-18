import React, {useState} from 'react';

function HostEvent({updateFormData, submitEvent}){

const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <div className="host-event-page">
        <div class="container" id="host-event-container">
            {formSubmitted ? <h1 className="host-event-posted">Your event has been posted!</h1> 
            : 
            <div className="host-wrap">
                <h2 className="navbar-brand" id="host-header">...Host an event on Nue Kid!</h2>
            <form className="host-form" onSubmit={(event) => {
                event.preventDefault();
                submitEvent(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }} >

                            <label for="username" className="form-label">Event Title</label>
                            <input onChange={updateFormData} className="form-control" type="text" name="title"  required />
                            <label for="password" className="form-label">Event Date</label>
                            <input onChange={updateFormData} className="form-control" type="number" name="date_id"  required />
                            <label for="first_name" className="form-label">Event Type</label>   
                            <input onChange={updateFormData} className="form-control" type="text" name="event_type"  required />
                            <label for="last_name" className="form-label">Location</label>
                            <input onChange={updateFormData} className="form-control" type="number" name="location_id"  required />
                            <label for="age" className="form-label">Description</label>
                            <input onChange={updateFormData} className="form-control" type="text" name="description"  required />
                            <label for="Address" className="form-label">People needed</label>
                            <input onChange={updateFormData} className="form-control" type="number" name="people_needed"  required />
                            <button id="host-btn" className="btn btn-dark" type="submit">Post it!</button>
                        </form>
                {/* <input onChange={updateFormData} class="form-control" type="text" name="title" placeholder="Event Title" required />
                <input onChange={updateFormData} class="form-control" type="number" name="date_id" placeholder="Event Date" required />
                <input onChange={updateFormData} class="form-control" type="text" name="event_type" placeholder="Event Type" required />
                <input onChange={updateFormData} class="form-control" type="number" name="location_id" placeholder="Event Location" required />
                <input onChange={updateFormData} class="form-control" type="text" name="description" placeholder="Event Description" required />
                <input onChange={updateFormData} class="form-control" type="number" name="people_needed" placeholder="People Needed" required />
                
                <button class="btn btn-dark" type="submit">Post Event</button>
            </form> */}
            </div>
            
            }
        
        </div>
        </div>
    )

}

export default HostEvent;


                // <input type="text" name="size" placeholder="Size" required />
                // <input type="text" name="price" placeholder="Price" required />
                // <input type="text" name="condition" placeholder="Condition" required />