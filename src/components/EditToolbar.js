import React from "react";

export default class EditToolbar extends React.Component {

    render() {
        //console.log("can undo: "+this.props.hasUndo);//scrap
        let disableClose = !this.props.isListOpen;
        return (
            <div id="edit-toolbar">
                <div 
                    id='undo-button' 
                    className = {!this.props.hasUndo?"top5-button-disabled":"top5-button"}
                    onClick = {this.props.undoCallback}>
                        &#x21B6;
                </div>
                <div
                    id='redo-button'
                    className = {!this.props.hasRedo?"top5-button-disabled":"top5-button"}
                    onClick = {this.props.redoCallback}>
                        &#x21B7;
                </div>
                <div
                    className = {disableClose?"top5-button-disabled":"top5-button"}
                    id='close-button'
                    onClick = {this.props.closeCallback}>
                        &#x24E7;
                </div>
            </div>
        )
    }
}