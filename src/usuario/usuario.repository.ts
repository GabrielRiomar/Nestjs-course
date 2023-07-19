import { Injectable } from "@nestjs/common"
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository{
  private usuarios: UsuarioEntity[] = []

  salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario)
  }

  async listar(){
    return this.usuarios
  }

  async existeComEmail(email) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
        usuario => usuario.id === id
    );

    if(!possivelUsuario) {
        throw new Error('Usuário não existe');
    }
    return possivelUsuario
}

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>){
    //Como dadosDeAtualizacao é um Partial(Typescript), a chave id pode vir ou não, porque não temos controle de quem chamará o método atualiza(). Mas nós não queremos atualizar o ID do usuário! Essa informação é única, durante todo o seu tempo de existência na nossa API. Então, dentro das chaves da arrow function, vamos incluir um if para prevenir que um ID seja atualizado por engano.
    const usuario = this.buscaPorId(id)
    
    //Posicionando o mouse sobre Object.entries(), o VS Code exibirá uma breve definição desse método. Em suma, ele retornará um array em que cada elemento é outro array com o par chave/valor do objeto.
    
    Object.entries(dadosDeAtualizacao).forEach(([key, value]) => {
      if(key === 'id'){
        return
      }

      usuario[key] = value
    })

    return usuario
  }

  async remove(id: string){
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter(
        usuario => usuario.id !== id
    );

    return usuario;
  }
}