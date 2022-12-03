import BookingsGrid from "./Grid.jsx";

export default function BookingsGridSlide(props) {
  const { week, bookable, booking, setBooking } = props;

  return (
    <div className="grid-wrapper">
      <BookingsGrid week={week} bookable={bookable} booking={booking} setBooking={setBooking} />
    </div>
  );
}
