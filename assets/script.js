const boardId = ["A", "B", "C", "D", "E", "F", "G", "H"]
const playerGame = [
  {
    id: 1,
    color: "white",
    chess: {
      pawn: ["G71", "G72", "G73", "G74", "G75", "G76", "G77", "G78"],
      knight: ["H82", "H87"],
      bishop: ["H83", "H86"],
      rook: ["H81", "H88"],
      queen: ["H85"],
      king: ["H84"]
    },
    turn: 1,
    lastMove: null,
    move: true
  },
  {
    id: 2,
    color: "black",
    chess: {
      pawn: ["B21", "B22", "B23", "B24", "B25", "B26", "B27", "B28"],
      knight: ["A12", "A17"],
      bishop: ["A13", "A16"],
      rook: ["A11", "A18"],
      queen: ["A14"],
      king: ["A15"]
    },
    turn: 1,
    lastMove: null,
    move: false
  }
]

const chess = {
  pawn: {
    name: "Pawn",
    image: "",
    total: 8,
    rule: {
      y: {
        move: [2, 0],
      },
      xY: {
        kill: [1, 1]
      }
    },
    skip: false,
  },
  knight: {
    name: "Knight",
    image: "",
    total: 2,
    rule: {
      x: {
        moveKill: [2, 2]
      },
      y: {
        moveKill: [2, 2],
      }
    },
    skip: true
  },
  bishop: {
    name: "Bishop",
    image: "",
    total: 2,
    move: 0,
    rule: {
      xY: {
        moveKill: [7, 7]
      }
    },
    skip: false
  },
  rook: {
    name: "Rook",
    image: "",
    total: 2,
    rule: {
      x: {
        moveKill: [7, 7]
      },
      y: {
        moveKill: [7, 7]
      }
    },
    skip: false
  },
  queen: {
    name: "Queen",
    image: "",
    total: 1,
    rule: {
      x: {
        moveKill: [7, 7],
      },
      y: {
        moveKill: [7, 7]
      },
      xY: {
        moveKill: [7, 7]
      }
    },
    skip: false
  },
  king: {
    name: "King",
    image: "",
    total: 1,
    rule: {
      x: {
        moveKill: [1, 1],
      },
      y: {
        moveKill: [1, 1]
      },
      xY: {
        moveKill: [1, 1]
      }
    },
    skip: false
  }
}

function initGameChess() {
  const isGameStart = JSON.parse(localStorage.getItem('game'))

  if (isGameStart) {
    const playerTurn = isGameStart.match.find(obj => obj.move)
    changePlayerTurn(playerTurn.id)
  }

  boardGame()
  chessPosition()
}

function boardGame() {
  const rows = 8
  const columns = 8
  const board = document.querySelector('#board-game')

  for (let col = 1; col <= columns; col++) {
    const createElementColumn = document.createElement('div')
    const squareId = boardId.find((obj, index) => (index + 1) === col)

    // set attribute board square
    createElementColumn.setAttribute('id', squareId)
    createElementColumn.classList.add("column-board")
    board.appendChild(createElementColumn)

    for (let row = 1; row <= rows; row++) {
      const createElementRow = document.createElement('div')
      const rowId = squareId + + col + row

      createElementRow.setAttribute('id', rowId)
      createElementRow.innerHTML = rowId
      createElementRow.classList.add("row-board")
      createElementColumn.appendChild(createElementRow)
    }
  }

  boardColor()
}

function boardColor() {
  const column = document.querySelectorAll('.column-board')

  for (let col = 0; col < column.length; col++) {
    const columns = column[col];

    if (col % 2) columns.style.background = "black"
    else columns.style.background = "white"

    const row = columns.querySelectorAll('.row-board')

    for (let child = 0; child <= row.length; child++) {
      const rows = row[child]

      if (rows) {
        if (columns.style.background === "black") {
          if (child % 2) rows.style.background = "black"
          else rows.style.background = "white"
        } else {
          if (child % 2) rows.style.background = "white"
          else rows.style.background = "black"
        }
      }
    }
  }
}

function chessPosition() {
  const isGameStart = JSON.parse(localStorage.getItem('game'))
  let initCreaturePosition = playerGame

  if (isGameStart) initCreaturePosition = isGameStart.match

  const creatureList = document.querySelectorAll('.creature')
  const playerTurn = initCreaturePosition.find(obj => obj.move).id

  for (let index = 0; index < creatureList.length; index++) {
    const element = creatureList[index];
    element.remove()
  }

  initCreaturePosition.map((player) => {
    Object.entries(player.chess).map(obj => {
      const creature = obj[0]
      const creaturePosition = obj[1]

      creaturePosition.map(pos => {
        const creatureTitle = Object.entries(chess).find(obj => obj[0] === creature)[1].name

        const board = document.querySelector('#' + pos)
        const createCreature = document.createElement('div')
        const creatureId = creature + "_" + pos

        createCreature.classList.add('creature')
        createCreature.innerHTML = creatureTitle + ' Player ' + player.id
        createCreature.setAttribute('data-id', player.id)
        createCreature.setAttribute('id', creatureId)

        if (playerTurn === 2) createCreature.style.transform = 'rotate(180deg)'

        if (player.move) board.addEventListener('click', () => selectCreature(creatureId, creature));
        board.appendChild(createCreature)
      })
    })
  })

  localStorage.setItem('game', JSON.stringify({
    time: new Date(),
    match: initCreaturePosition
  }))
}

function selectCreature(id, creature) {
  console.log(id, creature)
  const findCreature = document.querySelector('#' + id)
  const currentPosition = findCreature.parentElement
  const isCreature = chess[creature] ?? null
  const positionId = currentPosition.getAttribute('id')
  const playerIdentity = findCreature.getAttribute('data-id')

  // if (chess) console.log(chess)
  movingPatern(positionId, isCreature, playerIdentity)
}

function moveCreature(from, to, creature, player) {
  const gamePlaying = JSON.parse(localStorage.getItem('game'))

  const board = document.querySelector('#' + to)
  const moveCreature = document.createElement('div')
  const moveId = creature.name.toLowerCase() + "_" + to
  const removeId = creature.name.toLowerCase() + "_" + from

  const removeCreature = document.querySelector('#' + removeId)

  moveCreature.classList.add('creature')
  moveCreature.innerHTML = creature.name + ' Player ' + player
  moveCreature.setAttribute('data-id', player)
  moveCreature.setAttribute('id', moveId)

  board.appendChild(moveCreature)
  removeCreature.remove()

  const finishMove = gamePlaying.match.map(obj => {
    let newObject = { ...obj }

    if (newObject.id === Number(player)) {
      Object.entries(newObject.chess).map(value => {
        if (value[0] === creature.name.toLowerCase()) {
          const removePreviousPosition = value[1].filter(object => object !== from)
          const newCreaturePosition = [...removePreviousPosition, to]

          newObject.chess[value[0]] = newCreaturePosition
        }
      })

      newObject = {
        ...newObject,
        turn: newObject.turn + 1,
        lastMove: {
          chess: creature.name.toLowerCase(),
          from: from,
          to: to
        },
        move: false
      }
    } else newObject.move = true

    return newObject
  })

  const nextTurn = finishMove.find(obj => obj.move).id

  if (player === 2) createCreature.style.transform = 'rotate(180deg)'

  localStorage.setItem('game', JSON.stringify({
    ...gamePlaying,
    match: finishMove
  }))


  chessPosition()
  boardColor()
  changePlayerTurn(nextTurn)
}

function paternIdentity({ board, row, column }) {
  return board + row + column
}

function movingPatern(position, creature, player) {
  boardColor()

  let movePaterns = []

  const splitPosition = position.split("")
  const rowIndex = boardId.findIndex(obj => splitPosition[0] === obj)

  Object.entries(creature.rule).map(rule => {
    const creatureRule = rule[0]
    let knightSkipMove = []

    // Action Creature move
    Object.entries(rule[1]).map(action => {
      const creatureAction = action[0]
      const creatureMove = action[1]

      creatureMove.map((obj, index) => {
        if (obj === 0) return

        const boardIndex = rowIndex
        const currentRow = Number(splitPosition[1])
        const currentColumn = Number(splitPosition[2])

        for (let i = 1; i <= obj; i++) {
          let movingCreature = player === "1" ? Number(-i) : Number(i)

          if (creatureRule === "y") {
            if (index === 1) movingCreature = player === "1" ? i : -i
            const moveBoardIndex = boardIndex + movingCreature

            const moveBoard = boardId[moveBoardIndex]
            const moveRow = currentRow + movingCreature

            isActionPatern = paternIdentity({
              board: moveBoard,
              row: moveRow,
              column: currentColumn
            })
          }

          if (creatureRule === "x") {
            const moveBoardIndex = boardIndex

            const moveBoard = boardId[moveBoardIndex]
            const moveRow = currentRow
            let moveColumn = currentColumn + i

            if (index === 1) moveColumn = currentColumn - i

            isActionPatern = paternIdentity({
              board: moveBoard,
              row: moveRow,
              column: moveColumn
            })
          }

          if (creatureRule === "xY") {

            const moveBoardIndex = boardIndex + movingCreature

            const moveBoard = boardId[moveBoardIndex]
            const moveRow = currentRow + movingCreature
            let moveColumn = currentColumn + i

            if (index === 1) moveColumn = currentColumn - i
            isActionPatern = paternIdentity({
              board: moveBoard,
              row: moveRow,
              column: moveColumn
            })
          }

          const checkBoard = document.querySelector('#' + isActionPatern)
          const isEmptyBoard = checkBoard?.children?.length

          // if (creature.skip) knightSkipMove.push(isActionPatern)
          // Move Condition
          if (isEmptyBoard > 0) {
            const isEnemy = checkBoard.children[0].getAttribute('data-id')

            if (creatureAction === "move" && isEnemy) return
            else if (creatureAction.toLowerCase().includes('kill') && player === isEnemy) return
          } else {
            if (creatureAction === "kill") return
          }

          if (isActionPatern && !movePaterns.find(move => move === isActionPatern)) movePaterns.push(isActionPatern)
        }
      })
    })
  })

  movePaterns.map(obj => {
    const board = document.querySelector('#' + obj)

    // board.addEventListener('click', () => moveCreature(position, obj, creature, player), false)

    if (board) board.style.background = 'blue'
  })
}

function changePlayerTurn(player) {
  const container = document.querySelector('.container')

  if (player === 1) {
    container.classList.add('animate-player-1')

    setTimeout(() => {
      container.style.transform = "rotate(0deg)"
      container.classList.remove('animate-player-1')
    }, 2000)
  }

  if (player === 2) {
    container.classList.add('animate-player-2')

    setTimeout(() => {
      container.style.transform = "rotate(180deg)"
      container.classList.remove('animate-player-2')
    }, 2000)
  }

}