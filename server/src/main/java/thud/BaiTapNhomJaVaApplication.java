package thud;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import thud.entity.Day;
import thud.entity.ERole;
import thud.entity.Role;
import thud.entity.Session;
import thud.repository.DayRepository;
import thud.repository.RoleRepository;
import thud.repository.SessionRepository;
import thud.repository.UserRepository;

@SpringBootApplication
// @EnableAutoConfiguration(exclude = {
// org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class
// })
public class BaiTapNhomJaVaApplication {

	public static void main(String[] args) {
		SpringApplication.run(BaiTapNhomJaVaApplication.class, args);
	}

	// @Bean
	// public CommandLineRunner dataLoader(DayRepository repoDay, RoleRepository
	// repoRole, UserRepository userRepository,
	// SessionRepository sessionRepository) {
	// return new CommandLineRunner() {
	// @Override
	// public void run(String... args) throws Exception {
	// repoDay.save(new Day("Monday"));
	// repoDay.save(new Day("Tuesday"));
	// repoDay.save(new Day("Wednesday"));
	// repoDay.save(new Day("Thursday"));
	// repoDay.save(new Day("Firday"));
	// repoDay.save(new Day("Saturday"));
	// repoDay.save(new Day("Sunday"));

	// repoRole.save(new Role(ERole.ROLE_ADMIN));
	// repoRole.save(new Role(ERole.ROLE_MODERATOR));
	// repoRole.save(new Role(ERole.ROLE_USER));

	// sessionRepository.save(new Session("Breakfast"));
	// sessionRepository.save(new Session("Morning"));
	// sessionRepository.save(new Session("Lunch"));
	// sessionRepository.save(new Session("Afternoon"));
	// sessionRepository.save(new Session("Evening"));
	// }
	// };
	// }
}
