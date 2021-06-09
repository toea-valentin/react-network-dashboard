import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import GetAppIcon from "@material-ui/icons/GetApp";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import AddDialog from "./AddDialog";
import GetDialog from "./GetDialog";
import UpdateDialog from "./UpdateDialog";
import DeleteDialog from "./DeleteDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0.5rem",
    minHeight: "200px",
    minWidth: "200px",
    maxWidth: "200px",
    padding: "1rem",
    cursor: "pointer",
    borderRadius: "15px",
    "&:hover": {
      background: "#f1f1f1",
    },
  },
  icon: {
    fontSize: "3rem",
  },
  title: {
    marginTop: "0.5rem",
    fontWeight: "bold",
    fontSize: "20px",
  },
  info: {
    marginTop: "1rem",
    padding: "0.8rem",
    border: "1px solid grey",
    borderRadius: "15px",
    height: "100%",
  },
  getIcon: {
    color: "dodgerblue",
  },
  updateIcon: {
    color: "blueviolet",
  },
  deleteIcon: {
    color: "orangered",
  },
}));

const OperationCard = ({ type, title, info }) => {
  const classes = useStyles();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openGet, setOpenGet] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOnClick = () => {
    switch (type) {
      case "ADD":
        setOpenAdd(true);
        break;
      case "GET":
        setOpenGet(true);
        break;
      case "UPDATE":
        setOpenUpdate(true);
        break;
      case "DELETE":
        setOpenDelete(true);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Paper className={classes.root} elevation={3} onClick={handleOnClick}>
        {type === "ADD" && <AddCircleIcon className={classes.icon} />}
        {type === "GET" && (
          <GetAppIcon className={classes.icon + " " + classes.getIcon} />
        )}
        {type === "UPDATE" && (
          <UpdateIcon className={classes.icon + " " + classes.updateIcon} />
        )}
        {type === "DELETE" && (
          <DeleteIcon className={classes.icon + " " + classes.deleteIcon} />
        )}
        <Typography className={classes.title}>{title}</Typography>
        <div className={classes.info}>
          <Typography>{info}</Typography>
        </div>
      </Paper>
      <AddDialog open={openAdd} setOpen={setOpenAdd} />
      <GetDialog open={openGet} setOpen={setOpenGet} />
      <UpdateDialog open={openUpdate} setOpen={setOpenUpdate} />
      <DeleteDialog open={openDelete} setOpen={setOpenDelete} />
    </>
  );
};

export default OperationCard;
