import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//import { WsAdapter } from '@nestjs/platform-ws';

import * as dotenv from 'dotenv';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
var cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.use(cors());
  app.use(cors({
    origin: '*'
  }));
  /*
  app.use(function(req, res, next) {
    return next();
    res.setHeader("Content-Security-Policy", "connect-src ws://localhost*; connect-src *");
});
*/
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  //app.setViewEngine('hbs');
  //app.useWebSocketAdapter(new WsAdapter(app));
  dotenv.config();
  await app.listen(3000);
}
bootstrap();
