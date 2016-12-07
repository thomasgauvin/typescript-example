import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";

createConnection({
    driver: {
        type: "postgres", // to use mysql instead, just change it to "mysql", change other params (port, credentials) and install driver: npm i mysql
        host: "localhost",
        port: 5432,
        username: "test",
        password: "test",
        database: "test"
    },
    entities: [
        Post,
        Category
    ],
    autoSchemaSync: true
}).then(async connection => {

    const category1 = new Category();
    category1.name = "TypeScript";

    const category2 = new Category();
    category2.name = "Programming";

    const post = new Post();
    post.title = "Control flow based type analysis";
    post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
    post.categories = [category1, category2];

    const postRepository = connection.getRepository(Post);
    await postRepository.persist(post);

    console.log("Post has been saved: ", post);

}).catch(error => console.log("Error: ", error));