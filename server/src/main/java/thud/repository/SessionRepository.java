package thud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import thud.entity.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {
}