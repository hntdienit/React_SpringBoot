package thud.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

// import antlr.collections.List;

@Entity
@Table(name = "bookables")
public class Bookable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "groupName")
	private String group;

	@Column(name = "title")
	private String title;

	@Column(name = "notes")
	private String notes;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "bookable_id", orphanRemoval = true)
	private Set<Booking> bookings;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "bookable_day", joinColumns = @JoinColumn(name = "bookable_id"), inverseJoinColumns = @JoinColumn(name = "day_id"))
	private Set<Day> days = new HashSet<>();

	// Session
	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "bookable_session", joinColumns = @JoinColumn(name = "bookable_id"), inverseJoinColumns = @JoinColumn(name = "session_id"))
	private Set<Session> sessions = new HashSet<>();

	public Bookable() {

	}

	public Bookable(Long id, String group, String title, String notes) {
		this.id = id;
		this.group = group;
		this.title = title;
		this.notes = notes;
	}

	public Bookable(String group, String title, String notes) {
		this.group = group;
		this.title = title;
		this.notes = notes;
	}

	public Bookable(String group, String title, String notes,
			Set<Day> days) {
		this.group = group;
		this.title = title;
		this.notes = notes;
		this.days = days;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Set<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(Set<Booking> bookings) {
		this.bookings = bookings;
	}

	public Set<Day> getDays() {
		return days;
	}

	public void setDays(Set<Day> days) {
		this.days = days;
	}

	public Set<Session> getSessions() {
		return sessions;
	}

	public void setSessions(Set<Session> sessions) {
		this.sessions = sessions;
	}

	@Override
	public String toString() {
		return "Bookable [id=" + id + ", group=" + group + ", title=" + title + ", notes=" + notes + "]";
	}

	public void addDays(Day day) {
		this.days.add(day);
		day.getBookables().add(this);
	}
}
