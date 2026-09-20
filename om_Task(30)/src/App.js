import React, { useEffect, useMemo, useState } from "react";
import {
  PIECES,
  allLegalMoves,
  isInCheck,
  legalMovesFor,
  makeInitialBoard,
  makeMove,
  notationFor,
  squareName
} from "./chess";

function App() {
  const [board, setBoard] = useState(makeInitialBoard);
  const [turn, setTurn] = useState("w");
  const [selected, setSelected] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [moves, setMoves] = useState([]);
  const [seconds, setSeconds] = useState({ w: 300, b: 300 });
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState("White to move");

  const legal = useMemo(() => {
    if (!selected || gameOver) return [];
    return legalMovesFor(board, selected[0], selected[1], lastMove);
  }, [board, selected, lastMove, gameOver]);

  const legalSet = useMemo(
    () => new Set(legal.map(([r, c]) => `${r}-${c}`)),
    [legal]
  );

  const resetGame = () => {
    setBoard(makeInitialBoard());
    setTurn("w");
    setSelected(null);
    setLastMove(null);
    setMoves([]);
    setSeconds({ w: 300, b: 300 });
    setGameOver(false);
    setStatus("White to move");
  };

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setSeconds((current) => {
        if (current[turn] <= 1) {
          const winner = turn === "w" ? "Black" : "White";
          setGameOver(true);
          setStatus(`${winner} wins on time`);
          return { ...current, [turn]: 0 };
        }
        return { ...current, [turn]: current[turn] - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [turn, gameOver]);

  const finishTurn = (nextBoard, nextLastMove) => {
    const nextTurn = turn === "w" ? "b" : "w";
    const inCheck = isInCheck(nextBoard, nextTurn);
    const available = allLegalMoves(nextBoard, nextTurn, nextLastMove);

    setTurn(nextTurn);
    setSelected(null);
    setLastMove(nextLastMove);

    if (available.length === 0) {
      setGameOver(true);
      if (inCheck) {
        setStatus(`${nextTurn === "w" ? "Black" : "White"} wins by checkmate`);
      } else {
        setStatus("Draw by stalemate");
      }
    } else if (inCheck) {
      setStatus(`${nextTurn === "w" ? "White" : "Black"} is in check`);
    } else {
      setStatus(`${nextTurn === "w" ? "White" : "Black"} to move`);
    }
  };

  const handleSquareClick = (r, c) => {
    if (gameOver) return;

    const piece = board[r][c];

    if (!selected) {
      if (piece?.color === turn) {
        setSelected([r, c]);
      }
      return;
    }

    if (selected[0] === r && selected[1] === c) {
      setSelected(null);
      return;
    }

    if (piece?.color === turn) {
      setSelected([r, c]);
      return;
    }

    if (!legalSet.has(`${r}-${c}`)) return;

    const result = makeMove(board, selected, [r, c], lastMove);
    const moveText = notationFor(result.move);

    setBoard(result.board);
    setMoves((current) => [...current, moveText]);
    finishTurn(result.board, result.move);
  };

  const formatTime = (value) =>
    `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;

  const capturedText = moves.length
    ? `${moves.length} move${moves.length === 1 ? "" : "s"} played`
    : "No moves yet";

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">ReactJS Mini Project</p>
          <h1>Offline Chess</h1>
        </div>
        <button className="new-game" onClick={resetGame}>New Game</button>
      </header>

      <main className="game-area">
        <section className="board-panel">
          <div className="player-row">
            <div className={`player ${turn === "b" ? "active" : ""}`}>
              <span className="avatar black-avatar">♚</span>
              <div>
                <strong>Black</strong>
                <small>Player 2</small>
              </div>
            </div>
            <div className={`timer ${turn === "b" ? "running" : ""}`}>{formatTime(seconds.b)}</div>
          </div>

          <div className="chess-board" aria-label="Chess board">
            {board.map((row, r) =>
              row.map((piece, c) => {
                const selectedHere = selected?.[0] === r && selected?.[1] === c;
                const legalHere = legalSet.has(`${r}-${c}`);
                const lastHere =
                  lastMove &&
                  ((lastMove.from[0] === r && lastMove.from[1] === c) ||
                    (lastMove.to[0] === r && lastMove.to[1] === c));

                const dark = (r + c) % 2 === 1;

                return (
                  <button
                    className={`square ${dark ? "dark" : "light"} ${selectedHere ? "selected" : ""} ${lastHere ? "last" : ""} ${legalHere ? "legal" : ""}`}
                    key={`${r}-${c}`}
                    onClick={() => handleSquareClick(r, c)}
                    aria-label={squareName([r, c])}
                  >
                    {c === 0 && <span className="rank">{8 - r}</span>}
                    {r === 7 && <span className="file">{ "abcdefgh"[c] }</span>}
                    {legalHere && !piece && <span className="move-dot" />}
                    {legalHere && piece && <span className="capture-ring" />}
                    {piece && (
                      <span className={`piece ${piece.color === "w" ? "white-piece" : "black-piece"}`}>
                        {PIECES[piece.color === "w" ? "white" : "black"][piece.type]}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="player-row bottom-player">
            <div className={`player ${turn === "w" ? "active" : ""}`}>
              <span className="avatar white-avatar">♔</span>
              <div>
                <strong>White</strong>
                <small>Player 1</small>
              </div>
            </div>
            <div className={`timer ${turn === "w" ? "running" : ""}`}>{formatTime(seconds.w)}</div>
          </div>
        </section>

        <aside className="side-panel">
          <div className="status-card">
            <span className="status-label">Game status</span>
            <h2>{status}</h2>
            <p>{capturedText}</p>
          </div>

          <div className="moves-card">
            <div className="card-heading">
              <h2>Move list</h2>
              <span>{moves.length}</span>
            </div>

            {moves.length === 0 ? (
              <div className="empty-moves">Make the first move to start the game.</div>
            ) : (
              <div className="moves-list">
                {Array.from({ length: Math.ceil(moves.length / 2) }, (_, i) => {
                  const whiteMove = moves[i * 2];
                  const blackMove = moves[i * 2 + 1];

                  return (
                    <div className="move-row" key={i}>
                      <span>{i + 1}.</span>
                      <strong>{whiteMove || "—"}</strong>
                      <strong>{blackMove || "—"}</strong>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="help-card">
            <h3>How to play</h3>
            <p>Click a piece, then click a highlighted square. Turns alternate automatically.</p>
            <p>Timers give each player five minutes.</p>
          </div>

          <button className="reset-link" onClick={resetGame}>Reset board</button>
        </aside>
      </main>
    </div>
  );
}

export default App;