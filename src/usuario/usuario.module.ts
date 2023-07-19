import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailIsUniqueValidator } from "./validation/email-is-unique";

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository, EmailIsUniqueValidator]
})
export class UsuarioModule{

}