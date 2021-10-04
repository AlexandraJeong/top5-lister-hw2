import React from "react";
import Item from "./Item";
import MoveItem_Transaction from "../MoveItem_Transaction";
//import jsTPS from "./transactions/jsTPS.js"

export default class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swapIndex: -1,
            editItemActive: false,
            itemToEdit: -1,
            text: "",
            currentList: this.props.currentList,
        }
    }

    setStartIndex = (index) =>{
        this.setState({
            swapIndex: index
        });
    }
    swapItemHelper(index1, index2){
        let list = this.props.currentList;
        let temp = list.items[index1];
        list.items[index1] = list.items[index2];
        list.items[index2]=temp;
    }
    swapItem = (dropIndex) => {
        if(dropIndex !== this.state.swapIndex){
            let transaction = new MoveItem_Transaction(this, this.state.swapIndex, dropIndex);
            this.props.addMoveCallback(transaction);
        }
        this.setState({
            swapIndex: -1
        });
        this.props.saveListCallback(this.props.currentList);
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
                                swapItemCallback = {this.swapItem}
                                startIndexCallback = {this.setStartIndex}
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