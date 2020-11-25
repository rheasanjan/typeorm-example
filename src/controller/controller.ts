import Power from "../entity/Power";
import SuperHero from "../entity/SuperHero";
import { Request, Response } from "express";
import { Connection } from "../connection/connection";

export default class Controller {
  constructor() {}

  public getAllSuperHeroes(req: Request, res: Response) {
    Connection.then(async (connection) => {
      const superHeros: SuperHero[] = await connection.manager.find(SuperHero);
      return res.json(superHeros);
    }).catch((err) => {
      res.json(err);
    });
  }
  public addSuperHero(req: Request, res: Response) {
    Connection.then(async (connection) => {
      let reqSuperHero = req.body;
      let reqPower = reqSuperHero.power;

      let superHero = new SuperHero();
      superHero.name = reqSuperHero.name;
      superHero.power = [];

      reqPower &&
        reqPower.forEach((eachPower) => {
          let power = new Power();
          power.ability = eachPower.ability;
          superHero.power.push(power);
        });

      await connection.manager.save(superHero);
      res.json({ message: "Saved successfully" });
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
  }

  public getSuperHeroById(req: Request, res: Response) {
    Connection.then(async (connection) => {
      const superHero = await connection.manager.findOne(
        SuperHero,
        req.params.id
      );
      if(superHero)
        res.json(superHero);
      else
        res.status(400).json({message: "Superhero not found"})
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
  }

  public updateSuperHero(req: Request, res: Response) {
    Connection.then(async (connection) => {
      let superHero = await connection.manager.findOne(
        SuperHero,
        req.params.id
      );
      let reqSuperHero = req.body;
      let reqPower = reqSuperHero.power;
      superHero.name = reqSuperHero.name;

      //delete previous power our super hero
      superHero.power.forEach(async (eachPower) => {
        await connection.manager.delete(Power, { id: eachPower.id });
      });
      superHero.power = [];

      reqPower.forEach((eachPower) => {
        let power: Power = new Power();
        power.ability = eachPower.ability;
        superHero.power.push(eachPower);
      });
      await connection.manager.save(superHero);
      res.json({ message: "Updated successfully" });
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
  }

  public deleteSuperHero(req: Request, res: Response) {
    Connection.then(async (connection) => {
      let superHero = await connection.manager.findOne(
        SuperHero,
        req.params.id
      );

      //delete all powers of that super hero first
      superHero.power.forEach(async (power) => {
        await connection.manager.delete(Power, { id: power.id });
      });

      await connection.manager.delete(SuperHero, req.params.id);
      res.json({ message: "Deleted successfully" });
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
  }
}
