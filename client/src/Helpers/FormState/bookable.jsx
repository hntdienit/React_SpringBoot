import { useEffect, useState } from "react";

export default function useFormState(data) {
  const [state, setState] = useState(data);

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  // function handleChecked(e) {
  //   // console.log("Check e.target: ", e.target + "  " + checked);
  //   const { name, value, checked } = e.target;
  //   console.log("Check e.target:", checked);
  //   const values = new Set(state[name]);

  //   console.log(values);

  //   const intValue = parseInt(value, 10);

  //   values.delete(intValue);
  //   if (checked) values.add(intValue);
  //   // else values.delete

  //   setState({
  //     ...state,
  //     [name]: [...values],
  //   });


  // }


    function handleChecked(e) {
    // console.log("Check e.target: ", e.target + "  " + checked);
    const { name, value, checked } = e.target;
    console.log("Check e.target:", checked);
    const values = new Set(state[name]);

    console.log(values);

    const intValue = parseInt(value, 10);

    values.delete(intValue);
    if (checked) values.add(intValue);
    // else values.delete

    setState({
      ...state,
      [name]: [...values],
    });
  }

  return {
    state,
    handleChange,
    handleChecked,
  };
}
