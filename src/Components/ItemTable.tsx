import React from "react";

type TItemTableProps = {
  data: Record<string, string>;
  keyObj: string;
  letter: string;
};

const ItemTable = ({ data, keyObj, letter }: TItemTableProps) => {
  return (
    <td>
      {typeof data[`${letter}${keyObj.slice(1)}`] === "number"
        ? data[`${letter}${keyObj.slice(1)}`].toLocaleString()
        : data[`${letter}${keyObj.slice(1)}`]}
    </td>
  );
};

export default ItemTable;
