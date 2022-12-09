package thud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import thud.entity.Day;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {
    @Query(value = "SELECT * FROM days d WHERE d.id =:id", nativeQuery = true)
    Day findByIdDay(Long id);
}
