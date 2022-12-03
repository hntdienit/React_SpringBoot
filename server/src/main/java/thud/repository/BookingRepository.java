package thud.repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import thud.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookableId(Long bookable_id);

    @Query(value = "SELECT * FROM bookings where bookable_id=:bookableId and (date between :start and :end)", nativeQuery = true)
    List<Booking> getBookingByParam(Long bookableId, String start, String end);
}
