package thud.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "days")
public class Day {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@JsonIgnore
	@ManyToMany(mappedBy = "days")
	private Set<Bookable> bookables = new HashSet<>();

	public Set<Bookable> getBookables() {
		return bookables;
	}

	public void setBookables(Set<Bookable> bookables) {
		this.bookables = bookables;
	}

	public Day() {
	}

	public Day(String name) {
		this.name = name;
	}

	public Day(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
