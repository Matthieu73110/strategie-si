import * as chai from "chai";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import axios from "axios";
import { fetchUser, createUser } from "../api.js";

chai.use(sinonChai);
const expect = chai.expect;

describe("fetchUser", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("devrait retourner les données de l'utilisateur quand la requête réussit", async function () {
    const fakeUser = { id: 1, name: "Alice" };

    const stub = sinon.stub(axios, "get").resolves({ data: fakeUser });

    const result = await fetchUser(1);

    expect(stub).to.have.been.calledOnceWith(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    expect(result).to.deep.equal(fakeUser);
  });

  it("devrait lancer une erreur quand la requête échoue", async function () {
    sinon.stub(axios, "get").rejects(new Error("Erreur réseau"));

    try {
      await fetchUser(2);
      throw new Error("Test échoué, exception attendue");
    } catch (error) {
      expect(error.message).to.equal(
        "Erreur lors de la récupération de l'utilisateur"
      );
    }
  });

  it("devrait appeler l'URL correcte pour un autre userId", async function () {
    const stub = sinon.stub(axios, "get").resolves({ data: { id: 42 } });

    await fetchUser(42);

    expect(stub).to.have.been.calledOnceWith(
      "https://jsonplaceholder.typicode.com/users/42"
    );
  });

  it("devrait appliquer l'option timeout lors de l'appel axios", async function () {
    const stub = sinon.stub(axios, "get").resolves({ data: { id: 3 } });

    await fetchUser(3, { timeout: 5000 });

    expect(stub).to.have.been.calledOnceWith(
      "https://jsonplaceholder.typicode.com/users/3",
      { timeout: 5000 }
    );
  });

  it("devrait appeler axios.get avec spy (appel réel)", async function () {
    const spy = sinon.spy(axios, "get");

    const result = await fetchUser(1);

    expect(spy.calledOnce).to.be.true;
    expect(result).to.have.property("id", 1);

    spy.restore();
  });

  it("devrait envoyer une requête POST pour créer un utilisateur", async function () {
    const fakeResponse = { id: 101, name: "Bob" };
    const stub = sinon.stub(axios, "post").resolves({ data: fakeResponse });

    const newUser = { name: "Bob" };
    const result = await createUser(newUser);

    expect(stub).to.have.been.calledOnceWith(
      "https://jsonplaceholder.typicode.com/users",
      newUser
    );
    expect(result).to.deep.equal(fakeResponse);
  });
});
