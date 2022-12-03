package thud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import thud.entity.Day;

public interface DayRepository extends JpaRepository<Day, Long> {
    // List<Day> findByBookingId(Long bookingId);
}
