Feature: Hangman

  Scenario: Iniciar partida
    Given navego a "/create-game"
    When ingreso la palabra "agil"
    When clicko en el botón Jugar
    Then debería ver el link a la partida
    When hace click en el link de la partida
    Then ve la palabra oculta con "4" letras

  Scenario: Ingresar letra válida
    Given Partida iniciada con la palabra "agil"
    When intento la letra "g"
    Then debería ver la letra "G" en la letras arriesgadas
    Then debería ver la letra revelada como "_ G _ L"
    Then la cabeza es "visible"
    Then la cuerpo es "no visible"
