let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

describe("Cadastro de Usuário", () => {
    test("Deve cadastrar os usuários", () => {
        let user = {
            name: "Joelmir Rogério Carvalho",
            email: `${Date.now()}@lastec.com`,
            password: "12345"
        };

        return request.post("/user")
            .send(user)
            .then(response => {
                expect(response.statusCode).toEqual(201);
                expect(response.body.email).toEqual(user.email);
            })
            .catch(error => {
                fail(error)
            })
    })

    test("Deve impedir que os usuários se cadastre com os dados vazios", () => {
        let user = {
            name: "",
            email: "",
            password: ""
        };

        return request.post("/user")
            .send(user)
            .then(response => {
                expect(response.statusCode).toEqual(400);
            })
            .catch(error => {
                fail(error)
            })
    })

    test("Deve impedir que o usuário se cadastre com email repetido", () => {
        let user = {
            name: "Joelmir Rogério Carvalho",
            email: `${Date.now()}@lastec.com`,
            password: "12345"
        };

        return request.post("/user")
            .send(user)
            .then(response => {
                expect(response.statusCode).toEqual(201);
                expect(response.body.email).toEqual(user.email);

                return request.post("/user")
                    .then(response => {
                        expect(response.statusCode).toEqual(400);
                        expect(response.body.error).toEqual("E-mail já cadastrado!");
                    })
                    .catch(error => {
                        fail(error)
                    })
            })
            .catch(error => {
                fail(error)
            })
    })
})