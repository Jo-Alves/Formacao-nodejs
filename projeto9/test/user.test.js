let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

let mainUser = {
    name: "Valdirene Aparecida Ferreira Carvalho",
    email: "valdireneaparecida@lastec.com",
    password: "joeval"
}

beforeAll(async() => {
    try {
        await request.post("/user").send(mainUser)
    } catch (error) {
        console.log(error);
    }
})

afterAll(() => {
    return request.delete(`/user/${mainUser.email}`)
        .then(() => {})
        .catch(error => {
            console.error(error);
        })
})

describe("Cadastro de Usuário", () => {
    test("Deve cadastrar os usuários", () => {
        let user = {
            name: "Valdirene Aparecida Ferreira",
            email: `ValdireneAparecida.${Date.now()}@lastec.com`,
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
                    .send(user)
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

    test("Deve buscar todos os usuários", () => {
        return request.get("/users")
            .then(response => {
                expect(response.statusCode).toEqual(200);
            })
            .catch(error => {
                fail(error)
            })
    })
})

describe("Autenticação do Usuário", () => {
    test("Deve retornar o token", () => {
        let user = {
            email: mainUser.email,
            password: mainUser.password
        }
        return request.post("/auth")
            .send(user)
            .then(response => {
                expect(response.statusCode).toEqual(200);
                expect(response.body.token).not.toEqual(undefined)
            })
            .catch(error => {
                fail(error);
            })
    })

    test("Retornar uma mensagem que o usuário não existe", () => {
        let user = {
            email: "asdsdfsdfdsfsdfsdfd@lastec.com",
            password: mainUser.password
        }
        return request.post("/auth")
            .send(user)
            .then(response => {
                expect(response.statusCode).toEqual(400)
                expect(response.body.error).toEqual("Usuário não existe!")
            })
            .catch(error => {
                fail(error)
            })
    })

    test("Retornar uma mensagem que a senha está incorreta", () => {
        let user = {
            email: mainUser.email,
            password: mainUser.password
        }
        return request.post("/auth")
            .send(user)
            .then(response => {
                expect(response.statusCode).toEqual(403);
                expect(response.body.error).toEqual("A senha está incorreta!");
            })
            .catch(error => {
                fail(error)
            })
    })
})