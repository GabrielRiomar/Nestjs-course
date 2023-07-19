import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
  MaxLength,
  ArrayMinSize,
  IsDateString, 
  IsUUID} from "class-validator"
import { Type } from "class-transformer";
import { CaracteristicaProdutoDTO } from "./CaracteristicaProduto.dto";
import { ImagemProdutoDTO } from "./ImagemProduto.dto";

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsNotEmpty({ message: 'Não pode ficar em branco' })
  nome: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1, { message: 'Valor tem que ser positivo' })
  valor: number

  @IsNumber()
  @Min(0, { message: 'Valor tem que ser positivo' })
  quantidade: number

  @IsString({ message: "Não pode ser em branco"})
  @MaxLength(255, { message: 'Descrição não pode possuir mais de 255 caracteres'})
  descricao: string

  @ValidateNested()
  @IsArray() 
  @ArrayMinSize(2)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[]

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1) 
  @Type(() => CaracteristicaProdutoDTO)
  imagens: ImagemProdutoDTO[]

  @IsString({ message: "Não pode ser em branco"})
  categoria: string

  @IsDateString()
  dataCriacao: Date

  @IsDateString()
  dataAtualizacao: Date
}