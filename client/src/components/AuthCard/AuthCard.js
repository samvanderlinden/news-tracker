import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import classes from "./AuthCard.module.css";

const AuthCard = (props) => {
  return (
    <div className={classes.container}>
      <Form onSubmit={props.submit} className={classes.card}>
        <span className={classes["card-header"]}>
          {props.header.toUpperCase()}
        </span>
        <div className={classes.inputs}>
          {props.children}

          <Button type="submit" className={classes["submit-button"]}>
            Submit
          </Button>
          <br />
          <Link to={`/${props.mainScreen}`} className={classes["text-link"]}>
            Go to{" "}
            {props.mainScreen.charAt(0).toUpperCase() +
              props.mainScreen.slice(1)}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default AuthCard;
