import { expect, test } from "vitest";
import { Api } from "../frontend/src/lib/api";

const api = new Api("http://localhost:8000");

test("Crea el juego y devuelve el id", async () => {
  const { id } = await api.createGame("hola");
  expect(id).toBeTruthy();
});

test("Adivnia letra correcta", async () => {
  const { id } = await api.createGame("hola");
  const res = await api.guessesLetter(id, "h");
  expect(res).toEqual({ type: "correct", encoded: "h###" });
});

test("Adivnia letra incorrecta", async () => {
  const { id } = await api.createGame("hola");
  const res = await api.guessesLetter(id, "p");
  expect(res).toEqual({ type: "wrong", lives: 6 });
});

test("Adivnia palabra correcta", async () => {
  const { id } = await api.createGame("hola");
  const res = await api.guessWord(id, "hola");
  expect(res).toEqual({ type: "won" });
});

test("Adivnia palabra incorrecta", async () => {
  const { id } = await api.createGame("hola");
  const res = await api.guessWord(id, "murcielago");
  expect(res).toEqual({ type: "loss" });
});
