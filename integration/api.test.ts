import { beforeAll, expect, test } from "vitest";
import {Api} from "../frontend/src/lib/api"


beforeAll(()=>{
  Api.BACK_URL='http://localhost:8000'
})


test("Crea el juego y devuelve el id", async () => {
  const {id}=await Api.createGame("hola")
  expect(id).toBeTruthy()
});


test("Adivnia letra correcta", async () => {
  const {id}=await Api.createGame("hola")
  const res=await new Api(id).guessesLetter("h")
  expect(res).toEqual({ type: "correct", encoded: "h###" });
});

test("Adivnia letra incorrecta", async () => {
  const {id}=await Api.createGame("hola")
  const res=await new Api(id).guessesLetter("p")
  expect(res).toEqual({ type: "wrong", lives: 6 });
});

test("Adivnia palabra correcta", async () => {
  const {id}=await Api.createGame("hola")
  const res=await new Api(id).guessWord("hola")
  expect(res).toEqual({ type: "won" });
});

test("Adivnia palabra incorrecta", async () => {
  const {id}=await Api.createGame("hola")
  const res=await new Api(id).guessWord("murcielago")
  expect(res).toEqual({ type: "loss" });
});
