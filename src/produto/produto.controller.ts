import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosRepository: ProdutoRepository){}

  @Post()
  async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO){
    this.produtosRepository.salvar(dadosDoProduto)
    return dadosDoProduto
  }

  @Get()
  async listaProduto(){
    return this.produtosRepository.listar()
  }
}