
import {useEffect, useState} from "react"


function Meet({users, currentUser}) {

    const [friendList, setFriendList] = useState([]);

    const filteredUsers = users.filter(user => user.id !== currentUser.id);

    useEffect(() => {
        const storedFriendList = JSON.parse(localStorage.getItem('friendList'));
        if (storedFriendList) {
            setFriendList(storedFriendList);
        }
    }, []);

    const handleAddFriend = (user) => {
        if (!friendList.some(friend => friend.id === user.id)) {
          const updatedFriendList = [...friendList, user];
          setFriendList(updatedFriendList);
          localStorage.setItem('friendList', JSON.stringify(updatedFriendList));
        }
      };

    const handleUnfriend = (friend) => {
        const updatedFriendList = friendList.filter(f => f.id !== friend.id);
        setFriendList(updatedFriendList);
        localStorage.setItem('friendList', JSON.stringify(updatedFriendList));
      };

      


    return (
        <div id="meet">

        <div id="meet-page-container" className="container">

            <div class="container" id="meet-container">
                <h2>Folks near you...</h2>
                <div id="users-near-wrap">
                {filteredUsers.map(user => (<div class="card" id="meet-card">
                    <div class="card-body">
                        <h3 class="card-text">{user.username}</h3>
                        <h4 class="card-title">Age: {user.age}</h4>
                        <h4 class="card-text">Location: Brooklyn, NY</h4>
                        <button class="button" id="event-container-btn" onClick={() => {
                            handleAddFriend(user);
                        }} >
                            + Add Friend
                        </button>
                    </div>
                </div>
                ))}
                </div>
            </div>
 
            <div class="container" id="friends-list">
                <h2>Friends ({friendList.length})</h2>
                {friendList.map(friend => (
                <div class="card" key={friend.id} id="friend-card">
                 <div class="card-body">
                    <h3 class="card-title">{friend.first_name} {friend.last_name}</h3>
                    <h4 class="card-subtitle">{friend.address}</h4>
                    <button id="unfriend-btn"class="button" onClick={()=>{handleUnfriend(friend)}}>-Unfriend</button>
                    <button id="message-btn" class="button">Message</button>
                 </div>
                </div>
                ))}
             </div> 

        </div>

        </div>

    )




}

export default Meet;