import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import Cart from "./Cart";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar style={{ marginBottom: "15px" }} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          DioShopping
        </Typography>
        <Link
          style={{
            textDecoration: "none",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
          to="/"
        >
          <Button color="inherit">Home</Button>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
          to="/contato"
        >
          <Button color="inherit">Contato</Button>
        </Link>
        <Cart />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
