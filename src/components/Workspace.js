import React from "react";
import Item from "./Item";

export default class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editItemActive: false,
            itemToEdit: -1,
            text: "",
            currentList: this.props.currentList,
        }
    }

    render() {
        const {currentList} = this.props;
        if(currentList){
            return (
                <div id="top5-workspace">
                    <div id="workspace-edit">
                        <div id="edit-numbering">
                            <div className="item-number">1.</div>
                            <div className="item-number">2.</div>
                           <div className="item-number">3.</div>
                            <div className="item-number">4.</div>
                            <div className="item-number">5.</div>
                        </div>
                        <div id="edit-items">
                            {currentList.items.map((item, index) => (
                                <Item 
                                itemId = {index}
                                currentList = {this.props.currentList}
                                key = {"items-"+index}
                                renameItemCallback = {this.props.renameItemCallback}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )
        }else{
            return( 
            <div id="top5-workspace">
                <div id="workspace-edit">
                    <div id="edit-numbering">
                        <div className="item-number">1.</div>
                        <div className="item-number">2.</div>
                        <div className="item-number">3.</div>
                        <div className="item-number">4.</div>
                        <div className="item-number">5.</div>
                    </div>
                </div>
            </div>)
        }
    }
}