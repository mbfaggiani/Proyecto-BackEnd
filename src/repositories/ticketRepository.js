import { ticketsManagerDB } from "../dao/tickets.manager.js";
import { Ticket } from "../entidades/tickets.js";

class TicketsRepository{
    constructor(dao){
        this.dao = dao
    }

    async crearTicket(datos){
        return await this.dao.crearTicket(datos)
    }
}

export const ticketsRepository = new TicketsRepository(ticketsManagerDB)