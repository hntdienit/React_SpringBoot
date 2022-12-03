package thud.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

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

    @Column(name = "bookable_id", nullable = false, insertable = false, updatable = false)
    private Long bookable_id;

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    @NotNull
    @ManyToOne
    @JoinColumn(name = "bookable_id")
    private Bookable bookable;

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
