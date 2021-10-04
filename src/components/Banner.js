import React from "react";
import EditToolbar from "./EditToolbar";

export default class Banner extends React.Component {
    render() {
        const { title} = this.props;
        return (
            <div id="top5-banner">
                {title}
                <EditToolbar 
                isListOpen = {this.props.isListOpen}
                closeCallback = {this.props.closeCallback}
                undoCallback = {this.props.undoCallback}
                redoCallback = {this.props.redoCallback}
                hasUndo = {this.props.hasUndo}
                hasRedo = {this.props.hasRedo}/>
            </div>
        );
    }
}