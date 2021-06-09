import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

import axios from "axios";
import Notification from "./Notification";
import { API_URL } from "../shared/url";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: "#fff",
  },
  list: {
    flexDirection: "column",
  },
  listItem: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  w100: {
    width: "100%",
  },
  pl3: {
    paddingLeft: "2rem",
  },
}));

const getData = async (ip) => {
  const response = await axios
    .get(API_URL + "?ip=" + ip)
    .then((response) => response.data);
  return response;
};

const GetDialog = ({ open, setOpen }) => {
  const classes = useStyles();

  const [address, setAddress] = React.useState("");
  const [providers, setProviders] = React.useState([]); // {company: '', ips: []}
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);

  const handleClose = () => {
    setProviders([]);
    setAddress("");
    setOpen(false);
  };

  const handleProviders = (obj) => {
    let newProviders = [...providers];

    const prov = newProviders.find((p) => p.company === obj.company);
    if (prov) {
      prov.ips.push(obj.ip);
      setProviders(newProviders);
    } else {
      newProviders.push({ company: obj.company, ips: [obj.ip] });
      setProviders(newProviders);
    }
  };

  const handleGet = async () => {
    if (
      address.length > 0 &&
      providers.filter((p) => p.ips.includes(address)).length === 0
    ) {
      setLoading(true);
      getData(address).then(
        (response) => {
          if (response.ok) {
            handleProviders(response.data);
            setLoading(false);
          }
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
            <GetAppIcon />
            Get an IP address
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            An IPv4 address has the format x.x.x.x, where x is called an octet
            and must be a decimal value between 0 and 255. <br />
            An IPv6 (normal) address has the format y:y:y:y:y:y:y:y, where y is
            called a segment and can be any hexadecimal value between 0 and
            FFFF. <br />
            <b>
              *To query a batch of IPs just enter a new one, the old ones will
              still be displayed below.
            </b>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="IP Address"
            type="text"
            fullWidth
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <List component="nav" className={classes.list}>
            {providers.length !== 0 && (
              <Typography variant="h6" gutterBottom>
                Query Result
              </Typography>
            )}
            {providers.map((p) => (
              <ListItem key={p.company} className={classes.listItem}>
                <span className={classes.w100}>
                  <b>PROVIDER:</b> {p.company}
                </span>
                <div className={classes.w100}>
                  {p.ips.map((ip) => (
                    <div key={ip}>
                      <span className={classes.pl3}>
                        <b>- IP:</b> {ip}
                      </span>
                    </div>
                  ))}
                </div>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleGet} color="primary" variant="contained">
            GET
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

export default GetDialog;
