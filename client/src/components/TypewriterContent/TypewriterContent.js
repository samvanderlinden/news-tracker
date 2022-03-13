import React from "react";
import classes from "./TypewriterContent.module.css";

const TypewriterContent = () => {
  return (
    <div className={classes.container}>
      <p className={classes["typed-out-1"]}>Welcome to the News-Tracker app.</p>
      <p className={classes["typed-out-2"]}>
        Login or Register now to start viewing
      </p>
      <p className={classes["typed-out-3"]}>
        and saving your favorite news stories!
      </p>
    </div>
  );
};

export default TypewriterContent;
