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

	res := s.GuessLetter('l')
	if res != Correct_Letter {
		t.Fatalf("Didn't matched letter 'L'")
	}
}

func TestGuessCorrectLetterTwice(t *testing.T) {
	s := CreateGame("hola")

	s.GuessLetter('l')
	res := s.GuessLetter('l')

	if res != Repited_Letter {
		t.Fatalf("Didn't realized that 'L' was guest twice")
	}

}

func TestGuessWrongLetter(t *testing.T) {
	s := CreateGame("hola")

	res := s.GuessLetter('z')
	if res != Wrong_Letter {
		t.Fatalf("Didn't fail")
	}
	if s.lives != 6 {
		t.Fatalf("Dind't substract live")
	}
}

func Test_encode_word_all_empty_4(t *testing.T) {
	s := CreateGame("hola")
	res := s.EncodeWord()

	if res != "####" {
		t.Fatal()
	}
}

func Test_encode_word_all_empty_6(t *testing.T) {
	s := CreateGame("buenas")
	res := s.EncodeWord()

	if res != "######" {
		t.Fatal()
	}
}

func Test_encode_first_gussed(t *testing.T) {
	s := CreateGame("hola")
	s.GuessLetter('h')
	res := s.EncodeWord()

	if res != "h###" {
		t.Fatal()
	}
}

func Test_encode_first_gussed_missed_second(t *testing.T) {
	s := CreateGame("hola")
	s.GuessLetter('h')
	s.GuessLetter('y')
	res := s.EncodeWord()

	if res != "h###" {
		t.Fatal()
	}
}

func Test_encode_first_and_second(t *testing.T) {
	s := CreateGame("hola")
	s.GuessLetter('h')
	s.GuessLetter('l')
	res := s.EncodeWord()

	if res != "h#l#" {
		t.Fatal()
	}
}

func Test_encode_guest_duplicated_letter(t *testing.T) {
	s := CreateGame("perro")
	s.GuessLetter('r')
	res := s.EncodeWord()

	if res != "##rr#" {
		t.Fatal()
	}
}

func Test_guess_word_win(t *testing.T) {
	s := CreateGame("hola")
	res := s.GuessWord("hola")
	if res != Won_Game {
		t.Fatal()
	}
}

func Test_guess_word_loss(t *testing.T) {
	s := CreateGame("hola")
	res := s.GuessWord("algo")
	if res != Loss_Game {
		t.Fatal()
	}
}

func Test_guess_word_loss_substract_lives(t *testing.T) {
	s := CreateGame("hola")
	s.GuessWord("algo")
	if s.lives != 0 {
		t.Fatal()
	}
}

func Test_Won_By_Guessing_letter(t *testing.T) {
	s := CreateGame("hola")
	s.GuessLetter('o')
	s.GuessLetter('h')
	s.GuessLetter('l')

	res := s.GuessLetter('a')
	if res != Won_Game {
		t.Fatal()
	}
}
