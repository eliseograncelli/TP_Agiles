package api

import (
	"github.com/gin-gonic/gin"
	"utn.com/utn/logic"
	"utn.com/utn/peristance"
)

func SetUpServer(repo peristance.GameRepository) {

	r := gin.Default()

	r.GET("/helthcheck", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hola Mundo",
		})
	})

	r.POST("/create-game", func(c *gin.Context) {
		word := "hola" //TODO: get form request
		game := logic.CreateGame(word)
		id := repo.Save(game)

		c.JSON(200, gin.H{
			"id": id,
		})
	})

	r.GET("/get-game", func(c *gin.Context) {
		id := "2"
		game := repo.GetOne(id)

		c.JSON(200, gin.H{
			"id":     id,
			"encode": game.EncodeWord(),
		})
	})

	r.Run(":8000")

}
