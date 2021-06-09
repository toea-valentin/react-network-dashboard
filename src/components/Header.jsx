import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddDialog from "./AddDialog";
import GetDialog from "./GetDialog";
import UpdateDialog from "./UpdateDialog";
import DeleteDialog from "./DeleteDialog";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  appBar: {
    background: "#f9f9f9",
    color: "black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
}));

const Header = () => {
  const classes = useStyles();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openGet, setOpenGet] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOnClick = (type) => {
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
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.title}>
            Bitdefender
          </Typography>
          <Button color="inherit" onClick={() => handleOnClick("ADD")}>
            Add IP
          </Button>
          <Button color="inherit" onClick={() => handleOnClick("GET")}>
            Get IP
          </Button>
          <Button color="inherit" onClick={() => handleOnClick("UPDATE")}>
            Update IP
          </Button>
          <Button color="inherit" onClick={() => handleOnClick("DELETE")}>
            Delete IP
          </Button>
        </Toolbar>
      </AppBar>
      <AddDialog open={openAdd} setOpen={setOpenAdd} />
      <GetDialog open={openGet} setOpen={setOpenGet} />
      <UpdateDialog open={openUpdate} setOpen={setOpenUpdate} />
      <DeleteDialog open={openDelete} setOpen={setOpenDelete} />
    </>
  );
};

export default Header;
