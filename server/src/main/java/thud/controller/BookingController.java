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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import thud.entity.Booking;
import thud.repository.BookingRepository;

@CrossOrigin
@RestController
public class BookingController {
    @Autowired
    BookingRepository bookingRepository;

    @GetMapping(path = "/bookings", params = { "bookableId", "date_gte", "date_lte" })
    @ResponseBody
    public ResponseEntity<List<Booking>> getBookingByParam(@RequestParam("bookableId") Long bookableId,
            @RequestParam("date_gte") String date_gte, @RequestParam("date_lte") String date_lte) {
        System.out.println("Check params: " + bookableId + " " + date_gte + " " + date_lte);

        List<Booking> bookingData = new ArrayList<>();

        bookingRepository.getBookingByParam(bookableId, date_gte, date_lte).forEach(bookingData::add);
        ;

        if (bookingData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookingData, HttpStatus.OK);
        }
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        try {
            List<Booking> bookings = new ArrayList<>();

            bookingRepository.findAll().forEach(bookings::add);
            if (bookings.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable("id") long id) {
        Optional<Booking> bookingData = bookingRepository.findById(id);

        if (bookingData.isPresent()) {
            return new ResponseEntity<>(bookingData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
