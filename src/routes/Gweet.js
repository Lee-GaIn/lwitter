import { dbService, storageService } from '../fBase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Gweet = ({gweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newGweet, setNewGweet] = useState(gweetObj.text);
    
    
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this gweet?");
        if (ok) {
            //delete gweet! 
            await dbService.doc(`gweets/${gweetObj.id}`).delete();
            if(gweetObj.attachmentUrl !== "" ){
                await storageService.refFromURL(gweetObj.attachmentUrl).delete();
                }
        }
    }

    const toggleEditing = () => {
        setEditing(prev => !prev);
    }

    const onChange = (event) => {
        const {target:{value}} = event;
        setNewGweet(value);

    };

    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.doc(`gweets/${gweetObj.id}`).update({
            text: newGweet,
        });

        setEditing(false);
    };

    return (
        <div key={gweetObj.id} className="nweet">
            {
                editing ? (<>
                            <form onSubmit={onSubmit} className="container nweetEdit">
                                <input onChange={onChange} type="text" placeholder='Edit your Gweet' value={newGweet} required autoFocus className="formInput"/>
                                <input type="submit" value="update" className="formBtn"/>
                            </form>
                            <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                            </>
                ) : (
                    <>
                    <h4>{gweetObj.text}</h4>
                    {gweetObj.attachmentUrl && <img src={gweetObj.attachmentUrl}/>}
                    {isOwner && (
                        <div class="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
                    )}
                    </>
                )
            }
            
        </div>
    );
};

export default Gweet;

