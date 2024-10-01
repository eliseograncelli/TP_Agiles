package logic

import "strings"

type GameState struct {
	lives       int
	word        string
	usedLetters []rune
}

func CreateGame(word string) GameState {
	return GameState{
		lives:       7,
		word:        word,
		usedLetters: []rune{},
	}
}

type GameResponse int64

const (
	Repited_Letter GameResponse = iota
	Correct_Letter
	Wrong_Letter
)

func (state *GameState) encodeWord() string {
	length := len(state.word)

	buffer := []byte(strings.Repeat("#", length))

	for _, guessed := range state.usedLetters {
		for i, letter_in_word := range state.word {
			if guessed == letter_in_word {
				buffer[i] = byte(guessed)
			}
		}
	}

	return string(buffer)
}

func (state *GameState) guessLetter(letter rune) GameResponse {

	//TODO: caracters invalidos
	for _, v := range state.usedLetters {
		if v == letter {
			return Repited_Letter
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
		return Correct_Letter
	} else {
		state.lives -= 1
		return Wrong_Letter
	}

}
