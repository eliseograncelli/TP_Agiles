package main

import (
	"utn.com/utn/api"
	"utn.com/utn/peristance"
)

func main() {
	gameRepository := peristance.InitGameRepository()
	api.SetUpServer(gameRepository)
}
