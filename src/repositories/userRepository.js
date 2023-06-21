import userManagerDB from "../dao/user.manager.js"

class UsuariosRepository{
    constructor(dao){
        this.dao = dao
    }

    async createUser(datosUsuario){
        return await this.dao.create(datosUsuario)
    }
}

export const usuariosRepository = new UsuariosRepository(userManagerDB)