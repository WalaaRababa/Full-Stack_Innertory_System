/* eslint-disable prettier/prettier */
// json.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { json } from 'body-parser';

@Injectable()
export class JsonMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Apply the json() middleware
    json()(req, res, next);
  }
}
