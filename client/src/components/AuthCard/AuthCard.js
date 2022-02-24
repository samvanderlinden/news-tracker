import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import classes from "./AuthCard.module.css";

const AuthCard = (props) => {
  return (
    <div className={classes.container}>
      <Form onSubmit={props.submit} className={classes.card}>
        <div>
          <div className={classes["card-header"]}>
            <h2>{props.header}</h2>
          </div>
          <div className={classes.inputs}>
            {props.children}

            <Button
              type="submit"
              variant="primary"
              className={classes["submit-button"]}
            >
              Submit
            </Button>
            <br />
            <Link to={`/${props.mainScreen}`}>
              {props.mainScreen.charAt(0).toUpperCase() +
                props.mainScreen.slice(1)}
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AuthCard;
