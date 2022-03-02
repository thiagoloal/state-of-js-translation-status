import { Request, Response } from 'express';
import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { StateOfJs } from '../clients/state-of-js.client';
import { ApolloHttpClient } from '../infra';
import { svgResponse } from '../presenters/responses/svgResponse/svgResponse';

@Controller('api/state')
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
    @Get(':lang/svg')
    private svg(req: Request, res: Response): void {
        try {
          const { lang } = req.params;
          this.client.status(lang).then(data => {
            const { totalCount, translatedCount} = data.locale;
          res.setHeader('Content-Type', 'image/svg+xml');
          const svg = svgResponse(lang, totalCount, translatedCount)
          res.send(svg);
          })
        } catch (error) {
          res.status(BAD_REQUEST).json({message: error})
        }
    }
}
