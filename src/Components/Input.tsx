import React, { FC } from "react";
import { Form } from "react-bootstrap";

type TInputProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  type: string;
  controlId: string;
};

const Input: FC<TInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  type = "url",
  controlId,
}) => {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default Input;
