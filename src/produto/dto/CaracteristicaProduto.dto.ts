import { IsString, IsNotEmpty, MaxLength } from 'class-validator'

export class CaracteristicaProdutoDTO{
  @IsNotEmpty({ message: 'Não pode ficar em branco' })
  nome: string

  @IsString({ message: "Não pode ser em branco"})
  @MaxLength(255, { message: 'Descrição não pode possuir mais de 255 caracteres'})
  descricao: string
}