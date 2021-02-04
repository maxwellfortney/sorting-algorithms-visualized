import React from "react";
import "./BarsVisualizer.css";

class BarsVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { theme, sortConfig, barsArray } = this.props;

    return (
      <div id="BarsVisualizer">
        {barsArray && barsArray.length > 0 ? (
          <>
            {barsArray.map((bar, i) => {
              return (
                <div
                  className="aBar"
                  key={i}
                  style={{
                    height: `${(bar / 1000) * 100}%`,
                    flexGrow: "1",
                    backgroundColor: theme.mainBarColor,
                  }}
                ></div>
              );
            })}
          </>
        ) : null}
      </div>
    );
  }
}

export default BarsVisualizer;
