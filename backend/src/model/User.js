//import { v4 as uuidv4 } from 'uuid';

import * as db from "../services/db.js";
import {ObjectId} from "mongodb";


export class User {
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
        if (! ObjectId.isValid(value)) {
            throw new Error("Error: id is not a valid ObjectId!");
        }

        this._id = new ObjectId(value);
    }

    get username() {
        if (this._username === undefined) {
            throw new Error("username is undefined!");
        }
        if (this._username === "") {
            throw new Error("Error: username can not be empty!");
        }

        return this._username;
    }

    set username(value) {
        if (value === undefined) {
            throw new Error("Error: username can not be undefined!");
        }
        if (value === "") {
            throw new Error("Error: username can not be empty!");
        }

        this._username = value;
    }

    get name() {
        if (this._name === undefined) {
            throw new Error("name is undefined!");
        }
        if (this._name === "") {
            throw new Error("Error: name can not be empty!");
        }

        return this._name;
    }

    set name(value) {
        if (value === undefined) {
            throw new Error("Error: name can not be undefined!");
        }
        if (value === "") {
            throw new Error("Error: name can not be empty!");
        }

        this._name = value;
    }

    get surname() {
        if (this._surname === undefined) {
            throw new Error("surname is undefined!");
        }
        if (this._surname === "") {
            throw new Error("Error: surname can not be empty!");
        }

        return this._surname;
    }

    set surname(value) {
        if (value === undefined) {
            throw new Error("Error: surname can not be undefined!");
        }
        if (value === "") {
            throw new Error("Error: surname can not be empty!");
        }

        this._surname = value;
    }

    get email() {
        if (this._email === undefined) {
            throw new Error("email is undefined!");
        }
        if (this._email === "") {
            throw new Error("Error: email can not be empty!");
        }

        return this._email;
    }

    set email(value) {
        if (value === undefined) {
            throw new Error("Error: email can not be undefined!");
        }
        if (value === "") {
            throw new Error("Error: email can not be empty!");
        }

        this._email = value;
    }

    get password() {
        if (this._password === undefined) {
            throw new Error("password is undefined!");
        }
        if (this._password === "") {
            throw new Error("Error: password can not be empty!");
        }

        return this._password;
    }

    set password(value) {
        if (value === undefined) {
            throw new Error("Error: password can not be undefined!");
        }
        if (value === "") {
            throw new Error("Error: password can not be empty!");
        }

        this._password = value;
    }

    get bornDate() {
        if (this._bornDate === undefined) {
            throw new Error("bornDate is undefined!");
        }
        if (!(this._bornDate instanceof Date)) {
            throw new Error("Error: bornDate is not a Date!");
        }


        return this._bornDate;
    }

    set bornDate(value) {
        if (value === undefined) {
            throw new Error("Error: bornDate can not be undefined!");
        }
        if (!(value instanceof Date)) {
            throw new Error("Error: bornDate is not a Date!");
        }

        this._bornDate = value;
    }

    constructor({ id = new ObjectId() } = {}) {
        this._username = "";
        this._name = "";
        this._surname = "";
        this._email = "";
        this._password = "";
        this._bornDate = new Date();
        this._id = new ObjectId(id);
    }


    async create() {
        try {
            await db.createUser(this);
        } catch (error) {
            console.error(error);
            throw new Error("User not created!");
        }
    }

    async update() {
        try {
            await db.updateUser(this.email, this);
        } catch (error) {
            console.error(error);
            throw new Error("User not updated!");
        }
    }

    async delete() {
        try {
            await db.deleteUser(this.email);
        } catch (error) {
            console.error(error);
            throw new Error("User not deleted!");
        }
    }

    static async read(email) {
        try {
            return await db.readUser(email);
        } catch (error) {
            console.error(error);
            throw new Error("User not read!");
        }
    }

    toJSON() {
        return {
            username: this._username,
            name: this._name,
            surname: this._surname,
            email: this._email,
            password: this._password,
            bornDate: this._bornDate,
            type: "user"
        }
    }



    static async readAll() {
        try {
            return await db.readAllUsers();
        } catch (error) {
            console.error(error);
            throw new Error("User not read!");
        }
    }

}

