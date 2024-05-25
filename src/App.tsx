import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./App.css";
import { ButtonGroup, Container, Stack } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import Input from "./Components/Input";
import { ModalCustom } from "./Components/Modal";
import { readFile } from "./api/readFileFromUrl";
// import https from "https";
// import fs from "fs";

function App() {
  const [googleSheetsLink, setGoogleSheetsLink] = useState<string>("");
  const [googleDocsLink, setGoogleDocsLink] = useState<string>("");
  const [modalShow, setModalShow] = useState<boolean>(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Google Sheets Link:", googleSheetsLink);
    console.log("Google Docs Link:", googleDocsLink);
  };

  const onClickPreview = () => {
    setModalShow(true);
    readFile(googleDocsLink);
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Form onSubmit={(e) => handleSubmit(e)} className="gap-2 flex">
        <Input
          value={googleSheetsLink}
          onChange={setGoogleSheetsLink}
          label="Google Sheets Link"
          placeholder="Enter Google Sheets link"
          type="url"
          controlId="googleSheetsLink"
        />
        <Input
          value={googleDocsLink}
          onChange={setGoogleDocsLink}
          label="Google Docs Link"
          placeholder="Enter Google Docs link"
          type="url"
          controlId="googleDocsLink"
        />
        <Stack direction="horizontal" gap={3}>
          <Button className="mt-3" variant="primary" onClick={onClickPreview}>
            Предварительный просмотр
          </Button>
          <Button className="mt-3" variant="primary" type="submit">
            Получить файл
          </Button>
        </Stack>
        <ModalCustom show={modalShow} onHide={() => setModalShow(false)} />
      </Form>
    </Container>
  );
}

export default App;
