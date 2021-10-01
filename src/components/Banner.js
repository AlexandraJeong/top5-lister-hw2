import React from "react";
import EditToolbar from "./EditToolbar";

export default class Banner extends React.Component {
    render() {
        console.log(this.props.isListOpen);
        const { title} = this.props;
        return (
            <div id="top5-banner">
                {title}
                <EditToolbar 
                isListOpen = {this.props.isListOpen}
                closeCallback = {this.props.closeCallback}/>
            </div>
        );
    }
}