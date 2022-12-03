package thud.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import thud.entity.Day;
import thud.repository.DayRepository;

@CrossOrigin
@RestController
public class DayController {
    @Autowired
    DayRepository dayRepository;

    @GetMapping("/days")
    public ResponseEntity<List<Day>> getAllBookables() {
        try {
            List<Day> days = new ArrayList<>();

            dayRepository.findAll().forEach(days::add);

            if (days.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(days, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @GetMapping("/days/{id}")
    // public ResponseEntity<Session> getDayById(@PathVariable("id") long id) {
    // Optional<Day> day = dayRepository.findById(id);

    // if (day.isPresent()) {
    // return new ResponseEntity<>(day.get(), HttpStatus.OK);
    // } else {
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }
    // }
}
