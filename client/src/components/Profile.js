import React, {useState} from 'react';

function Profile({currentUser, setCurrentUser, users}){

    const [addressInput, setAddressInput] = useState('')

    function updateAddress() {
        fetch(`/users/${currentUser.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            address: addressInput
          })
        })
        .then(res => {
          if (res.ok) {
            res.json()
            .then(user => setCurrentUser(user))
          }
        })
      }

      function deleteUser(){
        fetch(`/users/${currentUser.id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                setCurrentUser(null)
            }
        })
      }


      function updateAddressInput(event){
        setAddressInput(event.target.value)
      }


    return (
        <div>
           {currentUser ? <div className="container" id="profile-container">
                <h2>{currentUser.username}</h2>
                <h3>First Name: {currentUser.first_name}</h3>
                <h3>Last Name: {currentUser.last_name}</h3>
                <h3>Age: {currentUser.age}</h3>
                <input onChange={updateAddressInput} id="address-input" className="form-control" type="text" name="address" placeholder={currentUser.address} required />
                <button className="btn" onClick={updateAddress}> Update Address</button>
                <button className="btn" onClick={deleteUser}>Delete Profile</button>

            </div> : <h1>Please log in!</h1>}

        </div>
        

    )
}

export default Profile;