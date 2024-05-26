import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemTable from "./ItemTable";
import { Table } from "react-bootstrap";

const ExcelTable = ({
  data,
  index,
}: {
  data: Record<string, string>;
  index: number;
}) => {
  const uniqueLetters = useMemo(
    () => Array.from(new Set(Object.keys(data).map((key) => key.charAt(0)))),
    [data]
  );
  return (
    <div className="mb-5 w-100 overflow-auto">
      <h1 className="mb-4">Таблица{index}</h1>
      <Table striped bordered hover>
        <tbody>
          {Object.keys(data)
            .filter((key) => /^A\d+$/.test(key))
            .map((key, index) => (
              <tr key={index}>
                <td>{data[key]}</td>
                {uniqueLetters.map((letter, index) => (
                  <ItemTable
                    keyObj={key}
                    key={index}
                    data={data}
                    letter={letter}
                  />
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExcelTable;
