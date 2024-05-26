import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./App.css";
import { ButtonGroup, Container, Stack } from "react-bootstrap";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Input from "./Components/Input";
import { ModalCustom } from "./Components/Modal";
import { file, readFile, readFileFromUrl } from "./api/readFileFromUrl";
import * as XLSX from "xlsx";
import { returnCell } from "./utils/returnСell";
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from "docx";
import NewUpdatedFile from "./Components/NewUpdatedFile";
const fs = require("fs");
const { createReport } = require("docx-templates");

const template = fs.readFileSync("template.docx");
// https://docs.google.com/spreadsheets/d/1JoLAETB4v7Qo5FSnSXzKjFAnSflFo456/edit?usp=drive_link
// https://docs.google.com/document/d/1HW2UK2nPiWZdKsDcsiFZsWLhGTDuGt6e/edit?usp=drive_link
// AIzaSyBN-1emrIXRpO8hJCcrdNbK0peceIHaS7g
function App() {
  const [xlsxFileParse, setXlsxFileParse] = useState<any>({});
  const [googleDocsLink, setGoogleDocsLink] = useState<string>("");
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [dataTableModal, setdataTableModal] = useState<any[]>([]);
  const [result, setResult] = useState<string[] | string[][] | undefined>([]);

  useEffect(() => {
    readFile(googleDocsLink, dataTableModal).then((data) => {
      setResult(data);
    });
  }, [dataTableModal, googleDocsLink]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = [
      ["Name", "Age", "City"],
      ["John", "25", "New York"],
      ["Jane", "30", "London"],
      ["Bob", "35", "Paris"],
    ];
    const data1 = {
      excelTable: (
        <NewUpdatedFile dataTableModal={dataTableModal} result={result} />
      ),
    };

    const buffer = createReport({
      template,
      data1,
    });

    fs.writeFileSync("output.docx", buffer);
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph("Data from React component"),
            new Table({
              rows: data.map((row) => {
                return new TableRow({
                  children: row.map((cell) => {
                    return new TableCell({
                      children: [new Paragraph(cell)],
                    });
                  }),
                });
              }),
            }),
          ],
        },
      ],
    });

    const packer = new Packer();
    const blob = await Packer.toBlob(doc);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "file.docx";
    a.click();
    console.log("Google Docs Link:", googleDocsLink);
  };

  const onChangeLinkWord = (e: ChangeEvent<HTMLInputElement>) => {
    setGoogleDocsLink(e.target.value);
    e.preventDefault();
  };
  const onChangeFileXlsx = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;
    const file = e.target.files[0];

    const data = await file.arrayBuffer();
    const arr = new Uint8Array(data);
    const workbook = XLSX.read(arr, { type: "array" });
    setXlsxFileParse(workbook);
  };
  const onClickPreview = useCallback(async () => {
    const result = (await readFile(googleDocsLink)) as string[][];
    if (result) {
      setdataTableModal(
        returnCell({ data: xlsxFileParse.Sheets, cells: result })
      );
      setModalShow(true);
    }
    console.log(dataTableModal);
  }, [dataTableModal, googleDocsLink, xlsxFileParse.Sheets]);
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className="gap-2 d-flex flex-column"
      >
        <Input
          onChange={(e) => onChangeFileXlsx(e as ChangeEvent<HTMLInputElement>)}
          label="Google Sheets Link"
          placeholder="Enter Google Sheets link"
          type="file"
          controlId="googleSheetsLink"
        />
        <Input
          value={googleDocsLink}
          onChange={onChangeLinkWord}
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
        <ModalCustom
          googleDocsLink={googleDocsLink}
          dataTableModal={dataTableModal}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Form>
    </Container>
  );
}

export default App;
