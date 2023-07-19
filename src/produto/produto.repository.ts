import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutoRepository{
  private produtos = []

  salvar(produto){
    this.produtos.push(produto)
  }

  async listar(){
    return this.produtos
  }
}