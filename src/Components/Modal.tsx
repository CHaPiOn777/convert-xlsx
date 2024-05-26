import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ExcelTable from "./ExcelTable";
import { readFile } from "../api/readFileFromUrl";
import { Container, Row } from "react-bootstrap";
import NewUpdatedFile from "./NewUpdatedFile";

interface ModalCustomProps {
  show: boolean;
  onHide: () => void;
  size?: string;
  dataTableModal: any[];
  centered?: boolean;
  googleDocsLink: string;
}

export const ModalCustom = (props: ModalCustomProps) => {
  const { googleDocsLink, dataTableModal } = props;
  const [result, setResult] = useState<string[] | string[][] | undefined>([]);

  useEffect(() => {
    readFile(googleDocsLink, dataTableModal).then((data) => {
      setResult(data);
    });
  }, [dataTableModal, googleDocsLink]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {result && result[0]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewUpdatedFile dataTableModal={dataTableModal} result={result} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal;
