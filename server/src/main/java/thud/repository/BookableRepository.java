package thud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import thud.entity.Bookable;

@Repository
public interface BookableRepository extends JpaRepository<Bookable, Long> {
    List<Bookable> findByTitleContaining(String title);
}
