// import React from 'react'
import React, { useState, useEffect } from "react";
import TinderCards from "react-tinder-card";
import "./Cards.css";
import axios from 'axios';

function Cards() {
    
    const [profiles, setProfiles] = useState([
        // {
        //   name:"Tanay",
        //   img:"https://images.unsplash.com/photo-1647083237594-958754cb1cd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
        // },{
        //   name:"Jeff",
        //   img:"https://images.unsplash.com/photo-1640622308059-b9982ca75964?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        // },{
        //   name:"Bill",
        //   img:"https://images.unsplash.com/photo-1647168585205-e56ebb24a669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        // },{
        //   name:"Steve",
        //   img:"https://images.unsplash.com/photo-1647100106565-e7dfd88d96ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
        // }
      ]);

      const swiped = (direction, nameToDelete) => {
          console.log("removing : "+nameToDelete);
        //   setLastDirection(direction);
      }
      const outOfFrame = (name) => {
          console.log(name + " left the screen");
      }

      const setProfileVals = async () =>{
        try{
            console.log("Set Funciton Called");
            // let data = await fetch("/getAllProfiles",)
            let data = await axios.get("/getAllProfiles");
            // data = data.data.userProfiles;
            setProfiles(data.data.userProfiles);
            console.log(data.data.userProfiles[0]);
        }
        catch(err)
        {
            console.log(err);
        }
      }

      useEffect(() => {
          setProfileVals();
      }, []);

  return (
        <div className="tinderCards">
        <div className="tinderCards_cardContainer">
        {profiles.map((person)=>(
            <TinderCards 
            className="swipe"
            key={person.name}
            preventSwipe={["up","down"]}
            onSwipe={(dir)=>swiped(dir,person.name)}
            onCardLeftScreen={()=>outOfFrame(person.name)}
            >
            <div
            style={{backgroundImage: "url("+person.selectedFile+")"}}
            className="card">
                <h3>{person.name}</h3>
            </div>
            </TinderCards>
        ))}
        </div>
        </div>      
  )
}

export default Cards;