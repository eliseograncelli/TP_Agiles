package logic

import "strings"
import "unicode"

type GameResponse int64

const (
	Repited_Letter GameResponse = iota
	Correct_Letter
	Wrong_Letter
	Won_Game
	Loss_Game
)

type GameState struct {
	lives       int
	word        string
	usedLetters []rune
}

func CreateGame(word string) GameState {
	return GameState{
		lives:       7,
		word:        strings.ToUpper(word),
		usedLetters: []rune{},
	}
}

func (state *GameState) EncodeWord() string {
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

func (state *GameState) GuessLetter(letter rune) GameResponse {

	letter = unicode.ToUpper(letter)

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
		if state.wonGame() {
			return Won_Game
		}
		return Correct_Letter
	} else {
		state.lives -= 1
		if state.lives == 0 {
			return Loss_Game
		}
		return Wrong_Letter
	}

}

func (state *GameState) GuessWord(guess string) GameResponse {

	guess = strings.ToUpper(guess)

	if state.word == guess {
		return Won_Game
	}
	state.lives = 0
	return Loss_Game
}

func (state *GameState) GetLives() int {
	return state.lives
}

func (state *GameState) GetGuesses() []string {
	guesses := make([]string, len(state.usedLetters))
	for i, r := range state.usedLetters {
		guesses[i] = string(r)
	}
	return guesses
}

func (state *GameState) wonGame() bool {
	count := 0
	for _, c := range state.EncodeWord() {
		if c == '#' {
			count++
		}
	}
	return count == 0
}
