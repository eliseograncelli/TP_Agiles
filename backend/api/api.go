package api

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"utn.com/utn/logic"
	"utn.com/utn/peristance"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // Replace "*" with specific domain for security
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight request
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func SetUpServer(repo peristance.GameRepository) {

	r := gin.Default()

	r.Use(CORSMiddleware())

	r.GET("/healthcheck", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hola Mundo",
		})
	})

	type RequestCreateGame struct {
		Word string `json:"word"`
	}

	r.POST("/create-game", func(c *gin.Context) {
		var data RequestCreateGame

		err := c.ShouldBindJSON(&data)
		if err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		game := logic.CreateGame(data.Word)
		id := repo.Save(game)

		c.JSON(200, gin.H{
			"id": id,
		})
	})

	r.GET("/get-game/:id", func(c *gin.Context) {
		id := c.Param("id")
		game := repo.GetOne(id)

		fmt.Printf("game: %v\n", game)
		c.JSON(200, gin.H{
			"id":      id,
			"encode":  game.EncodeWord(),
			"lives":   game.GetLives(),
			"guesses": game.GetGuesses(),
		})
	})

	r.POST("/guess-letter", func(c *gin.Context) {
		var data struct {
			GameId string `json:"gameId"`
			Letter rune   `json:"letter"`
		}

		err := c.ShouldBindJSON(&data)
		if err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		fmt.Printf("data: %v\n", data)
		game := repo.GetOne(data.GameId)
		res := game.GuessLetter(data.Letter)
		repo.Update(data.GameId, game)

		switch res {
		case logic.Repited_Letter:
			c.JSON(200, gin.H{
				"type": "repeated-letter",
			})
		case logic.Correct_Letter:
			c.JSON(200, gin.H{
				"type":    "correct",
				"encoded": game.EncodeWord(),
			})
		case logic.Wrong_Letter:
			c.JSON(200, gin.H{
				"type":  "wrong",
				"lives": game.GetLives(),
			})
		case logic.Won_Game:
			c.JSON(200, gin.H{
				"type":    "won",
				"encoded": game.EncodeWord(),
			})
		case logic.Loss_Game:
			c.JSON(200, gin.H{
				"type": "loss",
			})
		}

	})

	r.POST("/guess-word", func(c *gin.Context) {
		var data struct {
			GameId string `json:"gameId"`
			Word   string `json:"word"`
		}

		err := c.ShouldBindJSON(&data)
		if err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		fmt.Printf("data: %v\n", data)
		game := repo.GetOne(data.GameId)
		res := game.GuessWord(data.Word)
		repo.Update(data.GameId, game)

		switch res {
		case logic.Won_Game:
			c.JSON(200, gin.H{
				"type": "won",
			})
		case logic.Loss_Game:
			c.JSON(200, gin.H{
				"type": "loss",
			})
		}

	})

	r.Run(":8000")

}
