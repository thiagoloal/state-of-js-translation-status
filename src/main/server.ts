import * as bodyParser from 'body-parser';
import * as controllers from '../controllers';
import { Server } from '@overnightjs/core';
import { Request, Response } from 'express';


class NormalRouterServer extends Server {

    private readonly FRONT_END_MSG = 'OvernightJS with standard express router started.';
    private readonly START_MSG = 'OvernightJS with standard express router started on port: ';


    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }


    private setupControllers(): void {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances);
    }


    public start(): void {
        const PORT = process.env.PORT || 3000;
        this.app.get('*', (req: Request, res: Response) => {
            res.send(this.FRONT_END_MSG);
        });
        this.app.listen(PORT, () => {
          console.log(this.START_MSG + PORT);
        });
    }
}

export default NormalRouterServer;
