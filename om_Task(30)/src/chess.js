export const PIECES = {
  white: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  black: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" }
};

export function makeInitialBoard() {
  return [
    [
      { type: "r", color: "b", moved: false }, { type: "n", color: "b", moved: false },
      { type: "b", color: "b", moved: false }, { type: "q", color: "b", moved: false },
      { type: "k", color: "b", moved: false }, { type: "b", color: "b", moved: false },
      { type: "n", color: "b", moved: false }, { type: "r", color: "b", moved: false }
    ],
    Array.from({ length: 8 }, () => ({ type: "p", color: "b", moved: false })),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array.from({ length: 8 }, () => ({ type: "p", color: "w", moved: false })),
    [
      { type: "r", color: "w", moved: false }, { type: "n", color: "w", moved: false },
      { type: "b", color: "w", moved: false }, { type: "q", color: "w", moved: false },
      { type: "k", color: "w", moved: false }, { type: "b", color: "w", moved: false },
      { type: "n", color: "w", moved: false }, { type: "r", color: "w", moved: false }
    ]
  ];
}

export function cloneBoard(board) {
  return board.map((row) => row.map((piece) => piece ? { ...piece } : null));
}

const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

const sameSide = (a, b) => a && b && a.color === b.color;

function lineMoves(board, r, c, directions, pseudoOnly = false) {
  const piece = board[r][c];
  const moves = [];

  for (const [dr, dc] of directions) {
    let nr = r + dr;
    let nc = c + dc;

    while (inside(nr, nc)) {
      const target = board[nr][nc];
      if (!target) {
        moves.push([nr, nc]);
      } else {
        if (!sameSide(piece, target) && target.type !== "k") {
          moves.push([nr, nc]);
        }
        break;
      }
      nr += dr;
      nc += dc;
    }
  }
  return moves;
}

function pseudoMoves(board, r, c, options = {}) {
  const piece = board[r][c];
  if (!piece) return [];
  const moves = [];
  const enemy = piece.color === "w" ? "b" : "w";

  if (piece.type === "p") {
    const dir = piece.color === "w" ? -1 : 1;
    const startRow = piece.color === "w" ? 6 : 1;

    if (inside(r + dir, c) && !board[r + dir][c]) {
      moves.push([r + dir, c]);
      if (r === startRow && !board[r + dir * 2][c]) {
        moves.push([r + dir * 2, c]);
      }
    }

    for (const dc of [-1, 1]) {
      const nr = r + dir;
      const nc = c + dc;
      if (!inside(nr, nc)) continue;

      const target = board[nr][nc];
      if (target && target.color === enemy && target.type !== "k") {
        moves.push([nr, nc]);
      }

      if (options.enPassant && !target) {
        const last = options.lastMove;
        if (
          last &&
          last.piece.type === "p" &&
          Math.abs(last.from[0] - last.to[0]) === 2 &&
          last.to[0] === r &&
          last.to[1] === nc &&
          last.piece.color === enemy
        ) {
          moves.push([nr, nc]);
        }
      }
    }
  }

  if (piece.type === "n") {
    for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      const nr = r + dr, nc = c + dc;
      if (!inside(nr, nc)) continue;
      const target = board[nr][nc];
      if (!sameSide(piece, target) && (!target || target.type !== "k")) {
        moves.push([nr, nc]);
      }
    }
  }

  if (piece.type === "b") {
    moves.push(...lineMoves(board, r, c, [[-1,-1],[-1,1],[1,-1],[1,1]]));
  }

  if (piece.type === "r") {
    moves.push(...lineMoves(board, r, c, [[-1,0],[1,0],[0,-1],[0,1]]));
  }

  if (piece.type === "q") {
    moves.push(...lineMoves(board, r, c, [
      [-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]
    ]));
  }

  if (piece.type === "k") {
    for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
      const nr = r + dr, nc = c + dc;
      if (!inside(nr, nc)) continue;
      const target = board[nr][nc];
      if (!sameSide(piece, target) && (!target || target.type !== "k")) {
        moves.push([nr, nc]);
      }
    }

    if (!piece.moved && !options.attacksOnly) {
      const row = r;

      const rookK = board[row][7];
      if (
        rookK &&
        rookK.type === "r" &&
        rookK.color === piece.color &&
        !rookK.moved &&
        !board[row][5] &&
        !board[row][6] &&
        !isSquareAttacked(board, row, 4, enemy) &&
        !isSquareAttacked(board, row, 5, enemy) &&
        !isSquareAttacked(board, row, 6, enemy)
      ) {
        moves.push([row, 6]);
      }

      const rookQ = board[row][0];
      if (
        rookQ &&
        rookQ.type === "r" &&
        rookQ.color === piece.color &&
        !rookQ.moved &&
        !board[row][1] &&
        !board[row][2] &&
        !board[row][3] &&
        !isSquareAttacked(board, row, 4, enemy) &&
        !isSquareAttacked(board, row, 3, enemy) &&
        !isSquareAttacked(board, row, 2, enemy)
      ) {
        moves.push([row, 2]);
      }
    }
  }

  return moves;
}

export function isSquareAttacked(board, r, c, byColor) {
  for (let pr = 0; pr < 8; pr++) {
    for (let pc = 0; pc < 8; pc++) {
      const piece = board[pr][pc];
      if (!piece || piece.color !== byColor) continue;

      if (piece.type === "p") {
        const dir = piece.color === "w" ? -1 : 1;
        if (r === pr + dir && Math.abs(c - pc) === 1) return true;
      } else if (piece.type === "k") {
        if (Math.max(Math.abs(r - pr), Math.abs(c - pc)) === 1) return true;
      } else {
        const moves = pseudoMoves(board, pr, pc, { attacksOnly: true });
        if (moves.some(([mr, mc]) => mr === r && mc === c)) return true;
      }
    }
  }
  return false;
}

export function findKing(board, color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.type === "k" && p.color === color) return [r, c];
    }
  }
  return null;
}

export function isInCheck(board, color) {
  const king = findKing(board, color);
  if (!king) return true;
  const enemy = color === "w" ? "b" : "w";
  return isSquareAttacked(board, king[0], king[1], enemy);
}

function applyMove(board, from, to, extra = {}) {
  const next = cloneBoard(board);
  const moving = next[from[0]][from[1]];
  const target = next[to[0]][to[1]];
  next[to[0]][to[1]] = { ...moving, moved: true };
  next[from[0]][from[1]] = null;

  if (extra.enPassant) {
    next[extra.captureSquare[0]][extra.captureSquare[1]] = null;
  }

  if (moving.type === "k" && Math.abs(to[1] - from[1]) === 2) {
    const row = from[0];
    if (to[1] === 6) {
      next[row][5] = { ...next[row][7], moved: true };
      next[row][7] = null;
    } else {
      next[row][3] = { ...next[row][0], moved: true };
      next[row][0] = null;
    }
  }

  if (moving.type === "p" && (to[0] === 0 || to[0] === 7)) {
    next[to[0]][to[1]].type = "q";
  }

  return { next, target };
}

export function legalMovesFor(board, r, c, lastMove = null) {
  const piece = board[r][c];
  if (!piece) return [];

  return pseudoMoves(board, r, c, { enPassant: true, lastMove })
    .filter(([nr, nc]) => {
      const isEP =
        piece.type === "p" &&
        nc !== c &&
        !board[nr][nc] &&
        lastMove &&
        lastMove.piece.type === "p";

      const simulated = applyMove(
        board,
        [r, c],
        [nr, nc],
        isEP ? { enPassant: true, captureSquare: [r, nc] } : {}
      ).next;

      return !isInCheck(simulated, piece.color);
    });
}

export function allLegalMoves(board, color, lastMove = null) {
  const moves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]?.color !== color) continue;
      for (const [nr, nc] of legalMovesFor(board, r, c, lastMove)) {
        moves.push({ from: [r,c], to: [nr,nc] });
      }
    }
  }
  return moves;
}

export function makeMove(board, from, to, lastMove = null) {
  const piece = board[from[0]][from[1]];
  const isEP =
    piece.type === "p" &&
    from[1] !== to[1] &&
    !board[to[0]][to[1]];

  const { next, target } = applyMove(
    board,
    from,
    to,
    isEP ? { enPassant: true, captureSquare: [from[0], to[1]] } : {}
  );

  return {
    board: next,
    captured: target || (isEP ? board[from[0]][to[1]] : null),
    move: {
      from,
      to,
      piece: { ...piece },
      captured: target || (isEP ? board[from[0]][to[1]] : null),
      castle: piece.type === "k" && Math.abs(to[1] - from[1]) === 2,
      enPassant: isEP,
      promotion: piece.type === "p" && (to[0] === 0 || to[0] === 7)
    }
  };
}

export function squareName([r, c]) {
  return "abcdefgh"[c] + (8 - r);
}

export function notationFor(move) {
  const pieceName = move.piece.type === "p" ? "" : move.piece.type.toUpperCase();
  if (move.castle) return move.to[1] === 6 ? "O-O" : "O-O-O";

  const capture = move.captured ? "x" : "-";
  const pawnFile = move.piece.type === "p" && move.captured ? "abcdefgh"[move.from[1]] : "";
  const promotion = move.promotion ? "=Q" : "";
  return `${pieceName}${pawnFile}${capture}${squareName(move.to)}${promotion}`;
}