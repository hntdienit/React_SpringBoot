package thud.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import thud.entity.User;
import thud.repository.UserRepository;

@CrossOrigin
@RestController
public class UserController {
	public static Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserRepository userRepository;

	@GetMapping("/users")
	public ResponseEntity<List<User>> listAlluser() {
		List<User> listuser = userRepository.findAll();
		if (listuser.isEmpty()) {
			return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<User>>(listuser, HttpStatus.OK);
	}

	@GetMapping("/users/{id}")
	public User finduser(@PathVariable("id") long id) {
		Optional<User> user = userRepository.findById(id);
		if (user == null) {
			ResponseEntity.notFound().build();
		}
		User userData = user.get();
		return userData;
	}
}
