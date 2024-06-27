import React, { useState, useEffect } from 'react';
import '../App.css';
import Cell from './Cell';

const Board = ({ setIsActive, resetSignal }) => {
  const boardSize = 16;
  const [gameOver, setGameOver] = useState(false);       // ゲームオーバー
  const [firstClick, setFirstClick] = useState(true);    // 最初のセルクリックでタイマー開始
  const [board, setBoard] = useState(() => generateInitialBoard());

  // 【１】初期ボードの生成
  function generateInitialBoard() {
    const initialBoard = [];
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push({           // row配列にセルの初期状態をオブジェクトとして追加
          isCat: false,      // 猫なし
          isRevealed: false, // 開示セルなし
          numCats: 0         // 数字なし
        });
      }
      initialBoard.push(row);   // 生成したrowをinitialBoard配列に追加
    }
    return initialBoard;        // 初期値として生成した初期ボードを返す
  };


  // 【2】猫セルをランダムに配置
  const placeCats = (board) => {       // 猫セルを配置する関数を作成
    const newBoard = [...board];  // 現在のボードを複製してnewBoardを作成（元のボードを操作しない）
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (Math.random() < 0.08) {        // 1/10の確率で
          newBoard[i][j].isCat = true;    // 該当するセルの猫を表示
        }
      }
    }
    return newBoard;
  };


  // 【３】数字セルを設定
  const placeNum = (board) => {
    const directions = [
      { dx: -1, dy: -1 }, // 左上
      { dx: -1, dy: 0 },  // 上
      { dx: -1, dy: 1 },  // 右上
      { dx: 0, dy: -1 },  // 左
      { dx: 0, dy: 1 },   // 右
      { dx: 1, dy: -1 },  // 左下
      { dx: 1, dy: 0 },   // 下
      { dx: 1, dy: 1 }    // 右下
    ];

    const newBoard = [...board];

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        let count = 0;

        // 隣接する8方向をチェック
        directions.forEach(dir => {
          const ni = i + dir.dx;
          const nj = j + dir.dy;

          // ボードの範囲内かつそのセルが猫セルかどうかをチェック
          if (ni >= 0 && ni < boardSize && nj >= 0 && nj < boardSize && newBoard[ni][nj].isCat) {
            count++;
          }
        });

        // 数字をセルに設定
        if (count > 0) {
          newBoard[i][j].numCats = count;
        }
      }
    }
    return newBoard;
  };
  

  // 【４】デフォルトセルがクリックされた時の処理
  const handleCellClick = (row, col) => {              // 行番号rowと列番号colを取ることでクリックされたセルの位置を特定 
    if (gameOver || board[row][col].isRevealed) return;    // ゲームオーバーまたは該当セルが開示済みの場合は無視する

    const newBoard = [...board];            // ボードを複製
    newBoard[row][col].isRevealed = true;   // 新しいボードの該当セルを開示

    setBoard(newBoard);                     // 新しいボードをセット

    // セルが最初にクリックされた場合、タイマーを開始する
    if (firstClick) {
      setIsActive(true);
      setFirstClick(false);
    }

    // 猫セルがクリックされた場合、ゲームオーバーとタイマー停止
    if (newBoard[row][col].isCat) {
      setGameOver(true);                    // ゲームオーバーに設定
      setIsActive(false);                   // タイマーを停止
      return; 
    }

    // 数字が0のセルがクリックされた場合、隣接する数字が0のセルも同時に開示
    const revealAdjacentCells = (r, c) => {
      const directions = [
        { dx: -1, dy: -1 }, // 左上
        { dx: -1, dy: 0 },  // 上
        { dx: -1, dy: 1 },  // 右上
        { dx: 0, dy: -1 },  // 左
        { dx: 0, dy: 1 },   // 右
        { dx: 1, dy: -1 },  // 左下
        { dx: 1, dy: 0 },   // 下
        { dx: 1, dy: 1 }    // 右下
      ];
  
      directions.forEach(dir => {
        const ni = r + dir.dx;
        const nj = c + dir.dy;
  
        if (ni >= 0 && ni < boardSize && nj >= 0 && nj < boardSize && !newBoard[ni][nj].isRevealed) {
          newBoard[ni][nj].isRevealed = true;
          if (newBoard[ni][nj].numCats === 0) {
            revealAdjacentCells(ni, nj);
          }
        }
      });
    };
  
    if (newBoard[row][col].numCats === 0) {
      revealAdjacentCells(row, col);
    }
  
    setBoard(newBoard);
  };


  // 【５】ボードの描出
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div className="board-row" key={rowIndex}>
        {row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            isCat={cell.isCat}
            isRevealed={cell.isRevealed}
            numCats={cell.numCats}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))}
      </div>
    ));
  };

  // 【６】リセットボタンクリック時
  const resetBoard = () => {
    const currentBoard = [...board];  // 現在のボードの状態を取得
  
    const initialBoard = generateInitialBoard();   // 初期ボードを生成
    const boardWithCats = placeCats(initialBoard); // 猫を配置
    const finalBoard = placeNum(boardWithCats);    // 数字を設定
  
    // 現在のボードの各セルの状態を初期化する
    currentBoard.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.isCat = finalBoard[i][j].isCat;
        cell.isRevealed = false;  // 開示状態を初期化
        cell.numCats = finalBoard[i][j].numCats;
      });
    });
  
    setBoard(currentBoard);   // ボードを更新
    setGameOver(false);       // ゲームオーバーをリセット
    setFirstClick(true);      // 最初のクリックをリセット
    setIsActive(false);       // タイマーを停止
  };

  // リセットボタンをクリックした時ボードを初期化
  useEffect(() => {
    resetBoard();
  }, [resetSignal]);

  return (
    <div className="board">
      {renderBoard()}
    </div>
  );
};

export default Board;