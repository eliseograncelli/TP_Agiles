package peristance

import (
	"fmt"
	"strconv"

	"utn.com/utn/logic"
)

type GameState = logic.GameState

// interface
type GameRepository interface {
	Save(game GameState) string
	GetOne(id string) GameState
	Update(id string, game GameState)
}

func InitGameRepository() GameRepository {
	return &DataBase{
		internaMap: make(map[string]GameState),
	}
}

// implementation

type DataBase struct {
	internaMap map[string]GameState
}

func (db *DataBase) Save(game GameState) string {
	fmt.Printf("game: %v\n", game)
	id := strconv.Itoa(len(db.internaMap) + 1)
	db.internaMap[id] = game
	return id
}

func (g *DataBase) GetOne(id string) GameState {
	return g.internaMap[id]
}

func (db *DataBase) Update(id string, game GameState) {
	db.internaMap[id] = game
}
