import React from "react";
import "./Modal.css";

export default function Modal({isOpen, children}) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal">
                {children}
            </div>
        </div>
    )
}