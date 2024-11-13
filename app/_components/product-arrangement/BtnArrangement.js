"use client";

function BtnArrangement({ children, layoutOrder, text, visibility, onClick }) {
  return (
    <button onClick={onClick} className={`btn-arrangement ${layoutOrder} ${visibility}`}>
      {children}

      <span className="text-sm">{text}</span>
    </button>
  );
}

export default BtnArrangement;
