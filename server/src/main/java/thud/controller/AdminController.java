package thud.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import thud.entity.Bookable;
import thud.entity.Day;
import thud.entity.Session;
import thud.entity.User;
import thud.pojo.BookablePojo;
import thud.repository.BookableRepository;
import thud.repository.DayRepository;
import thud.repository.SessionRepository;
import thud.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    BookableRepository bookableRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DayRepository dayRepository;

    @Autowired
    SessionRepository sessionRepository;

    // Bookable Controller
    @PostMapping("/bookables")
    public ResponseEntity<Bookable> createBookable(@RequestBody BookablePojo bookablePojo) {
        try {
            Bookable _bookable = new Bookable(bookablePojo.getGroup(),
                    bookablePojo.getTitle(),
                    bookablePojo.getNotes());

            Long[] daysId = bookablePojo.getDays();
            Long[] sessionId = bookablePojo.getSessions();

            Set<Day> setDay = new HashSet<>();
            Set<Session> setSession = new HashSet<>();

            for (int i = 0; i < daysId.length; i++) {
                try {
                    Optional<Day> dayBookable = dayRepository.findById(daysId[i]);
                    setDay.add(dayBookable.get());
                } catch (Exception e) {
                    System.out.println("Check error: " + e);
                }
            }

            for (int i = 0; i < sessionId.length; i++) {
                try {
                    Optional<Session> sessionBookable = sessionRepository.findById(sessionId[i]);
                    setSession.add(sessionBookable.get());
                } catch (Exception e) {
                    System.out.println("Check error: " + e);
                }
            }

            _bookable.setDays(setDay);
            _bookable.setSessions(setSession);
            bookableRepository.save(_bookable);

            return new ResponseEntity<>(_bookable, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/bookables/{id}")
    public ResponseEntity<Bookable> updateBookable(@PathVariable("id") long id,
            @RequestBody BookablePojo bookablePojo) {
        Optional<Bookable> bookableData = bookableRepository.findById(id);

        if (bookableData.isPresent()) {
            Bookable _bookable = bookableData.get();
            _bookable.setGroup(bookablePojo.getGroup());
            _bookable.setTitle(bookablePojo.getTitle());
            _bookable.setNotes(bookablePojo.getNotes());

            Long[] daysId = bookablePojo.getDays();
            Long[] sessionId = bookablePojo.getSessions();

            Set<Day> setDay = new HashSet<>();
            Set<Session> setSession = new HashSet<>();

            for (int i = 0; i < daysId.length; i++) {
                try {
                    Optional<Day> dayBookable = dayRepository.findById(daysId[i]);
                    System.out.println("Check daysId: " + dayBookable.get());

                    setDay.add(dayBookable.get());
                } catch (Exception e) {
                    System.out.println("Check error: " + e);
                }
            }

            for (int i = 0; i < sessionId.length; i++) {
                try {
                    Optional<Session> sessionBookable = sessionRepository.findById(sessionId[i]);
                    setSession.add(sessionBookable.get());
                } catch (Exception e) {
                    System.out.println("Check error: " + e);
                }
            }

            _bookable.setDays(setDay);
            _bookable.setSessions(setSession);

            return new ResponseEntity<>(bookableRepository.save(_bookable),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/bookables/{id}")
    public ResponseEntity<HttpStatus> deleteBookable(@PathVariable("id") long id) {
        try {
            bookableRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @DeleteMapping("/bookables")
    // public ResponseEntity<HttpStatus> deleteAllBookables() {
    // try {
    // bookableRepository.deleteAll();
    // return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // } catch (Exception e) {
    // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }

    // }

    // User Controller
    @RequestMapping(value = "/user/", method = RequestMethod.POST)
    public User saveuser(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    // @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
    // public ResponseEntity<User> updateuser(@PathVariable("id") long id,
    // @Valid @RequestBody User userForm) {
    // Optional<User> user = userRepository.findById(id);
    // if(user.isPresent()) {
    // User userData = user.get();

    // userData.setImg(userForm.getName());
    // userData.setName(userForm.getName());
    // userData.setNotes(userForm.getNotes());
    // userData.setRole(userForm.getRole());
    // userData.setTitle(userForm.getTitle());
    // userData.setPrivileges(userForm.getPrivileges());

    // return new ResponseEntity<>(userRepository.save(userData), HttpStatus.OK);
    // }
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<User> deleteuser(@PathVariable(value = "id") Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        User userData = user.get();
        userRepository.delete(userData);
        return ResponseEntity.ok().build();
    }
}
