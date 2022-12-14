import { addDays, shortISO } from "../../utils/date-wrangler";

export function getGrid(bookable, startDate) {
  const sessionNames = ["empty", "Breakfast", "Morning", "Lunch", "Afternoon", "Evening"];

  const dates = bookable.days.sort().map((d) => shortISO(addDays(startDate, d.id)));
  const sessions = bookable.sessions.map((i) => sessionNames[i.id]);

  const grid = {};
  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach(
      (date) =>
        (grid[session][date] = {
          session,
          date,
          bookableId: bookable.id,
          title: bookable.bookings
            .filter((i) => i.session === session && i.date === date && i.title)
            .map((i) => i.title),
        })
    );
  });

  return {
    grid,
    dates,
    sessions,
  };
}

export function transformBookings(bookingsArray) {
  return bookingsArray.reduce((bookings, booking) => {
    const { session, date } = booking;

    if (!bookings[session]) {
      bookings[session] = {};
    }

    bookings[session][date] = booking;
    return { bookings, sessions: session, dates: date };
  }, {});
}
