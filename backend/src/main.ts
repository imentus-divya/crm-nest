import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Caching } from './middleware/caching.service';
// import { Caching } from './middleware/caching.service';
import { Caches } from './middleware/cache.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('crm');
  // app.use( Caching);
  // instantiate caching function
  //  @UseInterceptors(CacheInterceptor)

  // const cachingService = app.get(Caching);
  // console.log("🚀 ~ file: main.ts:14 ~ bootstrap ~ cachingService:", cachingService)

  const cacheService = app.get(Caches);
  await cacheService.Caching();
  const port=8000;
  await app.listen(port);
  console.log(`Server is running.....${port}`);
}

bootstrap();
