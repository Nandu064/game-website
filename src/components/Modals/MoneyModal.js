import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const MoneyModal = (props) => {
  return (
    <Modal isOpen={props?.show} toggle={props?.toggle}>
      <ModalHeader toggle={props?.toggle}>Alert!!</ModalHeader>
      <ModalBody>{props?.message}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props?.onOkay}>
          {props?.OkayButtonLabel}
        </Button>
        {props?.isCancel && (
          <Button color="primary" type="submit" onClick={props?.onCancel}>
            Cancel
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default MoneyModal;
