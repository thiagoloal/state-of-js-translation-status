import { Request, Response } from 'express';
import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { StateOfJs } from 'src/clients/state-of-js.client';
import { ApolloHttpClient } from 'src/infra';

@Controller('api/posts')
export class CustomRouterController {
    private readonly client:StateOfJs = new StateOfJs(new ApolloHttpClient());

    @Get(':lang')
    private lang(req: Request, res: Response): void {
        try {
          const { lang } = req.params;
          this.client.status(lang).then(data => {
            res.status(OK).json({ ...data })
          })
        } catch (error) {
          res.status(BAD_REQUEST).json({message: error})
        }
    }
}
