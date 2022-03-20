import React, { useEffect, useState } from "react";
import axios from "axios";
const Rank = () => {
const [ rank, setRank ] = useState([]);

  const callRankPage = async () => {
    let data;
    try {
      data = await axios.get("/leaderboard");
      setRank(data.data.rankList);
    } catch (err) {
      console.log(err);
      console.log("Unsuccesful operation");
    }
    setRank(data.data.rankList);
  };
  useEffect(() => {
    callRankPage();
  }, []);

  return (
    <>
      <h1>This is a Test Component</h1>
      {rank.map((ranks) =>(
          <div>
            <h4>{ranks.name}:{ranks.score}</h4>
          </div>
      ))}
    </>
  );
};
export default Rank;
