import { useEffect, useState } from "react";

export default function useFormState(data) {
  const [state, setState] = useState(data);
  let arrDay = [];
  let arrSession = [];

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

  function handleChecked(e) {
    const { name, value, checked } = e.target;
    const values = new Set(state[name]);

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
