import Power from "../entity/Power";
import SuperHero from "../entity/SuperHero";
import {Request, Response} from "express";
import {Connection} from "../connection/connection";


export default class Controller {
    constructor() {}

    public getAllSuperHeroes(req: Request, res: Response) {
        Connection.then(async connection => {
            const superHeros: SuperHero[] = await connection.manager.find(SuperHero);
            return res.json(superHeros);
        }).catch(err => {
            res.json(err)
        })
    }
    public addSuperHero(req: Request, res: Response) {
        Connection.then(async connection => {
            let reqSuperHero = req.body;
            let reqPower = reqSuperHero.power;

            let superHero = new SuperHero();
            superHero.name = reqSuperHero.name;
            superHero.power = []

            reqPower.forEach(eachPower => {
                let power = new Power()
                power.ability = eachPower;
                superHero.power.push(power)
            })

            await connection.manager.save(superHero);
            res.json({message: "Saved successfully"})
        }).catch(err => {
            res.json(err)
        })
    }
}