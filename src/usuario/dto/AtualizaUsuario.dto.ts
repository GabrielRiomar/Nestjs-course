import { IsEmail, MinLength, IsNotEmpty, IsOptional } from "class-validator"
import { EmailIsUnique } from "../validation/email-is-unique"

export class AtualizaUsuarioDTO{
  @IsNotEmpty({ message: "Não pode ser em branco"})
  @IsOptional()
  nome: string

  @IsEmail(undefined, { message: "E-mail tem que ser informado"})
  @EmailIsUnique({ message: 'Já existe usuario com este e-mail'})
  @IsOptional()
  email: string

  @MinLength(6, { message: "Informe a senha com o minimo de 6 caracteres"})
  @IsOptional()
  senha: string
}