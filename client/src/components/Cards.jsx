import React, { useState, useEffect } from "react";
import TinderCards from "react-tinder-card";
import "./Cards.css";
import axios from "axios";

function Cards(myid) {
  const [profiles, setProfiles] = useState([]);

  const swiped = async (direction, IDToDelete) => {
    const swipe_REQ = {
      swipedBy: myid.myid,
      swiped: IDToDelete,
      direction: direction,
    };
    console.log(swipe_REQ);
    try {
      console.log(IDToDelete + " swiped left by " + myid.myid);
      const swipe_res = await axios.post('/swipe', swipe_REQ);
        console.log(swipe_res);
    } catch (err) {
      console.log(err);
    }
  };

  const outOfFrame = (id) => {
    console.log(id + " removed from the screen");
  };

  const setProfileVals = async () => {
    try {
      console.log("Set Funciton Called by "+myid.myid);
      let data = await axios.get("/getAllProfiles/"+myid.myid);
      console.log(data.data.userProfiles);
      setProfiles(data.data.userProfiles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setProfileVals();
  }, []);

  return (
    <div className="tinderCards">
      <div className="tinderCards_cardContainer">
        {profiles.map((person) => (
          <TinderCards
            className="swipe"
            key={person._id}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person._id)}
            onCardLeftScreen={() => outOfFrame(person._id)}
          >
            <div
              style={{ backgroundImage: "url(" + person.selectedFile + ")" }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCards>
        ))}
      </div>
    </div>
  );
}

export default Cards;
