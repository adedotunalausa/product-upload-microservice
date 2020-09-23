import { Button, TextField, withStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import useForm from "./useForm"
import { connect } from "react-redux"
import * as actions from "../actions/products"
import ButterToast, { Cinnamon } from "butter-toast"
import { AssignmentTurnedIn } from "@material-ui/icons"

const initialFieldValues = {
  product_name: "",
  product_description: "",
  product_varieties: {
    size: "",
    color: "",
    quantity: "",
    price: ""
  },
  date_uploaded: "",
  date_edited: ""
}

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  submitBtn: {
    width: "50%"
  }
})

const ProductsForm = ({ classes, ...props }) => {

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.productsList.find(x => x._id == props.currentId)
      })
      setErrors({})
    }
  }, [props.currentId])

  const validate = () => {
    let temp = { ...errors }
    temp.title = values.product_name ? "" : "This field is required."
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x == "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFieldValues, props.setCurrentId)

  const handleSubmit = event => {
    event.preventDefault()
    const onSuccess = () => {
      ButterToast.raise({
        content: <Cinnamon.Crisp
          tittle="Avios"
          content="Uploaded Successfully"
          scheme={Cinnamon.Crisp.SCHEME_BLUE}
          icon={<AssignmentTurnedIn />}
        />
      })
      resetForm()
    }
    if (validate())
      if (props.currentId == 0)
        props.createProduct(values, onSuccess)
      else
        props.updateProduct(props.currentId, values, onSuccess)
  }

  return (
    <form
      className={`${classes.root} ${classes.form}`}
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <TextField
        name="product_name"
        label="Product Name"
        fullWidth
        value={values.product_name}
        onChange={handleInputChange}
        {...(errors.product_name && { error: true, helperText: errors.product_name })}
      />
      <TextField
        name="product_description"
        label="Product Description"
        fullWidth
        multiline
        rows={2}
        value={values.product_description}
        onChange={handleInputChange}
      />
      <TextField
        name="product_varieties"
        label="Color"
        fullWidth
        value={values.product_varieties}
        onChange={handleInputChange}
      />
      <TextField
        name="date_uploaded"
        label="Date Uploaded"
        type="date"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={values.date_uploaded}
        onChange={handleInputChange}
      />
      <TextField
        name="date_edited"
        label="Date Edited"
        type="date"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={values.date_edited}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        className={classes.submitBtn}
      >
        Upload
        </Button>
    </form>
  )
}

const mapStateToProps = state => ({
  productsList: state.products.list
})

const mapActionToProps = {
  createProduct: actions.create,
  updateProduct: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProductsForm))
