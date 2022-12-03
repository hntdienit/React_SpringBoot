import { FaArrowRight } from "react-icons/fa";

import getData from "../../utils/api";
import getData2 from "../../utils/api";

// let days = {};
// getData ('http://localhost:3001/days').then(
//   (data) => {
//   //  console.log(data);
//     days = data
//   }
// );

// let sessions={};
// getData2('http://localhost:3001/sessions').then(
//   (data) => {
//     //  console.log(data);
//     sessions = data
//   }
// )

export default function BookablesList({ group, bookableIndex, bookables, dispatch }) {
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  function changeGroup(e) {
    dispatch({
      type: "SET_GROUP",
      payload: e.target.value,
    });
  }

  function changeBookable(selectedIndex) {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex,
    });
  }

  function nextBookable() {
    dispatch({ type: "NEXT_BOOKABLE" });
  }

  return (
    <>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>

        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === bookableIndex ? "selected" : null}>
              <button className="btn" onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
    </>
  );
}
