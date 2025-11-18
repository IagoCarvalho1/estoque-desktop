import React from "react";
import { jsx } from "react/jsx-runtime";

interface TableProps {
  columns: string[];
  data: (string | jsx.Element)[][];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="w-full text-left border-collapse border border-gray-600">
      <thead>
        <tr className="bg-gray-700">
          {columns.map((col) => (
            <th key={col} className="p-2 border-b border-gray-600">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="even:bg-gray-800 odd:bg-gray-700">
            {row.map((cell, cidx) => (
              <td key={cidx} className="p-2 border-b border-gray-600">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
