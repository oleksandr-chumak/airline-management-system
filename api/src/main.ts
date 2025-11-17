import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
      exceptionFactory: (errors) => {
        const formatErrors = (validationErrors: any[], parentPath = '') => {
          const formattedErrors: Array<{
            field: string;
            messages: string[];
            value: any;
          }> = [];

          validationErrors.forEach((error) => {
            const propertyPath = parentPath
              ? `${parentPath}.${error.property}`
              : error.property;

            // Handle nested validation errors (for arrays and nested objects)
            if (error.children && error.children.length > 0) {
              formattedErrors.push(...formatErrors(error.children, propertyPath));
            } else {
              // Format constraint messages
              const constraints = error.constraints
                ? Object.values(error.constraints)
                : [];

              formattedErrors.push({
                field: propertyPath,
                messages: constraints as string[],
                value: error.value,
              });
            }
          });

          return formattedErrors;
        };

        const formattedErrors = formatErrors(errors);

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
