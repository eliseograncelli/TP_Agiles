import { beforeAll, expect, test } from "vitest";
import { Api } from "../frontend/src/lib/api";

const api = new Api("http://localhost:8000");

beforeAll(async () => {
  for (let i = 0; i < 10; i++) {
    const { ok } = await api.healthCheck();
    if (ok) {
      break;
    }
  }
});

test("Crea el juego y devuelve el id", async () => {
  const { id } = await api.createGame("hola");
  expect(id).toBeTruthy();
});

test("Obtiene el estado del juego recien iniciado", async () => {
  const { id } = await api.createGame("hola");
  const res = await api.getGame(id);
  expect(res.encode).toBe("####");
  expect(res.lives).toBe(7);
  expect(res.guesses).toEqual([]);
});

test("Obtiene el estado del juego en la mitad", async () => {
  const { id } = await api.createGame("hola");
  await api.guessesLetter(id, "h");
  await api.guessesLetter(id, "j");
  const res = await api.getGame(id);
  expect(res.encode).toBe("H###");
  expect(res.lives).toBe(6);
  expect(res.guesses).toContain("H");
  expect(res.guesses).toContain("J");
  expect(res.guesses.length).toBe(2);
});

test("Adivnia letra correcta", async () => {
  const { id } = await api.createGame("hola");
  const res = await api.guessesLetter(id, "h");
  expect(res).toEqual({ type: "correct", encoded: "H###" });
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
