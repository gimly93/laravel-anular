export class Task {
    public id: number;
    public title: string;
    public description: string;
    public estimatedHours: number;
    public userEmail: string;
    public status: string;

    constructor(id: number, title: string, description: string, estimatedHours: number, userEmail: string, status: string){
        this.id = id;
        this.title = title;
        this.description = description;
        this.estimatedHours = estimatedHours;
        this.userEmail = userEmail;
        this.status = status;
    }
}