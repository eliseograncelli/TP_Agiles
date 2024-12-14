Feature: Hangman 

  Scenario: Iniciar partida
    Given navego a "/create-game"
    When ingreso la palabra "agil"
    When clicko en el botón Jugar
    Then debería ver el link a la partida
    When hace click en el link de la partida
    Then ve la palabra oculta con "4" letras

