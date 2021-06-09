import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import footerImage from "../assets/footer.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${footerImage})`,
    minHeight: "150px",
    padding: "1rem 2rem",
    color: "white",
    display: "flex",
    flexDirection: "row",
    backgroundPositionX: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "black",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  link: {
    color: "white",
  },
  title: {
    fontSize: "2rem",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.menu}>
        <Typography className={classes.title}>Bitdefender</Typography>
        <div>
          <a href="/#" className={classes.link}>
            Legal Terms
          </a>
          <span> | </span>
          <a href="/#" className={classes.link}>
            Privacy Policy
          </a>
          <span> | </span>
          <a href="/#" className={classes.link}>
            Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
