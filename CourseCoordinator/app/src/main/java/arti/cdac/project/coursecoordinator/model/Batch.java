package arti.cdac.project.coursecoordinator.model;

public class Batch {
    int batch_id;
    String batch_name;

    public int getBatch_id() {
        return batch_id;
    }

    public void setBatch_id(int batch_id) {
        this.batch_id = batch_id;
    }

    public String getBatch_name() {
        return batch_name;
    }

    public void setBatch_name(String batch_name) {
        this.batch_name = batch_name;
    }

    @Override
    public String toString() {
        return batch_name;
    }
}
