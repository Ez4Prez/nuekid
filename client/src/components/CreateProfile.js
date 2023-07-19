import React, { useState } from 'react';

function CreateProfile({setCurrentUser, }) {

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formInput, setFormInput] = useState({
        username: "",
        password_hash: "",
        first_name: "",
        last_name: "",
        address: "",
        age: 0,
    })

    function updateFormData(event) {
        if (event.target.name === "age") {
            return setFormInput({
                ...formInput, [event.target.name]: Number(event.target.value)
            })
        }
        else (setFormInput({ ...formInput, [event.target.name]: event.target.value }))
    }


    function createUser(event) {
        event.preventDefault()
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formInput)
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(user => setCurrentUser(user))
                }
            })
    }



    return (
        <div id="create-profile-div">
            <div className="create-profile-container" >
                
                    {formSubmitted ? <h1 >Your profile has been created!</h1>
                        :
                        <form className="create-profile-form" onSubmit={(event) => {
                            createUser(event)
                            setFormSubmitted(formSubmitted => !formSubmitted)
                        }} >
                            <label for="username" className="form-label">Username</label>
                            <input onChange={updateFormData} className="form-control" type="text" name="username"  required />
                            <label for="password" className="form-label">Password</label>
                            <input onChange={updateFormData} className="form-control" type="password" name="password"  required />
                            <label for="first_name" className="form-label">First Name</label>   
                            <input onChange={updateFormData} className="form-control" type="text" name="first_name"  required />
                            <label for="last_name" className="form-label">Last Name</label>
                            <input onChange={updateFormData} className="form-control" type="text" name="last_name"  required />
                            <label for="age" className="form-label">Age</label>
                            <input onChange={updateFormData} className="form-control" type="text" name="age"  required />
                            <label for="Address" className="form-label">Address</label>
                            <input onChange={updateFormData} className="form-control" type="text" name="address"  required />
                            <button className="btn btn-dark" type="submit">Sign me up!</button>
                        </form>}
                
            </div>

        </div>
    )



}

export default CreateProfile;