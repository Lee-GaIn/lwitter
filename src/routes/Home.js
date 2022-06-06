import React, { useEffect, useState } from 'react';
import { dbService } from '../fBase';
import Gweet from './Gweet';
import GweetFactory from '../components/GweetFactory';

const Home = (userObj) => {
    const [gweets, setGweets] = useState([]);

    useEffect(()=>{
        //snapshot: db의 모든 정보를 담고 있음.
        /*init all gweets on the DB*/
        dbService.collection("gweets").onSnapshot((snapshot) => {
            const gweetArray = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
            setGweets(gweetArray);       
        })},[]);

    return (
        <div className="container">
            <GweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
                {gweets.map((gweet) => (
                    <Gweet key={gweet.id} gweetObj={gweet} 
                            isOwner={gweet.creatorId === userObj.userObj.uid}/>
                ))}
            </div>
        </div>
    );
};


export default Home;