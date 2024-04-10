import * as db from "../services/db.js";
import { ObjectId } from "mongodb";


export class Incidents {

    get id() {
        if (this._id === undefined) {
            throw new Error("id is undefined!");
        }
        if (this._id === "") {
            throw new Error("Error: id can not be empty!");
        }

        return new ObjectId(this._id);
    }

    set id(value) {
        if (value === undefined) {
            throw new Error("Error: id can not be undefined!");
        }
        if (value === "") {
            throw new Error("Error: id can not be empty!");
        }
        if (!ObjectId.isValid(value)) {
            throw new Error("Error: id is not a valid ObjectId!");
        }

        this._id = new ObjectId(value);
    }

    get incidencia() {
        if (this._incidencia === undefined) {
            throw new Error("incidencia is undefined!");
        }
        if (this._incidencia === "") {
            throw new Error("Error: incidencia can not be empty!");
        }

        return this._incidencia;
    }

    constructor({ id = new ObjectId() } = {}) {
        this._incidencia = "";
        this._id = new ObjectId(id);
    }

    set incidencia(value) {
        if (value === undefined) {
            throw new Error("Error: incidencia can not be undefined!");
        }
        if (value === "") {
            throw new Error("Error: incidencia can not be empty!");
        }

        this._incidencia = value;
    }

    static async readAll() {
        try {
            return await db.readAllIncidents();
        } catch (error) {
            console.error(error);
            throw new Error("Incidents not read!");
        }
    }

    async delete() {
        try {
            await db.deleteIncident(this.id);
        } catch (error) {
            console.error(error);
            throw new Error("Incedent not deleted!");
        }
    }



    async create() {
        try {
            await db.createIncidents(this);
        } catch (error) {
            console.error(error);
            throw new Error("Incident not created!");
        }
    }
}
