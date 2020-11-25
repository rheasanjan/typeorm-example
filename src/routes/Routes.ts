import {Request, Response} from "express";
import Controller from "../controller/controller";

export default class Routes {
    private controller: Controller;

    constructor() {
        this.controller = new Controller();
    }

    public routes(app): void {
        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({success: true})
        });

        app.route('/super-hero')
            .get(this.controller.getAllSuperHeroes)
            .post(this.controller.addSuperHero)

        app.route('/super-hero/:id')
            .get(this.controller.getSuperHeroById)
            .put(this.controller.updateSuperHero)
            .delete(this.controller.deleteSuperHero);

    }
}
