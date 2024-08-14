import React, { useReducer } from "react";
import Board from "./Board";
import "./GameStyle.css";
import { calculateWinner } from "../../helper";

const initialState = {
  board: Array(9).fill(null),
  xIsNext: true,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "CLICK": {
      const { board, xIsNext } = state;
      const { index, winner } = action.payload;
      if (winner || board[index]) return state;
      const nextState = JSON.parse(JSON.stringify(state));
      nextState.board[index] = xIsNext ? "X" : "O";
      nextState.xIsNext = !xIsNext;

      return nextState;
    }
    case "REMOVE": {
      const nextState = JSON.parse(JSON.stringify(state));
      nextState.board = Array(9).fill(null);
      nextState.xIsNext = true;
      return nextState;
    }
    default:
      break;
  }
  return state;
};

const GameWithReducer = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  // const [state, setState] = useState ({
  //     board: Array(9).fill(null),
  //     xIsNext: true,
  // });
  const winner = calculateWinner(state.board2);
  const handleClick = (index) => {
    // const boardCopy = [...state.board];
    // if (winner || boardCopy[index]) return;
    dispatch({
      type: "CLICK",
      payload: {
        index,
        winner,
      },
    });
    // boardCopy[index] = state.xIsNext ? "X" : "O";
    // setBoard(boardCopy);
    // setXIsNext((xIsNext) => !xIsNext);
    // setState({
    //     ...state,
    //     board: boardCopy,
    //     xIsNext: !state.xIsNext,
    // })
  };
  const handleResetGame = () => {
    // setBoard(Array(9).fill(null));
    // setXIsNext(true);
    // setState({
    //     board: Array(9).fill(null),
    //     xIsNext: true,
    // })
    dispatch({
      type: "REMOVE",
    });
  };
  return (
    <div className="wrapper">
      <Board cells={state.board} onClick={handleClick}></Board>
      {winner && (
        <div className="game-winner">{winner ? `Winner is ${winner}` : ""}</div>
      )}
      <button className="game-reset" onClick={handleResetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default GameWithReducer;
