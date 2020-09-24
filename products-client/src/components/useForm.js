import React, { useState } from "react";

const useForm = (initialFieldValues, setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event, parent) => {
    const { name, value } = event.target;

    if (parent) {
      setValues({
        ...values,
        [parent]: { ...values[parent], [name.split(":")[1]]: value },
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
    setCurrentId(0);
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

export default useForm;
