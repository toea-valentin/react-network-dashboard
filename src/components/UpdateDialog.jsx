import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";

import axios from "axios";
import Notification from "./Notification";
import { API_URL } from "../shared/url";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: "#fff",
  },
}));


const updateData = async (ip) => {
  let body = `{"ip" : "${ip}"}`;
  const response = await axios.put(API_URL, body);
  return response.data;
}

const UpdateDialog = ({ open, setOpen }) => {
  const classes = useStyles();

  const [address, setAddress] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);

  const handleClose = () => {
    setAddress("");
    setOpen(false);
  };

  const handleAdd = () => {
    if (address.length > 0) {
      setLoading(true);

      updateData(address).then(
        (response) => {
          if (response.ok && !response.data.message.includes("ERROR")) {
            setMessage(response.data.message);
            setOpenNotification(true);
            setLoading(false);
            setAddress("");
            setOpen(false);
            return;
          }

          setMessage(response.data.message);
          setOpenNotification(true);
          setLoading(false);
        },
        (err) => {
          setMessage("SERVER ERROR");
          setOpenNotification(true);
          setLoading(false);
        }
      );
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div style={{ display: "flex", alignItems: "center" }}>
            <UpdateIcon />
            Update IP address
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            An IPv4 address has the format x.x.x.x, where x is called an octet
            and must be a decimal value between 0 and 255. <br />
            An IPv6 (normal) address has the format y:y:y:y:y:y:y:y, where y is
            called a segment and can be any hexadecimal value between 0 and
            FFFF.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="IP Address"
            type="text"
            fullWidth
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary" variant="contained">
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Notification
        open={openNotification}
        setOpen={setOpenNotification}
        message={message}
      />
    </>
  );
};

export default UpdateDialog;
