import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("Authentication Backend")
    .setDescription("A JWT based user authentication API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup("/api", app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.API_PORT);
}
bootstrap();
