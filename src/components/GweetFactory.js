import React, {useState} from 'react';
import {v4 as uuidv4} from "uuid"
import { collection, addDoc, } from "firebase/firestore"
import { dbService, storageService } from '../fBase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const GweetFactory = ({userObj}) => {
    const [gweet, setGweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        if (gweet === "") {
            return;
        }
        let attachmentUrl = "";
        if(attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url")
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const gweetObj = {
            text: gweet,
            createdAt: Date.now(),
            /*store who wrote this tweet */
            creatorId: userObj.userObj.uid,
            attachmentUrl,
        }

        /*add whatever data you want */
        await addDoc(collection(dbService, "gweets"), gweetObj);
        setGweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {target:{value},} = event;
        setGweet(value);
    };

    const onFileChange = (event) => {
        const {target:{files},} = event;
        const theFile = files[0]; // my file

        //try to read file
        const reader = new FileReader();
        reader.readAsDataURL(theFile);//get data by url
        reader.onloadend = (finishedEvent) => { // it is called after reader loads data
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        };
    };

    const onClearAttachment = () => setAttachment("");
    
    return(
        <form onSubmit={onSubmit} className="factoryForm">
        <input value = {gweet}
                type="text" 
                onChange={onChange}
                placeholder="what's on your mind?"
                maxLength={120} 
                className="factoryInput__container"/>
        <input onChange = {onFileChange} type="file" accept="image/*" />
        <input type="submit" value="Gwitt!" className="factoryInput__arrow"/>
        <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }} />


        {attachment && (
            <div className="factoryForm__attachment">
                <img src={attachment}  style={{
              backgroundImage: attachment,
            }}/>
            <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>)}
    </form>
    );
};

export default GweetFactory;