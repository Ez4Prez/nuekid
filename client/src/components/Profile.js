import React, { useState } from 'react';

function Profile({ currentUser, setCurrentUser, users }) {

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

  function deleteUser() {
    fetch(`/users/${currentUser.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setCurrentUser(null)
        }
      })
  }


  function updateAddressInput(event) {
    setAddressInput(event.target.value)
  }


  return (
    <div className="profile-page">
      {currentUser ? <div className="container" id="profile-container">
        <div id="profile-wrap" className="card">
          <div id="profile-card-body" className="card-body">
            <h2 className="card-text">{currentUser.username}</h2>
            <h3 className="card-text">First Name: {currentUser.first_name}</h3>
            <h3 className="card-text">Last Name: {currentUser.last_name}</h3>
            <h3 className="card-text">Age: {currentUser.age}</h3>
            <input onChange={updateAddressInput} id="address-input" className="form-control" type="text" name="address" placeholder={currentUser.address} required />
            <div className="profile-btn-wrap" >
              <button className="btn btn-dark" onClick={updateAddress}> Update Address</button>
              <button className="btn btn-danger" onClick={deleteUser}>Delete Profile</button>
            </div>
          </div>
        </div>

      </div> : <h1>Please log in!</h1>}

    </div>


  )
}

export default Profile;