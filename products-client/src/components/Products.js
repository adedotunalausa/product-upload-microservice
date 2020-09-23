import { Button, Divider, Grid, List, ListItem, ListItemText, Paper, Typography, withStyles } from '@material-ui/core'
import React, { useState, useEffect, Fragment } from 'react'
import { connect } from "react-redux"
import * as actions from "../actions/products"
import ProductsForm from "./productsForm"
import ButterToast, { Cinnamon } from "butter-toast"
import { DeleteSweep } from "@material-ui/icons"

const styles = theme => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2)
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: "center"
  }
})

const Products = ({ classes, ...props }) => {

  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    props.fetchAllProducts()
  })

  const onDelete = id => {
    const onSuccess = () => {
      ButterToast.raise({
        content: <Cinnamon.Crisp
          tittle="Avios"
          content="Deleted Successfully"
          scheme={Cinnamon.Crisp.SCHEME_BLUE}
          icon={<DeleteSweep />}
        />
      })
    }
    if (window.confirm("Are you sure about deleting the product?"))
      props.deleteProduct(id, onSuccess)
  }

  return (
    <Grid container>
      <Grid item xs={5}>
        <Paper className={classes.paper}>
          <ProductsForm {...{ currentId, setCurrentId }} />
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Paper className={classes.paper}>
          <List>
            {
              props.productsList.map((record, index) => {
                return (
                  <Fragment key={index}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="h5">
                          {record.product_name}
                        </Typography>
                        <div>
                          {record.product_description}
                        </div>
                        <div>
                          Size:{record.product_varieties[0].size}
                        </div>
                        <div>
                          Date added: {record.date_uploaded}
                        </div>
                        <div className={classes.actionDiv}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.smMargin}
                            onClick={() => setCurrentId(record._id)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.smMargin}
                            onClick={() => onDelete(record._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </ListItemText>
                    </ListItem>
                    <Divider component="li" />
                  </Fragment>
                )
              })
            }
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  productsList: state.products.list
})

const mapActionToProps = {
  fetchAllProducts: actions.fetchAll,
  deleteProduct: actions.remove
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Products))
