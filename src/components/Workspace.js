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
    handleClick = (event) => {
        if (event.detail === 2) {
            this.handleToggleEdit(event);
        }
    }

    handleToggleEdit = (event) => {
        if(event==null){
            this.setState({
                editItemActive: !this.state.editItemActive});
        }else{
            this.setState({
                editItemActive: !this.state.editItemActive,
                itemToEdit: parseInt(event.currentTarget.id.charAt(event.currentTarget.id.length-1)),
            });
        }
    }

    handleKeyPress = (event) => {
        if (event.code === "Enter") {
            this.handleBlur();
        }
    }

    handleBlur = () => {
        const {currentList} = this.props;
        let textValue = this.state.text;
        console.log("Item handleBlur: " + textValue);
        let temp = currentList;
        temp.items[this.state.itemToEdit]=this.state.text;
        this.handleToggleEdit();
        this.props.renameItemCallback(textValue, this.state.itemToEdit);
    }

    handleUpdate = (event) => {
        this.setState({ text: event.target.value });
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