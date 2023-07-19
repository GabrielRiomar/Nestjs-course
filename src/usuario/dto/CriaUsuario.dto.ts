import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator"
import { EmailIsUnique } from "../validation/email-is-unique"

export class CriarUsuarioDTO{
  
  @IsNotEmpty({ message: "Não pode ser em branco"})
  nome: string

  @IsEmail(undefined, { message: "E-mail tem que ser informado"})
  @EmailIsUnique({ message: 'Já existe usuario com este e-mail'})
  email: string

  @MinLength(6, { message: "Informe a senha com o minimo de 6 caracteres"})
  senha: string
}