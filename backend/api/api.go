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
			"id":     id,
			"encode": game.EncodeWord(),
		})
	})

	r.Run(":8000")

}
