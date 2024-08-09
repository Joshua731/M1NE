import React from "react";
import "./Cell.css";

export default function  Cell({value, onClick, onContextMenu}) {
    return (
        <button 
        className={`cell ${value.isOpen ? "open" : ""} ${value.isFlagged ? "flag" : ""} ${value.neighborMines > 0 && value.isOpen? `n${value.neighborMines}`:""}`}
        onContextMenu={onContextMenu}
        onClick={onClick}
        >
            {value.isOpen ? (value.isMine ? "💣" : value.neighborMines > 0 ? value.neighborMines : "") : value.isFlagged ? "🚩" : ""}
        </button>
    );
}