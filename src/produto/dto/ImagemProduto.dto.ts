import { IsString, IsUrl, MaxLength } from 'class-validator'

export class ImagemProdutoDTO{
  @IsUrl()
  url: string

  @IsString({ message: "Não pode ser em branco"})
  @MaxLength(255, { message: 'Descrição não pode possuir mais de 255 caracteres'})
  descricao: string
}