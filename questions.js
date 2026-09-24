window.TOPICS = ["Saludos y expresiones básicas", "Alfabeto en inglés", "Vocales, consonantes y pronunciación básica", "Números", "Cómo presentarte en inglés"];
window.QUESTIONS = [
  {
    "id": "t1-choice",
    "topic": 1,
    "type": "choice",
    "prompt": "Completa el saludo de la mañana: Good ___.",
    "explain": "Good morning se usa para saludar por la mañana.",
    "tag": "Saludos",
    "choices": [
      "morning",
      "evening",
      "night"
    ],
    "answer": "morning"
  },
  {
    "id": "t1-fill",
    "topic": 1,
    "type": "fill",
    "prompt": "Completa con una palabra: My name ___ Laura.",
    "explain": "My name se acompaña de is.",
    "tag": "Presentación básica",
    "answers": [
      "is"
    ]
  },
  {
    "id": "t1-dictation",
    "topic": 1,
    "type": "dictation",
    "prompt": "Escucha y escribe la frase completa.",
    "explain": "Nice to meet you expresa gusto por conocer a alguien.",
    "tag": "Dictado",
    "audio": "Nice to meet you.",
    "answers": [
      "Nice to meet you"
    ]
  },
  {
    "id": "t1-listening",
    "topic": 1,
    "type": "listening",
    "prompt": "Escucha. ¿De dónde es la persona?",
    "explain": "I am from Mexico indica el lugar de origen.",
    "tag": "Comprensión auditiva",
    "audio": "Hello. My name is Ana. I am from Mexico.",
    "choices": [
      "Mexico",
      "Canada",
      "Spain"
    ],
    "answer": "Mexico"
  },
  {
    "id": "t1-order",
    "topic": 1,
    "type": "order",
    "prompt": "Ordena las palabras para preguntar el nombre.",
    "explain": "What is your name? pregunta cómo se llama la persona.",
    "tag": "Orden de palabras",
    "tokens": [
      "What",
      "is",
      "your",
      "name?"
    ],
    "answers": [
      "What is your name?"
    ]
  },
  {
    "id": "t1-match",
    "topic": 1,
    "type": "match",
    "prompt": "Relaciona cada pregunta con su respuesta.",
    "explain": "Cada pregunta solicita un dato distinto: nombre, edad u origen.",
    "tag": "Preguntas básicas",
    "pairs": [
      [
        "What is your name?",
        "My name is Luis."
      ],
      [
        "How old are you?",
        "I am sixteen years old."
      ],
      [
        "Where are you from?",
        "I am from Mexico."
      ]
    ]
  },
  {
    "id": "t1-short",
    "topic": 1,
    "type": "short",
    "prompt": "Eva te saluda: «Good morning!». Respóndele en inglés con el saludo de la mañana.",
    "explain": "Good morning permite responder al saludo de la mañana. Puedes añadir el nombre de Eva.",
    "tag": "Respuesta escrita",
    "answers": [
      "Good morning",
      "Good morning Eva",
      "Good morning, Eva"
    ]
  },
  {
    "id": "t1-correction",
    "topic": 1,
    "type": "correction",
    "prompt": "Corrige una palabra y escribe la pregunta completa: What are your name?",
    "explain": "Se usa is con your name.",
    "tag": "Corrección",
    "answers": [
      "What is your name",
      "What's your name"
    ]
  },
  {
    "id": "t1-classify",
    "topic": 1,
    "type": "classify",
    "prompt": "Clasifica estas expresiones según su función.",
    "explain": "Hello y Good afternoon saludan; Bye y See you later despiden.",
    "tag": "Funciones comunicativas",
    "categories": [
      "Saludo",
      "Despedida"
    ],
    "items": [
      {
        "text": "Hello",
        "category": "Saludo"
      },
      {
        "text": "Bye",
        "category": "Despedida"
      },
      {
        "text": "Good afternoon",
        "category": "Saludo"
      },
      {
        "text": "See you later",
        "category": "Despedida"
      }
    ]
  },
  {
    "id": "t2-choice",
    "topic": 2,
    "type": "choice",
    "prompt": "Selecciona la lista que está en orden alfabético.",
    "explain": "Las tres palabras empiezan con b. La segunda letra determina el orden: a, e, i.",
    "tag": "Secuencia alfabética",
    "choices": [
      "bag, bed, big",
      "bed, bag, big",
      "big, bed, bag"
    ],
    "answer": "bag, bed, big"
  },
  {
    "id": "t2-fill",
    "topic": 2,
    "type": "fill",
    "prompt": "Completa el deletreo de «school»: S-C-___-O-O-L. Escribe la letra que falta.",
    "explain": "School se deletrea S-C-H-O-O-L.",
    "tag": "Secuencia alfabética",
    "answers": [
      "H"
    ]
  },
  {
    "id": "t2-dictation",
    "topic": 2,
    "type": "dictation",
    "prompt": "Escucha las tres letras y escríbelas en el mismo orden.",
    "explain": "El deletreo corresponde a B, E y D.",
    "tag": "Deletreo auditivo",
    "audio": "B. E. D.",
    "answers": [
      "BED",
      "B E D",
      "B-E-D",
      "B, E, D"
    ]
  },
  {
    "id": "t2-listening",
    "topic": 2,
    "type": "listening",
    "prompt": "Escucha el deletreo. ¿Qué nombre forma?",
    "explain": "Las letras E, V y A forman Eva.",
    "tag": "Comprensión de deletreo",
    "audio": "E. V. A.",
    "choices": [
      "Eva",
      "Ana",
      "Leo"
    ],
    "answer": "Eva"
  },
  {
    "id": "t2-order",
    "topic": 2,
    "type": "order",
    "prompt": "Ordena estas palabras alfabéticamente.",
    "explain": "Cap, car y cat se ordenan por su tercera letra; cup va después porque u sigue a a.",
    "tag": "Orden alfabético",
    "tokens": [
      "cap",
      "car",
      "cat",
      "cup"
    ],
    "answers": [
      "cap car cat cup"
    ]
  },
  {
    "id": "t2-match",
    "topic": 2,
    "type": "match",
    "prompt": "Escucha cada deletreo y selecciona el nombre correcto.",
    "explain": "J-A-N-E forma Jane; S-A-R-A forma Sara; M-I-K-E forma Mike.",
    "tag": "Deletreo de nombres",
    "pairs": [
      [
        "Audio 1",
        "Jane"
      ],
      [
        "Audio 2",
        "Sara"
      ],
      [
        "Audio 3",
        "Mike"
      ]
    ],
    "audioPairs": [
      {
        "id": "t2-match-1",
        "text": "J. A. N. E.",
        "choices": [
          "Jane",
          "Jean",
          "June"
        ]
      },
      {
        "id": "t2-match-2",
        "text": "S. A. R. A.",
        "choices": [
          "Sara",
          "Sarah",
          "Zara"
        ]
      },
      {
        "id": "t2-match-3",
        "text": "M. I. K. E.",
        "choices": [
          "Mike",
          "Mick",
          "Nick"
        ]
      }
    ]
  },
  {
    "id": "t2-short",
    "topic": 2,
    "type": "short",
    "prompt": "Escribe en orden alfabético las palabras «name», «nice» y «new», separadas por espacios.",
    "explain": "Las palabras empiezan con n; sus segundas letras se ordenan a, e, i.",
    "tag": "Conocimiento del alfabeto",
    "answers": [
      "name new nice"
    ]
  },
  {
    "id": "t2-correction",
    "topic": 2,
    "type": "correction",
    "prompt": "En «P, Q, S, S» la tercera letra es incorrecta. Escribe solo la letra que debe sustituirla.",
    "explain": "Después de Q corresponde R; la secuencia es P, Q, R, S.",
    "tag": "Corrección de secuencia",
    "answers": [
      "R"
    ]
  },
  {
    "id": "t2-classify",
    "topic": 2,
    "type": "classify",
    "prompt": "Clasifica cada palabra según su posición alfabética respecto a «milk».",
    "explain": "Meet va antes por e; moon después por o. Mile precede a milk por e frente a k; mind va después por n frente a l.",
    "tag": "Formas de las letras",
    "categories": [
      "Antes de milk",
      "Después de milk"
    ],
    "items": [
      {
        "text": "meet",
        "category": "Antes de milk"
      },
      {
        "text": "moon",
        "category": "Después de milk"
      },
      {
        "text": "mile",
        "category": "Antes de milk"
      },
      {
        "text": "mind",
        "category": "Después de milk"
      }
    ]
  },
  {
    "id": "t3-choice",
    "topic": 3,
    "type": "choice",
    "prompt": "¿Qué palabra contiene tres vocales escritas diferentes?",
    "explain": "House contiene o, u y e, tres vocales diferentes.",
    "tag": "Vocales",
    "choices": [
      "school",
      "house",
      "cat"
    ],
    "answer": "house"
  },
  {
    "id": "t3-fill",
    "topic": 3,
    "type": "fill",
    "prompt": "Completa las dos vocales de «st_d_nt» para formar «estudiante» en inglés. Escribe la palabra completa.",
    "explain": "Student se escribe con u y e: s-t-u-d-e-n-t.",
    "tag": "Vocales en palabras",
    "answers": [
      "student"
    ]
  },
  {
    "id": "t3-dictation",
    "topic": 3,
    "type": "dictation",
    "prompt": "Escucha y escribe la palabra inglesa.",
    "explain": "Bus se escribe b-u-s; su vocal no suena como la u española.",
    "tag": "Discriminación auditiva",
    "audio": "Bus.",
    "answers": [
      "bus"
    ]
  },
  {
    "id": "t3-listening",
    "topic": 3,
    "type": "listening",
    "prompt": "Escucha y selecciona la palabra que se dijo.",
    "explain": "Sheep tiene un sonido vocálico distinto al de ship.",
    "tag": "Contraste de sonidos",
    "audio": "Sheep.",
    "choices": [
      "ship",
      "sheep",
      "sit"
    ],
    "answer": "sheep"
  },
  {
    "id": "t3-order",
    "topic": 3,
    "type": "order",
    "prompt": "Ordena las letras para formar «casa» en inglés. La palabra empieza con h.",
    "explain": "House empieza con h, que representa una salida suave de aire.",
    "tag": "Ortografía y sonido inicial",
    "tokens": [
      "h",
      "o",
      "u",
      "s",
      "e"
    ],
    "answers": [
      "h o u s e",
      "house"
    ]
  },
  {
    "id": "t3-match",
    "topic": 3,
    "type": "match",
    "prompt": "Relaciona cada grupo de letras con la palabra que completa.",
    "explain": "Sh completa sheep; ch completa chair; th completa three.",
    "tag": "Grupos de consonantes",
    "pairs": [
      [
        "sh",
        "___eep"
      ],
      [
        "ch",
        "___air"
      ],
      [
        "th",
        "___ree"
      ]
    ]
  },
  {
    "id": "t3-short",
    "topic": 3,
    "type": "short",
    "prompt": "¿Qué letra representa el sonido inicial de «house»? Escribe solamente la letra.",
    "explain": "House empieza con h y su sonido inicial es audible.",
    "tag": "Sonido inicial",
    "answers": [
      "h"
    ]
  },
  {
    "id": "t3-correction",
    "topic": 3,
    "type": "correction",
    "prompt": "Corrige la escritura quitando la letra inicial que sobra: eschool. Escribe la palabra completa.",
    "explain": "School empieza con s; no se agrega una e antes.",
    "tag": "Ortografía y pronunciación",
    "answers": [
      "school"
    ]
  },
  {
    "id": "t3-classify",
    "topic": 3,
    "type": "classify",
    "prompt": "Clasifica las palabras según tengan una o dos vocales escritas diferentes.",
    "explain": "School solo tiene o y street solo e, aunque se repitan. Teacher tiene e y a; student tiene u y e.",
    "tag": "Clasificación de letras",
    "categories": [
      "Una vocal diferente",
      "Dos vocales diferentes"
    ],
    "items": [
      {
        "text": "school",
        "category": "Una vocal diferente"
      },
      {
        "text": "teacher",
        "category": "Dos vocales diferentes"
      },
      {
        "text": "street",
        "category": "Una vocal diferente"
      },
      {
        "text": "student",
        "category": "Dos vocales diferentes"
      }
    ]
  },
  {
    "id": "t4-choice",
    "topic": 4,
    "type": "choice",
    "prompt": "Elige la pareja que corresponde a «thirteen» y «thirty», en ese orden.",
    "explain": "Thirteen es 13 y thirty es 30.",
    "tag": "Reconocimiento numérico",
    "choices": [
      "13 y 30",
      "30 y 13",
      "13 y 40"
    ],
    "answer": "13 y 30"
  },
  {
    "id": "t4-fill",
    "topic": 4,
    "type": "fill",
    "prompt": "Ana tiene 17 años. Completa su frase con el número en inglés: I am ___ years old.",
    "explain": "Diecisiete se escribe seventeen.",
    "tag": "Edad y números",
    "answers": [
      "seventeen"
    ]
  },
  {
    "id": "t4-dictation",
    "topic": 4,
    "type": "dictation",
    "prompt": "Escucha y escribe el número con letras en inglés.",
    "explain": "Fifty significa cincuenta y se distingue de fifteen.",
    "tag": "Dictado de números",
    "audio": "Fifty.",
    "answers": [
      "fifty"
    ]
  },
  {
    "id": "t4-listening",
    "topic": 4,
    "type": "listening",
    "prompt": "Escucha. ¿Cuántos años tiene Sara?",
    "explain": "Eighteen years old significa dieciocho años.",
    "tag": "Comprensión de edad",
    "audio": "My name is Sara. I am eighteen years old.",
    "choices": [
      "80",
      "8",
      "18"
    ],
    "answer": "18"
  },
  {
    "id": "t4-order",
    "topic": 4,
    "type": "order",
    "prompt": "Ordena los números de menor a mayor.",
    "explain": "El orden es 13, 14, 30 y 40: thirteen, fourteen, thirty, forty.",
    "tag": "Secuencia numérica",
    "tokens": [
      "thirteen",
      "fourteen",
      "thirty",
      "forty"
    ],
    "answers": [
      "thirteen fourteen thirty forty"
    ]
  },
  {
    "id": "t4-match",
    "topic": 4,
    "type": "match",
    "prompt": "Relaciona cada número con su escritura en inglés.",
    "explain": "Four es 4, fourteen es 14 y forty es 40.",
    "tag": "Número y palabra",
    "pairs": [
      [
        "4",
        "four"
      ],
      [
        "14",
        "fourteen"
      ],
      [
        "40",
        "forty"
      ]
    ]
  },
  {
    "id": "t4-short",
    "topic": 4,
    "type": "short",
    "prompt": "Luis tiene 20 años. Responde en inglés: «How old is Luis?». Escribe una oración completa.",
    "explain": "He is twenty years old indica la edad de Luis. También puedes usar su nombre, la contracción He’s o el número 20; years old puede omitirse.",
    "tag": "Respuesta con edad",
    "answers": [
      "He is twenty years old",
      "He's twenty years old",
      "He is 20 years old",
      "He's 20 years old",
      "He is twenty",
      "He's twenty",
      "He is 20",
      "He's 20",
      "Luis is twenty years old",
      "Luis is 20 years old",
      "Luis is twenty",
      "Luis is 20"
    ]
  },
  {
    "id": "t4-correction",
    "topic": 4,
    "type": "correction",
    "prompt": "Corrige la escritura del número 40: fourty. Escribe solo la palabra correcta.",
    "explain": "Cuarenta se escribe forty, sin u.",
    "tag": "Ortografía numérica",
    "answers": [
      "forty"
    ]
  },
  {
    "id": "t4-classify",
    "topic": 4,
    "type": "classify",
    "prompt": "Clasifica según la terminación de la palabra.",
    "explain": "Thirteen y fifteen terminan en -teen; thirty y fifty, en -ty.",
    "tag": "Terminaciones numéricas",
    "categories": [
      "Termina en -teen",
      "Termina en -ty"
    ],
    "items": [
      {
        "text": "thirteen",
        "category": "Termina en -teen"
      },
      {
        "text": "thirty",
        "category": "Termina en -ty"
      },
      {
        "text": "fifteen",
        "category": "Termina en -teen"
      },
      {
        "text": "fifty",
        "category": "Termina en -ty"
      }
    ]
  },
  {
    "id": "t5-choice",
    "topic": 5,
    "type": "choice",
    "prompt": "Completa: She ___ a student.",
    "explain": "She se acompaña de is.",
    "tag": "Pronombres y to be",
    "choices": [
      "am",
      "are",
      "is"
    ],
    "answer": "is"
  },
  {
    "id": "t5-fill",
    "topic": 5,
    "type": "fill",
    "prompt": "Completa con el plural de brother: I have two ___.",
    "explain": "Después de two, brother pasa al plural brothers.",
    "tag": "Singular y plural",
    "answers": [
      "brothers"
    ]
  },
  {
    "id": "t5-dictation",
    "topic": 5,
    "type": "dictation",
    "prompt": "Escucha y escribe la oración completa. Se acepta la forma completa o contraída.",
    "explain": "I am from Mexico e I’m from Mexico expresan el mismo origen.",
    "tag": "Dictado de presentación",
    "audio": "I am from Mexico.",
    "answers": [
      "I am from Mexico",
      "I'm from Mexico"
    ]
  },
  {
    "id": "t5-listening",
    "topic": 5,
    "type": "listening",
    "prompt": "Escucha. ¿Cuándo planea estudiar inglés la persona?",
    "explain": "Next year significa el próximo año.",
    "tag": "Planes y expresiones de tiempo",
    "audio": "I plan to study English next year.",
    "choices": [
      "This year",
      "Next year",
      "Someday"
    ],
    "answer": "Next year"
  },
  {
    "id": "t5-order",
    "topic": 5,
    "type": "order",
    "prompt": "Ordena las palabras para expresar una meta.",
    "explain": "My goal is to se completa con un verbo en forma base.",
    "tag": "Metas",
    "tokens": [
      "My",
      "goal",
      "is",
      "to",
      "learn",
      "English."
    ],
    "answers": [
      "My goal is to learn English."
    ]
  },
  {
    "id": "t5-match",
    "topic": 5,
    "type": "match",
    "prompt": "Relaciona cada expresión con lo que comunica.",
    "explain": "Like expresa gusto, would like expresa deseo y plan to expresa un plan.",
    "tag": "Gustos, deseos y planes",
    "pairs": [
      [
        "I like music.",
        "Gusto"
      ],
      [
        "I would like to travel.",
        "Deseo"
      ],
      [
        "I plan to study.",
        "Plan"
      ]
    ]
  },
  {
    "id": "t5-short",
    "topic": 5,
    "type": "short",
    "prompt": "Eva te pregunta: «What do you like to do?». Responde que te gusta leer. Empieza con «I like».",
    "explain": "Después de like se aceptan reading y to read para expresar este gusto.",
    "tag": "Respuesta sobre gustos",
    "answers": [
      "I like reading",
      "I like to read"
    ]
  },
  {
    "id": "t5-correction",
    "topic": 5,
    "type": "correction",
    "prompt": "Corrige el verbo después de enjoy y escribe la oración completa: I enjoy to read.",
    "explain": "Después de enjoy, un segundo verbo lleva -ing: reading.",
    "tag": "Gerundios",
    "answers": [
      "I enjoy reading"
    ]
  },
  {
    "id": "t5-classify",
    "topic": 5,
    "type": "classify",
    "prompt": "Clasifica estas expresiones de tiempo.",
    "explain": "This year se refiere a este año; next year al siguiente y someday a algún día.",
    "tag": "Expresiones de tiempo",
    "categories": [
      "Este año",
      "El próximo año",
      "Algún día"
    ],
    "items": [
      {
        "text": "this year",
        "category": "Este año"
      },
      {
        "text": "next year",
        "category": "El próximo año"
      },
      {
        "text": "someday",
        "category": "Algún día"
      }
    ]
  }
];
