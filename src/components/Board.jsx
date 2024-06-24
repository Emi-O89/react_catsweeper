import React, { useState, useEffect } from 'react';
import '../App.css';
import Cell from './Cell';

const Board = () => {
  const boardSize = 16;

  // 【１】ボードの状態管理／初期ボードの生成
  const [board, setBoard] = useState(() => {
    const initialBoard = [];
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push({           // row配列にセルの初期状態をオブジェクトとして追加
          isCat: false,      // 猫なし
          isRevealed: false, // 開示セルなし
          numCats: 0         // 隣接する猫セルの数
        });
      }
      initialBoard.push(row);   // 生成したrowをinitialBoard配列に追加
    }
    return initialBoard;        // useStateフックの初期値として生成した初期ボードを返す
  });


  // 【2】猫セルをランダムに配置
  const placeCats = () => {       // 猫セルを配置する関数を作成
    const newBoard = [...board];  // 現在のボードを複製してnewBoardを作成（元のボードを操作しない）
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (Math.random() < 0.1) {        // 1/10の確率で
          newBoard[i][j].isCat = true;    // 該当するセルの猫を表示
        }
      }
    }
    setBoard(newBoard);    // 初期ボードをnewBoardに更新
  };

  useEffect(() => {  // 猫セルを配置する関数を実行
    placeCats();
  }, []);            // 初期レンダリング（初期ボード生成）後に1度だけplaceCat関数を実行


  // 【３】数字セルを設定
  const placeNum = () => {
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
        newBoard[i][j].numCats = count;
      }
    }
    setBoard(newBoard);    // 新しいボードをセット
  };

  useEffect(() => {  // 数字セルを設定する関数を実行
    placeNum();
  }, [board]);       // ボード更新時に
  

  // 【４】デフォルトセルがクリックされた時の処理
    const handleCellClick = (row, col) => {   // 行番号rowと列番号colを取ることでクリックされたセルの位置を特定 
      if (!board[row][col].isRevealed) {      // 該当セルがデフォルトセル時のみに
        const newBoard = [...board];          // ボードを複製して
        newBoard[row][col].isRevealed = true; // 新しいボードの該当セルを開示
      setBoard(newBoard);                     // 新しいボードをセット
    }
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

  return (
    <div className="board">
      {renderBoard()}
    </div>
  );
};

export default Board;