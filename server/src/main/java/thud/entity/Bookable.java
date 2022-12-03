package thud.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

// import antlr.collections.List;

@Entity
@Table(name = "bookables")
public class Bookable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "groupName")
	private String group;

	@Column(name = "img")
	private String img;

	@Column(name = "title")
	private String title;

	@Column(name = "notes")
	private String notes;

	@OneToMany

	@JoinColumn(name = "bookable_id")
	private Set<Booking> bookings;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "bookable_day", joinColumns = @JoinColumn(name = "bookable_id"), inverseJoinColumns = @JoinColumn(name = "day_id"))
	private List<Day> days = new ArrayList<>();

	// Session
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "bookable_session", joinColumns = @JoinColumn(name = "bookable_id"), inverseJoinColumns = @JoinColumn(name = "session_id"))
	private List<Session> sessions = new ArrayList<>();

	public Bookable() {

	}

	public Bookable(Long id, String group, String img, String title, String notes) {
		this.id = id;
		this.group = group;
		this.img = img;
		this.title = title;
		this.notes = notes;
	}

	public Bookable(String group, String img, String title, String notes) {
		this.group = group;
		this.img = img;
		this.title = title;
		this.notes = notes;
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

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
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

	public List<Day> getDays() {
		return days;
	}

	public void setDays(List<Day> days) {
		this.days = days;
	}

	public List<Session> getSessions() {
		return sessions;
	}

	public void setSessions(List<Session> sessions) {
		this.sessions = sessions;
	}

	@Override
	public String toString() {
		return "Bookable [id=" + id + ", group=" + group + ", title=" + title + ", notes=" + notes + "]";
	}
}
