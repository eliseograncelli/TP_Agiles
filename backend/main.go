package main

import (
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"utn.com/utn/api"
	_ "utn.com/utn/docs"
)

// @title    Hangman API
// @version         1.0
// @description     An api to play the famous Hangman game of guessing words.

// @contact.name  Bruno Mollo
// @contact.url    https://github.com/BrunoMollo

// @license.name  MIT
// @license.url  TODO:add

// @host      localhost:8080
// @BasePath  /api
func main() {
	r := api.SetUpServer()

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run()
}
