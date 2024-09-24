package main

import (
	"fmt"
)

type GameState struct {
	lives       int
	word        string
	usedLetters []rune
}

func createGame(word string) GameState {
	return GameState{
		lives:       7,
		word:        word,
		usedLetters: []rune{},
	}
}

func (state *GameState) guessLetter(letter rune) string {

	for _, v := range state.usedLetters {
		if v == letter {
			return "used letter"
		}
	}

	state.usedLetters = append(state.usedLetters, letter)

	found := false
	for _, v := range state.word {
		if v == letter {
			found = true
		}
	}
	if found {
		return "matched"
	} else {
		state.lives -= 1
		return "loss live"
	}

}

func main() {
	s := createGame("hola")
	fmt.Printf("s.word: %v\n", s.word)
	fmt.Printf("s.guessLetter('h'): %v\n", s.guessLetter('h'))
	fmt.Printf("s: %v\n", s)
	fmt.Printf("s.guessLetter('h'): %v\n", s.guessLetter('h'))
	fmt.Printf("s: %v\n", s)
	fmt.Printf("s.guessLetter('j'): %v\n", s.guessLetter('j'))
	fmt.Printf("s: %v\n", s)

}
