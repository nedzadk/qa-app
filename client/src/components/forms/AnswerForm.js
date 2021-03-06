import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextArea from "./components/TextArea";
import Button from "react-bootstrap/Button";

const answerSchema = Yup.object().shape({
  answer: Yup.string()
    .min(24, "Too Short!")
    .required("Required")
});

class AnswerForm extends React.Component {
  submit = async (values, { resetForm }) => {
    const { handleClose, onSubmit, mode, questionId, answer } = this.props;
    if (mode === "edit") {
      await onSubmit(questionId, answer.id, { text: values.answer });
      handleClose();
    }
    onSubmit(questionId, { text: values.answer });
    resetForm();
  };

  render() {
    const { answer, mode = "add", loggedIn } = this.props;
    return (
      <Formik
        initialValues={{
          answer: mode === "edit" ? answer.text : ""
        }}
        validationSchema={answerSchema}
        onSubmit={this.submit}
        render={({ isSubmitting }) => {
          return (
            <Form className="d-block">
              <Field
                disabled={!loggedIn}
                type="text"
                name="answer"
                placeholder="Answer the question"
                component={TextArea}
              />

              <Button variant="success" type="submit" disabled={!loggedIn}>
                {mode[0] + mode.slice(1)} answer
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

export default AnswerForm;
