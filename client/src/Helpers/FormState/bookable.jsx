import { useEffect, useState } from "react";

export default function useFormState(data) {
  const [state, setState] = useState(data);
  let arrDay = [];
  let arrSession = [];
  console.log("Check data: ", state);

  useEffect(() => {
    if (data) {
      if (data.days && data?.days[0]?.id && data?.sessions[0]?.id) {
        const dataDay = data.days;
        dataDay?.map((item) => {
          arrDay.push(item.id);
        });
        data.days = arrDay;

        const dataSession = data.sessions;
        dataSession?.map((item) => {
          arrSession.push(item.id);
        });
        data.sessions = arrSession;
      }
    }
    setState(data);

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
    const { name, value, checked } = e.target;
    // console.log("Check e.target: ", e.target + "  " + name);
    // console.log("Check e.target:", checked);
    const values = new Set(state[name]);

    // console.log(values);

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
