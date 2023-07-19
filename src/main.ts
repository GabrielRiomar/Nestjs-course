import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      //com isso, indicamos que queremos que o pipe transforme o JSON recebido na requisição para um objeto da classe que vamos usar como tipo do parâmetro no método do controller decorado com o @Body.
      whitelist: true,
      //Essa configuração indica que as chaves do JSON devem ser iguais ao do objeto no qual o JSON será transformado, ignorando chaves que não são pareáveis a atributos do objeto.
      forbidNonWhitelisted: true,
      //Através dessa configuração, indicamos que qualquer chave que vier que não tiver par no objeto final deverá causar um erro, o que sinaliza que o cliente da nossa API está tentando enviar dados que não aceitamos.
    })
  )

  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  /*
  Para o class-validator resolver as dependências que só o Nest sabe resolver,será necessario o uso do mesmo container de resolução de dependências utilizado pelo Nest. Então, no useContainer(), basta passarmos uma referência para o root module da nossa aplicação. A partir da raiz da aplicação, ele conseguirá resolver qualquer dependência que esteja abaixo dessa raiz.
  Assim, o class-validator conseguirá resolver suas dependências e das classes nele contidas do mesmo jeito que o Nest resolve. Ademais, vamos passar um segundo parâmetro, definindo que o class-validator deve usar o seu próprio contêiner para tentar solucionar a dependência, caso não consiga resolvê-la como o Nest:
  */

  await app.listen(3000);
}
bootstrap();
