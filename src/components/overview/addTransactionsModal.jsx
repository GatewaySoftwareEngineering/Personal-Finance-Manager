import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddTransactionForm from "./addTransactionForm";
import classes from "./Overview.module.css";

const AddTransactionsModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <button className={classes.addTransBtn} onClick={handleShow}>
        Add Treansactions
      </button>

      {show ? (
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
         
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Transactions</Modal.Title>
          </Modal.Header>
          <Modal.Body><AddTransactionForm handleClose={handleClose}/></Modal.Body>
   
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddTransactionsModal;
