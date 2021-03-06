import React from "react";
import Alert from "react-bootstrap/Alert";

export default function Error({ error }) {
  return (
    <Alert variant="danger" className="my-2">
      {error}
    </Alert>
  );
}
