package thud.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import thud.entity.Session;
import thud.repository.SessionRepository;

@CrossOrigin
@RestController
public class SessionController {
    @Autowired
    SessionRepository sessionRepository;

    @GetMapping("/sessions")
    public ResponseEntity<List<Session>> getAllBookables() {
        try {
            List<Session> sessions = new ArrayList<>();

            sessionRepository.findAll().forEach(sessions::add);

            if (sessions.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(sessions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sessions/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable("id") long id) {
        Optional<Session> session = sessionRepository.findById(id);

        if (session.isPresent()) {
            return new ResponseEntity<>(session.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
