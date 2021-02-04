import React from "react";
import SortButton from "./SortButton";
import "./SettingsSelectors.css";

class SettingsSelectors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate() {
    console.log(this.props.isSorting);
  }

  handleSortTypeChange(type) {
    if (!this.props.sortConfig) return;
    const { sortConfig } = this.props;
    sortConfig.type = type;
    this.props.updateSortConfig(sortConfig, false);
  }

  handleArraySizeChange(e) {
    if (!this.props.sortConfig) return;
    const { sortConfig } = this.props;
    sortConfig.arraySize = parseFloat(e.target.value);
    this.props.updateSortConfig(sortConfig, true);
  }

  handleSortSpeedChange(e) {
    if (!this.props.sortConfig) return;
    const sortConfig = this.props.sortConfig;
    sortConfig.sortSpeed = parseFloat(e.target.value);
    this.props.updateSortConfig(sortConfig, false);
  }

  render() {
    const { theme, isSorting } = this.props;

    return (
      <div id="SettingsSelectorsContainer">
        <div id="SortSpeedSelector">
          <div
            style={{
              color: theme.navTextColor,
              opacity: ".7",
              alignSelf: "flex-start",
              marginLeft: "15px",
            }}
          >
            Sort Speed
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              background: `linear-gradient(145deg, ${theme.navBackgroundBoxDark}, ${theme.navBackgroundBoxLight})`,
              boxShadow: `inset 20px 20px 60px ${theme.navBackgroundBoxShadowDark}, inset -20px -20px 60px ${theme.navBackgroundBoxShadowLight}`,
            }}
            className="aSetttingMenuBar"
          >
            <input
              id="sortSpeedInput"
              value={this.props.sortConfig?.sortSpeed}
              type="range"
              min="0.01"
              max="15"
              step=".01"
              onChange={(e) => this.handleSortSpeedChange(e)}
            />
            <p
              style={{
                color: theme.navTextColor,
                marginLeft: "7px",
                fontWeight: "600",
              }}
            >
              {this.props?.sortConfig
                ? parseFloat(this.props.sortConfig?.sortSpeed).toFixed(2)
                : 0}
            </p>
            {/* <Slider className="arraySizeInput" value={this.props.sortConfig?.arraySize} min="2" max="200" step="1" onChange={(e) => this.handleArraySizeChange(e)}/> */}
          </div>
        </div>
        <div id="ArraySizeSelector">
          <div
            style={{
              color: theme.navTextColor,
              opacity: ".7",
              alignSelf: "flex-start",
              marginLeft: "15px",
            }}
          >
            Array Size
          </div>
          <div
            style={{
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              background: `linear-gradient(145deg, ${theme.navBackgroundBoxDark}, ${theme.navBackgroundBoxLight})`,
              boxShadow: `inset 20px 20px 60px ${theme.navBackgroundBoxShadowDark}, inset -20px -20px 60px ${theme.navBackgroundBoxShadowLight}`,
            }}
            className="aSetttingMenuBar"
          >
            <input
              id="arraySizeInput"
              value={this.props.sortConfig?.arraySize}
              type="range"
              min="2"
              max="300"
              step="1"
              onChange={(e) => this.handleArraySizeChange(e)}
            />
            <p
              style={{
                color: theme.navTextColor,
                marginLeft: "7px",
                fontWeight: "600",
              }}
            >
              {this.props.barsArray ? this.props.barsArray.length : 0}
            </p>
            {/* <Slider className="arraySizeInput" value={this.props.sortConfig?.arraySize} min="2" max="200" step="1" onChange={(e) => this.handleArraySizeChange(e)}/> */}
          </div>
        </div>
        <div id="SortTypeSelector">
          <div
            style={{
              color: theme.navTextColor,
              opacity: ".7",
              alignSelf: "flex-start",
              marginLeft: "15px",
            }}
          >
            Sort Type
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: theme.navTextColor,
              background: `linear-gradient(145deg, ${theme.navBackgroundBoxDark}, ${theme.navBackgroundBoxLight})`,
              boxShadow: `inset 20px 20px 60px ${theme.navBackgroundBoxShadowDark}, inset -20px -20px 60px ${theme.navBackgroundBoxShadowLight}`,
            }}
            className="aSetttingMenuBar"
          >
            <SortButton
              updateSortType={(type) => this.handleSortTypeChange(type)}
              title="Quick"
              theme={this.props.theme}
              sortConfig={this.props.sortConfig}
            />
            <SortButton
              updateSortType={(type) => this.handleSortTypeChange(type)}
              title="Merge"
              theme={this.props.theme}
              sortConfig={this.props.sortConfig}
            />
            <SortButton
              updateSortType={(type) => this.handleSortTypeChange(type)}
              title="Heap"
              theme={this.props.theme}
              sortConfig={this.props.sortConfig}
            />
            <SortButton
              updateSortType={(type) => this.handleSortTypeChange(type)}
              title="Bubble"
              theme={this.props.theme}
              sortConfig={this.props.sortConfig}
            />
          </div>
        </div>
        <div id="StartSortSelector">
          <div
            onClick={() =>
              isSorting
                ? this.props.updateIsSorting(false)
                : this.props.startSort()
            }
            style={{
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              color: theme.navTextColor,
              background: `linear-gradient(145deg, ${theme.navBackgroundBoxDark}, ${theme.navBackgroundBoxLight})`,
              boxShadow: `inset 20px 20px 60px ${theme.navBackgroundBoxShadowDark}, inset -20px -20px 60px ${theme.navBackgroundBoxShadowLight}`,
            }}
            className="aSetttingMenuBar"
          >
            {isSorting ? "Stop" : "Sort"}
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsSelectors;
