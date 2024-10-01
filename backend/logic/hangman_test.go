package logic

import (
	"testing"
)

func TestCreateGame(t *testing.T) {
	s := CreateGame("hola")

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
	s := CreateGame("hola")

	res := s.guessLetter('l')
	if res != Correct_Letter {
		t.Fatalf("Didn't matched letter 'L'")
	}
}

func TestGuessCorrectLetterTwice(t *testing.T) {
	s := CreateGame("hola")

	s.guessLetter('l')
	res := s.guessLetter('l')

	if res != Repited_Letter {
		t.Fatalf("Didn't realized that 'L' was guest twice")
	}

}

func TestGuessWrongLetter(t *testing.T) {
	s := CreateGame("hola")

	res := s.guessLetter('z')
	if res != Wrong_Letter {
		t.Fatalf("Didn't fail")
	}
	if s.lives != 6 {
		t.Fatalf("Dind't substract live")
	}
}

func Test_encode_word_all_empty_4(t *testing.T) {
	s := CreateGame("hola")
	res := s.encodeWord()

	if res != "####" {
		t.Fatal()
	}
}

func Test_encode_word_all_empty_6(t *testing.T) {
	s := CreateGame("buenas")
	res := s.encodeWord()

	if res != "######" {
		t.Fatal()
	}
}

func Test_encode_first_gussed(t *testing.T) {
	s := CreateGame("hola")
	s.guessLetter('h')
	res := s.encodeWord()

	if res != "h###" {
		t.Fatal()
	}
}

func Test_encode_first_gussed_missed_second(t *testing.T) {
	s := CreateGame("hola")
	s.guessLetter('h')
	s.guessLetter('y')
	res := s.encodeWord()

	if res != "h###" {
		t.Fatal()
	}
}

func Test_encode_first_and_second(t *testing.T) {
	s := CreateGame("hola")
	s.guessLetter('h')
	s.guessLetter('l')
	res := s.encodeWord()

	if res != "h#l#" {
		t.Fatal()
	}
}

func Test_encode_guest_duplicated_letter(t *testing.T) {
	s := CreateGame("perro")
	s.guessLetter('r')
	res := s.encodeWord()

	if res != "##rr#" {
		t.Fatal()
	}
}
