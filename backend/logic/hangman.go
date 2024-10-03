package logic

import "strings"

type GameState struct {
	Lives       int
	Word        string
	UsedLetters []rune
}

func CreateGame(word string) GameState {
	return GameState{
		Lives:       7,
		Word:        word,
		UsedLetters: []rune{},
	}
}

type GameResponse int64

const (
	Repited_Letter GameResponse = iota
	Correct_Letter
	Wrong_Letter
	Won_Game
	Loss_Game
)

func (state *GameState) encodeWord() string {
	length := len(state.Word)

	buffer := []byte(strings.Repeat("#", length))

	for _, guessed := range state.UsedLetters {
		for i, letter_in_word := range state.Word {
			if guessed == letter_in_word {
				buffer[i] = byte(guessed)
			}
		}
	}

	return string(buffer)
}

func (state *GameState) guessLetter(letter rune) GameResponse {

	//TODO: caracters invalidos
	for _, v := range state.UsedLetters {
		if v == letter {
			return Repited_Letter
		}
	}

	state.UsedLetters = append(state.UsedLetters, letter)

	found := false
	for _, v := range state.Word {
		if v == letter {
			found = true
		}
	}
	if found {
		return Correct_Letter
	} else {
		state.Lives -= 1
		return Wrong_Letter
	}

}

func (state *GameState) GuessWord(guess string) GameResponse {
	if state.Word == guess {
		return Won_Game
	}
	state.Lives = 0
	return Loss_Game
}
