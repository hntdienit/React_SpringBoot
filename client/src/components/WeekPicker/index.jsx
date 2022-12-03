// import {useReducer} from "react";
// import reducer from "../../Helpers/Reducer/weekReducer.jsx";
// import {getWeek} from "../../utils/date-wrangler";
// import {FaChevronLeft, FaCalendarDay, FaChevronRight} from "react-icons/fa";

// export default function WeekPicker ({date}) {
//   const [week, dispatch] = useReducer(reducer, date, getWeek);

//   return (
//     <div>
//       <p className="date-picker">
//         <button
//           className="btn"
//           onClick={() => dispatch({type: "PREV_WEEK"})}
//         >
//           <FaChevronLeft/>
//           <span>Prev</span>
//         </button>

//         <button
//           className="btn"
//           onClick={() => dispatch({type: "TODAY"})}
//         >
//           <FaCalendarDay/>
//           <span>Today</span>
//         </button>

//         <button
//           className="btn"
//           onClick={() => dispatch({type: "NEXT_WEEK"})}
//         >
//           <span>Next</span>
//           <FaChevronRight/>
//         </button>
//       </p>
//       <p>
//         {week.start.toDateString()} - {week.end.toDateString()}
//       </p>
//     </div>
//   );
// }

import { useRef } from "react";
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck
} from "react-icons/fa";

import { addDays, shortISO } from "../../utils/date-wrangler";
import { useBookingsParams } from "../../Helpers/Hook/bookings.jsx";

export default function WeekPicker() {
  const textboxRef = useRef();

  const { date, setBookingsDate: goToDate } = useBookingsParams();

  const dates = {
    prev: shortISO(addDays(date, -7)),
    next: shortISO(addDays(date, 7)),
    today: shortISO(new Date())
  };

  return (
    <div>
      <p className="date-picker">
        <button
          className="btn"
          onClick={() => goToDate(dates.prev)}
        >
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button
          className="btn"
          onClick={() => goToDate(dates.today)}
        >
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            ref={textboxRef}
            placeholder="e.g. 2022-11-26"
            id="wpDate"
            defaultValue="2022-11-26"
          />

          <button
            onClick={() => goToDate(textboxRef.current.value)}
            className="go btn"
          >
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button
          className="btn"
          onClick={() => goToDate(dates.next)}
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
    </div>
  );
}