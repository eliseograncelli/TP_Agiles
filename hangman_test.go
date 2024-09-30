package main

import (
	"testing"
)

func TestCreateGame(t *testing.T) {
	s := createGame("hola")

	if s.lives != 7 {
		t.Fatalf("Wrong lives")
	}
	if s.word != "hola" {
		t.Fatalf("Wrong word")
	}
	if len(s.usedLetters) != 0 {
		t.Fatalf("Wrong usedLetters")
	}
}

func TestGuessCorrectLetter(t *testing.T) {
	s := createGame("hola")

	res := s.guessLetter('l')
	if res != Correct_Letter {
		t.Fatalf("Didn't matched letter 'L'")
	}
}

func TestGuessCorrectLetterTwice(t *testing.T) {
	s := createGame("hola")

	s.guessLetter('l')
	res := s.guessLetter('l')

	if res != Repited_Letter {
		t.Fatalf("Didn't realized that 'L' was guest twice")
	}

}
func TestGuessWrongLetter(t *testing.T) {
	s := createGame("hola")

	res := s.guessLetter('z')
	if res != Wrong_Letter {
		t.Fatalf("Didn't fail")
	}
	if s.lives != 6 {
		t.Fatalf("Dind't substract live")
	}
}
