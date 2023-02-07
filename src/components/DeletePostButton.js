import React, { useState } from "react";

const DeletePostButton = ({ onConfirm }) => {
  const [canDelete, setCanDelete] = useState(false);

  return (
    <div className="delete-post-btn">
      {canDelete ? (
        <>
          <button onClick={() => onConfirm(true)}>Yes</button>
          <button onClick={() => setCanDelete(false)}>No</button>
        </>
      ) : (
        <button onClick={() => setCanDelete(true)}>Delete</button>
      )}
    </div>
  );
};

export default DeletePostButton;
