import { Request, Response } from 'express';
import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Put } from '@overnightjs/core';


@Controller('api/posts')
export class CustomRouterController {
    @Get()
    private get(req: Request, res: Response): void {
        try {
          res.status(OK).json({message: 'sucesso'})
        } catch (error) {
          res.status(BAD_REQUEST).json({message: error})
        }

    }

    @Get('svg')
    private svg(req: Request, res: Response): void {
        try {
          res.setHeader('Content-Type', 'image/svg+xml');
          const svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="400" height="180"> <rect x="50" y="20" rx="20" ry="20" width="150" height="150" style="fill:red;stroke: black;stroke-width:5;opacity:0.5" /> </svg>'
          res.send(svg);
        } catch (error) {
          res.status(BAD_REQUEST).json({message: error})
        }
    }
}
