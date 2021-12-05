import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Winnings {

    constructor(username: string, winnings: number = 1) {
        this.username = username;
        this.winnings = winnings;
        this.timestamp = new Date();
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    username: string;

    @Column({ type: "bigint" })
    winnings: number;

    @Column({ type: "timestamp" })
    timestamp: Date;

}
