import * as express from "express"
import Routes from "./routes/Routes"
import bodyParser = require("body-parser")

class App {
    public app: express.Application;
    public route: Routes;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: false}))

        this.route = new Routes()
        this.route.routes(this.app)
    }
}

export default new App().app
