import { useState } from "react";
import "./PrefillMapper.css";

export default function PrefillMapper({options, handleOptionSelect}) {
  const [expandedNodes, setExpandedNodes] = useState([]);

  const toggleExpand = (nodeName) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeName)
        ? prev.filter((name) => name !== nodeName)
        : [...prev, nodeName]
    );
  };

  const renderOptions = (items) => {
    return items.map((item, index) => (
      <div key={index} className="option-container">
        {item.children ? (
          <>
            <button
              onClick={() => toggleExpand(item.name)}
              className="expand-button"
            >
              {expandedNodes.includes(item.name) ? '▼' : '►'} {item.name}
            </button>
            {expandedNodes.includes(item.name) && (
              <div className="child-options">
                {renderOptions(item.children)}
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => handleOptionSelect(item)}
            className="option-button"
          >
            {item}
          </button>
        )}
      </div>
    ));
  };

  return (
    <div className="mapper-container">
      <div className="mapper-content">
        <h3>Select an Option</h3>
        {renderOptions(options)}
        <button onClick={() => handleOptionSelect(null)}>Cancel</button>
      </div>
    </div>
  );
}

