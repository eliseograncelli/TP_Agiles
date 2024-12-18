Feature: Hangman

  Scenario: Iniciar partida
    Given navego a "/create-game"
    When ingreso la palabra "<word>"
    When clicko en el botón Jugar
    Then debería ver el link a la partida
    When hace click en el link de la partida
    Then ve la palabra oculta con "<length>" letras

    Examples:
      | word                   | length |
      | agil                   |      4 |
      | esternocleidomastoideo |     22 |
      | ingeniero              |      9 |

  Scenario: Ingresar letra válida
    Given Partida iniciada con la palabra "<word>"
    When intento la letra "<letter>"
    Then debería ver la letra "<letter>" en la letras arriesgadas
    Then se ve la palabra revelada "<display>"
    Then la cabeza es "visible"
    Then la cuerpo es "no visible"

    Examples:
      | word  | letter | display   |
      | agil  | G      | _ G _ _   |
      | scrum | S      | S _ _ _ _ |
      | tests | T      | T _ _ T _ |

  Scenario: Ingresar letra invalida
    Given Partida iniciada con la palabra "<word>"
    When intento la letra "<letter>"
    Then debería ver la letra "<letter>" en la letras arriesgadas
    Then la cabeza es "visible"
    Then la cuerpo es "no visible"
    Then se ve la palabra revelada "<display>"

    Examples:
      | word | letter | display   |
      | agil | Y      | _ _ _ _   |
      | hola | J      | _ _ _ _   |
      | perro| Y      | _ _ _ _ _ |

  Scenario: Arriesgar la palabra correcta
    Given Partida iniciada con la palabra "<word>"
    When intento la palabra "<word>"
    Then deberia aparecerme un cartel que diga "Ganaste"

    Examples:
      | word |
      | agil |
      | hola |
      | test |


  Scenario: Arriesgar la palabra incorrecta
    Given Partida iniciada con la palabra "<word>"
    When intento la palabra "<guess>"
    Then deberia aparecerme un cartel que diga "Perdiste"

    Examples:
      | word | guess |
      | agil | hola  |
      | hola | test  |
      | test | agil  |
  