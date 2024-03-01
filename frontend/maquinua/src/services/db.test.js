import {createUser, deleteAllUsers, readAllUsers, updateUser} from "./db.js";

import { User } from "../model/User.js";

async function main() {
    console.log("start");

    readAllUsers().then((users) => console.log(users)).catch((error) => console.error(error));


    const users = [
        {
            name: "joan",
        },
        {
            name: "adri",
        }
    ]
    const usersTypes = users.map((u) => {
        const iterUser = new User();
        iterUser.name = u.name;
        iterUser.bornDate = new Date();
        iterUser.email = u.name + "@ua.es"
        iterUser.password = "1234";

        return iterUser;
    });

    for (let user of usersTypes) {
        console.log("creating: ", user)
        await createUser(user)
    }

    readAllUsers().then((users) => console.log(users)).catch((error) => console.error(error));


    deleteAllUsers().then(() => console.log("Deleted")).catch((error) => console.error(error));

    readAllUsers().then((users) => console.log(users)).catch((error) => console.error(error));

    console.log("create again: ", JSON.stringify(users));
    for (let user of usersTypes) {
        console.log("creating: ", user)
        await createUser(user)
    }

    const usersRead = await readAllUsers();
    usersRead[0].name = "JOANenMayus";


    await updateUser(usersRead[0].email, usersRead[0]);
    console.log("updated: ", usersRead[0]);

    readAllUsers().then((users) => console.log(users)).catch((error) => console.error(error));

    console.log("reading one: ", usersRead[0]);

    const oneUser = usersRead[0];
    const readOne = await User.read(oneUser.email);
    console.log("readOne from DB: ", readOne);


    oneUser.email = oneUser.email + ".com";
    await oneUser.create();

    console.log("created: ", oneUser);

    readAllUsers().then((users) => console.log(users)).catch((error) => console.error(error));

    console.log("deleting: ", oneUser);
    await oneUser.delete();
    readAllUsers().then((users) => console.log(users)).catch((error) => console.error(error));



    console.log("finalfinalfinal");
}

main();


// node ./db.test.js para comprobar que funciona