// classe Lesson que l'on utilisera en JS pour manipuler des objets Lesson
class Lesson {
    constructor(id, title, hours, description,teacher,file_name, starting_date, ending_date, is_finished) {
        this.id = id;
        this.title = title;
        this.hours = hours;
        this.description = description;
        this.file_name = file_name;
        this.teacher = teacher;
        this.starting_date = starting_date;
        this.ending_date = ending_date;
        this.is_finished = is_finished;
    }
}
module.exports = Lesson;