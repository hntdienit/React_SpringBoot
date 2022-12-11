package thud.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "session")
    private String session;

    @Column(name = "date")
    // @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String date;

    @Column(name = "notes")
    private String notes;

    @Column(name = "bookable_id", nullable = false, insertable = false, updatable = false)
    private Long bookable_id;

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookable_id")
    // @OnDelete(action = OnDeleteAction.CASCADE)
    private Bookable bookable;

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // public Session getSession() {
    // return session;
    // }

    // public void setSession(Session session) {
    // this.session = session;
    // }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBookable_id() {
        return bookable_id;
    }

    public void setBookable_id(Long bookable_id) {
        this.bookable_id = bookable_id;
    }

}
