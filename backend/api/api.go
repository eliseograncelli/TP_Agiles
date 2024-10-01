package api

import (
	"fmt"
	"utn.com/utn/logic"
)

func SetUpServer() {
	s := logic.CreateGame("hola")
	fmt.Printf("s: %v\n", s)
}
