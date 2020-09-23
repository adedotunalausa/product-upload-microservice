import React from 'react';
import './App.css';
import Products from "./components/Products"
import { Provider } from "react-redux"
import { store } from "./actions/store"
import { AppBar, Container, Typography } from "@material-ui/core"
import ButterToast, { POS_BOTTOM, POS_CENTER } from "butter-toast"

function App() {
  return (
    <Provider store={store} >
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit">
          <Typography variant="h2" align="center">
            Avios
          </Typography>
        </AppBar>
        <Products />
        <ButterToast
          position={{ vertical: POS_BOTTOM, horizontal: POS_CENTER }}
        />
      </Container>
    </Provider>
  );
}

export default App;
