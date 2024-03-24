const boardId = ["A", "B", "C", "D", "E", "F", "G", "H"]
const playerGame = [
  {
    id: 1,
    color: "white",
    creatures: {
      pawn: [
        { code: 'P1-PAWN-1', board: "G71" },
        { code: 'P1-PAWN-2', board: "G72" },
        { code: 'P1-PAWN-3', board: "G73" },
        { code: 'P1-PAWN-4', board: "G74" },
        { code: 'P1-PAWN-5', board: "G75" },
        { code: 'P1-PAWN-6', board: "G76" },
        { code: 'P1-PAWN-7', board: "G77" },
        { code: 'P1-PAWN-8', board: "G78" }
      ],
      knight: [
        { code: 'P1-KNIGHT-1', board: 'H82' },
        { code: 'P1-KNIGHT-2', board: 'H87' }
      ],
      bishop: [
        { code: 'P1-BISHOP-1', board: 'H83' },
        { code: 'P1-BISHOP-2', board: 'H86' }
      ],
      rook: [
        { code: 'P1-ROOK-1', board: 'H81' },
        { code: 'P1-ROOK-2', board: 'H88' }
      ],
      queen: [
        { code: 'P1-QUEEN-1', board: 'H85' }
      ],
      king: [
        { code: 'P1-KING-1', board: 'H84' }
      ]
    },
    turn: 0,
    lastMove: null,
    move: true
  },
  {
    id: 2,
    color: "black",
    creatures: {
      pawn: [
        { code: 'P2-PAWN-1', board: "B21" },
        { code: 'P2-PAWN-2', board: "B22" },
        { code: 'P2-PAWN-3', board: "B23" },
        { code: 'P2-PAWN-4', board: "B24" },
        { code: 'P2-PAWN-5', board: "B25" },
        { code: 'P2-PAWN-6', board: "B26" },
        { code: 'P2-PAWN-7', board: "B27" },
        { code: 'P2-PAWN-8', board: "B28" }
      ],
      knight: [
        { code: 'P2-KNIGHT-1', board: 'A12' },
        { code: 'P2-KNIGHT-2', board: 'A17' }
      ],
      bishop: [
        { code: 'P2-BISHOP-1', board: 'A13' },
        { code: 'P2-BISHOP-2', board: 'A16' }
      ],
      rook: [
        { code: 'P2-ROOK-1', board: 'A11' },
        { code: 'P2-ROOK-2', board: 'A18' }
      ],
      queen: [
        { code: 'P2-QUEEN-1', board: 'A14' }
      ],
      king: [
        { code: 'P2-KING-1', board: 'A15' }
      ]
    },
    turn: 0,
    lastMove: null,
    move: false
  }
]

const gameCreature = {
  pawn: {
    name: "Pawn",
    image: "",
    total: 8,
    rule: {
      y: {
        move: [1, 0],
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
let movePaterns = []

function initGameChess() {
  const isGameStart = JSON.parse(localStorage.getItem('game'))

  if (isGameStart) {
    const playerTurn = isGameStart.match.find(obj => obj.move)
    // changePlayerTurn(playerTurn.id)
  }

  boardGame()
  creaturePositions()
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

function creaturePositions() {
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
    Object.entries(player.creatures).map(obj => {
      const creature = obj[0]
      const creaturePosition = obj[1]

      creaturePosition.map(pos => {
        const board = document.querySelector('#' + pos.board)
        const createCreature = document.createElement('div')
        const creatureId = creature + "_" + pos.board

        createCreature.classList.add('creature')
        createCreature.innerHTML = pos.code
        createCreature.setAttribute('data-id', pos.code)
        createCreature.setAttribute('id', creatureId)

        if (playerTurn === 2) createCreature.style.transform = 'rotate(180deg)'

        // if (player.move) board.addEventListener('click', () => selectCreature(creatureId, creature));
        if (player.move) board.setAttribute('onclick', `selectCreature("${creatureId}", "${creature}")`)
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
  const findCreature = document.querySelector('#' + id)
  const currentPosition = findCreature.parentElement
  const isCreature = gameCreature[creature] ?? null
  const positionId = currentPosition.getAttribute('id')
  const playerIdentity = findCreature.getAttribute('data-id')
  movingPatern(positionId, isCreature, playerIdentity)
}

function moveCreatures(from, to, creature, creatureId) {
  const gamePlaying = JSON.parse(localStorage.getItem('game'))
  const gameHistory = JSON.parse(localStorage.getItem('historyMove')) ?? []

  const board = document.querySelector('#' + to)

  const moveCreature = document.createElement('div')
  const moveId = creature + "_" + to
  const removeId = creature + "_" + from

  const removeCreature = document.querySelector('#' + removeId)

  moveCreature.classList.add('creature')
  moveCreature.innerHTML = creatureId
  moveCreature.setAttribute('data-id', creatureId)
  moveCreature.setAttribute('id', moveId)

  board.appendChild(moveCreature)
  removeCreature.remove()

  const finishMove = gamePlaying.match.map(obj => {
    let newObject = { ...obj }

    if (creatureId.includes(`P${newObject.id}`)) {
      Object.entries(newObject.creatures).map(value => {
        if (value[0] === creature) {
          const findCreature = value[1].find(object => object.board === from)

          const removePreviousPosition = value[1].filter(object => object.board !== from)
          const newCreaturePosition = [...removePreviousPosition, {
            ...findCreature,
            board: to
          }]

          newObject.creatures[value[0]] = newCreaturePosition
          newObject.lastMove = {
            creatures: findCreature.code,
            from: from,
            to: to
          }
        }
      })

      newObject = {
        ...newObject,
        turn: newObject.turn + 1,
        move: false
      }
    } else newObject.move = true

    return newObject
  })

  const nextTurn = finishMove.find(obj => obj.move).id

  if (creatureId.includes('P2')) moveCreature.style.transform = 'rotate(180deg)'

  localStorage.setItem('game', JSON.stringify({
    ...gamePlaying,
    match: finishMove
  }))
  console.log(gameHistory)
  // localStorage.setItem('historyMove', JSON.stringify({
  //   creature: [...gameHistory, finishMove.lastMove]
  // }))


  createMovePatern('select', { from: from, creature: creature, creatureId: creatureId })
  boardColor()
  creaturePositions()
  // changePlayerTurn(nextTurn)
}

function paternIdentity({ board, row, column }) {
  return board + row + column
}

function movingPatern(position, creature, creatureId) {
  boardColor()
  movePaterns = []
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
          let movingCreature = creatureId.includes('P1') ? Number(-i) : Number(i)

          if (creatureRule === "y") {
            if (index === 1) movingCreature = creatureId.includes('P1') ? i : -i
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

          // Move Condition
          if (isEmptyBoard > 0) {
            const isEnemy = checkBoard.children[0].getAttribute('data-id').includes('P1')
            const isPlayer = creatureId.includes('P1')

            if (creatureAction === "move" && isEnemy) return
            else if (creatureAction.toLowerCase().includes('kill') && isPlayer === isEnemy) return
          } else {
            if (creatureAction === "kill") return
          }

          if (isActionPatern && !movePaterns.find(move => move === isActionPatern)) movePaterns.push(isActionPatern)
        }
      })
    })
  })

  createMovePatern('move', { from: position, creature: creature.name.toLowerCase(), creatureId: creatureId })
}

function createMovePatern(action, attribute) {
  const { from, creature, creatureId } = attribute
  if (movePaterns.length <= 0) return

  console.log(attribute)

  movePaterns.map(obj => {
    const board = document.querySelector('#' + obj)
    if (board) board.style.background = 'blue'
  })

  const boardList = document.querySelectorAll('.row-board')

  for (let index = 0; index < boardList.length; index++) {
    const element = boardList[index];
    const boardId = element.getAttribute('id')

    if (element.children[0]) {
      const playerCreature = element.children[0].getAttribute('data-id')
      const playerTurn = creatureId.split('-')[0]

      if (playerCreature.includes(playerTurn)) {
        if (movePaterns.includes(boardId)) element.setAttribute('onclick', `moveCreatures('${from}', '${boardId}', '${creature}', '${creatureId}')`)
        else element.setAttribute('onclick', `selectCreature("${creatureId}", "${creature}")`)

      } else element.removeAttribute('onclick')
    }

    console.log(element)
  }
  if (action !== 'move') movePaterns = []
}

function changePlayerTurn(player) {
  const container = document.querySelector('.container')

  if (Number(player) === 1) {
    container.classList.add('animate-player-1')

    setTimeout(() => {
      container.style.transform = "rotate(0deg)"
      container.classList.remove('animate-player-1')
    }, 2000)
  }

  if (Number(player) === 2) {
    container.classList.add('animate-player-2')

    setTimeout(() => {
      container.style.transform = "rotate(180deg)"
      container.classList.remove('animate-player-2')
    }, 2000)
  }

}