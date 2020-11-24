import {PrimaryGeneratedColumn, Entity, Column, ManyToOne} from "typeorm"
import SuperHero from "./SuperHero"

@Entity()
export default class Power {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public ability: string

    //many to one required
    @ManyToOne(() => SuperHero, (superHero) => superHero.power)
    public superHero: SuperHero
}