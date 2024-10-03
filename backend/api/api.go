package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"utn.com/utn/logic"
)

type RequestBody_CreateGame struct {
	Word string `json:"name" binding:"required" example:"secret"`
}

// Start Game
// @Summary      Recives a word a start a game
// @Description  Responds with the slug to the newly started game.
// @Tags         game
// @Produce      json
// @Success      200  {string} string slug
// @Router       /start [post]
// @Param word body RequestBody_CreateGame true "Secret Word"
// @Success 200 {string} string "Game slug (identifier)"
func Start(c *gin.Context) {

	//TODO: validate word
	//TODO: return slug
	//TODO: persist game

	var requestBody RequestBody_CreateGame

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	s := logic.CreateGame(requestBody.Word)

	c.JSON(200, gin.H{
		"message": s.Lives,
	})
}

func SetUpServer() *gin.Engine {

	r := gin.Default()

	r.POST("/start", Start)

	return r
}
