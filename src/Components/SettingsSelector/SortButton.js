import React from 'react';
import './SettingsSelectors.css';

class SortButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        isHovered: false
    }
  }

  render() {
    const {theme, title, sortConfig} = this.props;

    return (
      <div onClick={() => this.props.updateSortType(title.toLowerCase())} className="aSortTypeButton" onMouseEnter={() => this.setState({isHovered: true})} onMouseLeave={() => this.setState({isHovered: false})} style={{backgroundColor: this.state.isHovered ? theme.navBackgroundHoverColor : sortConfig.type === title.toLowerCase() ? theme.navBackgroundHoverColor:null}}>
          {title}
      </div>
    );
  }
  
}

export default SortButton;
