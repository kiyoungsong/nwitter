import React, { useState } from "react";
import { dbService, storageService } from "../fBase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      // Delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = ({ target: { value } }) => {
    setNewNweet(value);
  };
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {nweetObj.attachmentUrl && (
        <img src={nweetObj.attachmentUrl} height="50px" widht="50px" />
      )}
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  onChange={onChange}
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
