import React, {useState} from 'react';

function HostEvent({updateFormData, submitItem}){

const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        
        <div class="container" id="host-event-container">
            {formSubmitted ? <h1 >Your event has been posted!</h1> 
            : 
            <form onSubmit={(event) => {
                event.preventDefault();
                submitItem(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }} >
                <input onChange={updateFormData} class="form-control" type="text" name="title" placeholder="Event Title" required />
                <input onChange={updateFormData} class="form-control" type="number" name="date_id" placeholder="Event Date" required />
                <input onChange={updateFormData} class="form-control" type="text" name="event_type" placeholder="Event Type" required />
                <input onChange={updateFormData} class="form-control" type="number" name="location_id" placeholder="Event Location" required />
                <input onChange={updateFormData} class="form-control" type="text" name="description" placeholder="Event Description" required />
                <input onChange={updateFormData} class="form-control" type="number" name="people_needed" placeholder="People Needed" required />
                
                <button class="btn btn-dark" type="submit">Post Event</button>
            </form>}
        </div>
    )

}

export default HostEvent;


                // <input type="text" name="size" placeholder="Size" required />
                // <input type="text" name="price" placeholder="Price" required />
                // <input type="text" name="condition" placeholder="Condition" required />