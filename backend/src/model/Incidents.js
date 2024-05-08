// models/Incidents.js
import { ObjectId } from 'mongodb';
import * as db from "../services/db.js";

export class Incident {
    constructor({ email, machineId, machineName, machineBuilding,  text, status, id = new ObjectId() } = {}) {
        this._id = new ObjectId(id);
        this.email = email;  // Esto invocará el setter this.email(value)
        this.machineId =  machineId;
        this.machineName = machineName;
        this.machineBuilding = machineBuilding;
        this.status = "open";
        this.text = text;    // Esto invocará el setter this.text(value)
    }    

    // Getters and Setters
    get id() {
        return this._id;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        if (!value) {
            throw new Error("Email cannot be empty!");
        }
        this._email = value;
    }

    get machineId() {
        return this._machineId;
    }

    set machineId(value) {
        if (!value) {
            throw new Error("Machine ID cannot be empty!");
        }
        this._machineId = value;
    }

    get machineName() {
        return this._machineName;
    }

    set machineName(value) {
        if (!value) {
            throw new Error("Machine Name cannot be empty!");
        }
        this._machineName = value;
    }

    get machineBuilding() {
        return this._machineBuilding;
    }

    set machineBuilding(value) {
        if (!value) {
            throw new Error("Machine Building cannot be empty!");
        }
        this._machineBuilding = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        if (!value) {
            throw new Error("Text cannot be empty!");
        }
        this._text = value;
    }

    get status() {
        return "open";
    }

    set status(value) {
        if (!value) {
            throw new Error("Status cannot be empty!");
        }
        this._status = value;
    }

    toJSON() {
        return {
            id: this._id,
            email: this._email,
            machineId: this._machineId,
            machineName: this._machineName,
            machineBuilding: this._machineBuilding,
            text: this._text,
            status: this._status,
            type: "incident"
        };
    }

    // Database Operations
    async save() {
        try {
            await db.createIncident(this);
        } catch (error) {
           console.error(error);
            throw new Error("Incident not saved!");
          }
    }

    async delete() {
        try {
            await db.deleteIncident(this._id);
        } catch (error) {
            console.error(error);
            throw new Error("Incident not deleted!");
        }
    }

    static async findByEmail(email) {
        try {
            return await db.readIncidents(email );
        } catch (error) {
            console.error(error);
            throw new Error("Incidents not found!");
        }
    }

    static async findById(id) {
        try {
            return await db.readIncidentId(id );
        } catch (error) {
            console.error(error);
            throw new Error("Incidents not found!");
        }
    }

    static async readAll() {
        try {
            return await db.readAllIncidents();
        } catch (error) {
            console.error(error);
            throw new Error("Incidents not read!");
        }
    }
}
