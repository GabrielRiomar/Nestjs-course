import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { CriarUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid'
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
  
  constructor(private usuarioRepository: UsuarioRepository){}
  
  //Vamos voltar no VS Code. No arquivo usuario.controller.ts temos um private usuarioRepository = new UsuarioRepository(), estamos dando um new diretamente no UsuarioRepository. Isso não é bom para os testes da nossa aplicação. Por exemplo, se quisermos fazer um teste de unidade sem bater no banco de dados e esse repository acessa o banco de dados, não conseguiremos, de forma fácil, tirar esse repository e substituir por algo mais rápido. Afinal, se você tiver muitos testes, ir até o banco de dados pode ser algo bem lento.
  // private usuarioRepository = new UsuarioRepository
  
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriarUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity()
    usuarioEntity.nome = dadosDoUsuario.nome
    usuarioEntity.senha = dadosDoUsuario.senha
    usuarioEntity.email = dadosDoUsuario.email
    usuarioEntity.id = uuid()
    this.usuarioRepository.salvar(usuarioEntity)
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuario criado com sucesso!'
    }
  }

  @Get()
  async listaUsuarios(){
    const usuariosSalvos = await this.usuarioRepository.listar()
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(
        usuario.id,
        usuario.nome
      )
    )

    return usuariosLista
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO){
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados)

    return{
      usuario: usuarioAtualizado,
      message: 'Usuario atualizado com sucesso!'
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string){
    const usuarioRemovido = await this.usuarioRepository.remove(id);

    return {
        usuario: usuarioRemovido,
        menssage: 'usuário removido com sucesso'
    }
  }
}