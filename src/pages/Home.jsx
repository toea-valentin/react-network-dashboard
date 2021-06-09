import React from "react";
import { Container, Breadcrumbs, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OperationCard from "../components/OperationCard";

import { menu } from "../shared/menu";

const useStyles = makeStyles((theme) => ({
  content: {
    background: "rgba(220,220,220, 0.25)",
    minHeight: "600px",
    padding: "2rem 2rem 5rem 2rem",
  },
  titleWrapper: {
    margin: "3rem 0rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
  },
  subtitle: {
    fontSize: "1.2rem",
  },
  operationsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    minHeight: "300px",
  },
  paper: {
    borderRadius: "15px",
    padding: "2rem",
  },
  inside: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  operationsTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  line: {
    borderBottom: "1px solid black",
    margin: "0px 10px",
    flex: 1,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <Container className={classes.content} maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Home</Typography>
        </Breadcrumbs>
        <div className={classes.titleWrapper}>
          <Typography className={classes.title}>IP SERVICE</Typography>
          <Typography className={classes.subtitle}>
            An easy way to find if an IP belongs to AWS, Azure or GCP
          </Typography>
        </div>
        <Paper className={classes.paper} elevation={0}>
          <div className={classes.inside}>
            <div className={classes.line} />
            <span className={classes.title + " " + classes.operationsTitle}>
              Supported Operations
            </span>
            <div className={classes.line} />
          </div>
          <div className={classes.operationsWrapper}>
            {menu.map((menuItem) => (
              <OperationCard
                key={menuItem.type}
                type={menuItem.type}
                title={menuItem.title}
                info={menuItem.info}
              />
            ))}
          </div>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
