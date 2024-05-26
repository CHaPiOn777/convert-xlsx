import React, { FC } from "react";
import { Container, Row } from "react-bootstrap";
import ExcelTable from "./ExcelTable";

type TPropsNewFile = {
  dataTableModal: any[];
  result?: string[] | string[][];
};

const NewUpdatedFile: FC<TPropsNewFile> = ({ dataTableModal, result }) => {
  return (
    <Container>
      <Row>
        {result?.map(
          (item, index) =>
            index >= 1 &&
            !item.includes("Таблиц") &&
            !item.includes("object") && <p>{item}</p>
        )}
      </Row>

      {dataTableModal.map((item, index) => {
        if (typeof item === "object") {
          return <ExcelTable key={index} index={index} data={item} />;
        }
      })}
    </Container>
  );
};

export default NewUpdatedFile;
