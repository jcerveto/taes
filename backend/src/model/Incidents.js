// models/Incidents.js
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import * as db from "../services/db.js";

export class Incident {
    constructor({ id = new ObjectId() } = {}) {
        this._id = new ObjectId(id);
        this._uuid = "";
        this._email = "";  // Esto invocará el setter this.email(value)
        this._machineId =  "";
        this._machineName = "";
        this._machineBuilding = "";
        this._status = "";
        this._type = "incident";
        this._text = "";    // Esto invocará el setter this.text(value)
    }    

    // Getters and Setters
    get id() {
        return this._id;
    }

    get uuid() {
        return this._uuid;
    }

    set uuid(value) {
        this._uuid = value;
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
        return this._status;
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
            uuid: this._uuid,
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
            await db.deleteIncident(this._uuid);
        } catch (error) {
            console.error(error);
            throw new Error("Incident not deleted!");
        }
    }
    async update() {
        try {
            await db.updateIncident(this._uuid, this);
        } catch (error) {
            console.error(error);
            throw new Error("User not updated!");
        }
    }

    static async findByEmail(email) {
        try {
            return await db.readIncidents(email);
        } catch (error) {
            console.error(error);
            throw new Error("Incidents not found!");
        }
    }

    static async findById(uuid) {
        try {
            return await db.readIncidentId(uuid);
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
    static async closeIncident( email,machineId, text, newIncident) {
        console.log("EMAIL: ", email, "machineId: ", machineId, "text: ", text);
        return await db.updateIncidentStatus(email,machineId, text, newIncident);
    }
}
