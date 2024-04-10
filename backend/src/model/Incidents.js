// models/Incidents.js
import { ObjectId } from 'mongodb';
import * as db from "../services/db.js";

export class Incident {
    constructor({ email, text, id = new ObjectId() } = {}) {
        this._id = new ObjectId(id);
        this.email = email;  // Esto invocará el setter this.email(value)
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

    get text() {
        return this._text;
    }

    set text(value) {
        if (!value) {
            throw new Error("Text cannot be empty!");
        }
        this._text = value;
    }

    toJSON() {
        return {
            id: this._id,
            email: this._email,
            text: this._text,
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
            return await db.readIncidents({ email: email });
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
