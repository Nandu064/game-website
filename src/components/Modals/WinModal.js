import React from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  Col,
  // Alert,
  Row,
} from "reactstrap";

const WinModal = (props) => {
  return (
    <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>You Won!!</ModalHeader>
      <ModalBody>
        Tada ! You won ${props.finalAmount}. Do you want to continue?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.continueHandler}>
          Continue
        </Button>
        <Button color="primary" type="submit" onClick={props.cancelHandler}>
          Cancel
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default WinModal;
