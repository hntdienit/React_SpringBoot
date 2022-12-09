package thud.pojo;

public class BookablePojo {
    private String group;
    private String title;
    private String notes;
    private Long[] days;
    private Long[] sessions;

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

    public Long[] getDays() {
        return days;
    }

    public void setDays(Long[] days) {
        this.days = days;
    }

    public Long[] getSessions() {
        return sessions;
    }

    public void setSessions(Long[] sessions) {
        this.sessions = sessions;
    }
}
