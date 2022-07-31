import React, { useState, useEffect } from "react";
import Modal from "./Modal/modal";
function AddTransaction() {
  const [visibile, setVisibile] = useState(false);

  useEffect(() => {
    console.log("AddTransaction", visibile);
  }, [visibile]);
  return (
    <div
      style={{
        paddingTop: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "90%",
      }}
    >
      <div
        style={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <button
          className="add-button"
          onClick={() => {
            setVisibile(true);
          }}
        >
          Add Transaction
        </button>
        <Modal
          title="Add Transaction"
          onClose={() => setVisibile(false)}
          show={visibile}
        />
      </div>
    </div>
  );
}

export default AddTransaction;
