import React from "react";

export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemId: this.props.itemId,
            editItemActive: false,
            text: "",
            hovering: false,
        }
    }

    handleClick = (event) => {
        if (event.detail === 2) {
            this.handleToggleEdit(event);
        }
    }

    handleToggleEdit = (event) => {
        this.setState({editItemActive: !this.state.editItemActive});
    }

    handleKeyPress = (event) => {
        if (event.code === "Enter") {
            this.handleBlur();
        }
    }
    handleBlur = () => {
        let textValue = this.state.text;
        
        //console.log("Item handleBlur: " + textValue);
        this.handleToggleEdit();
        this.props.renameItemCallback(this.state.itemId, textValue);
    }

    handleUpdate = (event) => {
        this.setState({ text: event.target.value });
    }

    handleOnDrop = (ev) =>{
        ev.preventDefault();
        this.props.swapItemCallback(this.state.itemId);
        this.handleDragLeave();
    }

    handleDragStart = (ev) =>{
        this.props.startIndexCallback(this.state.itemId);
    }

    handleDragEnter = (ev) =>{//ev is what mouse is hovering over
        //console.log(this.state.itemId);
        this.setState({
            hovering: true
        }); 
    }
    handleDragOver = (ev) =>{
        ev.preventDefault();
        ev.stopPropagation();
    }

    handleDragLeave = (ev) =>{
        this.setState({
            hovering: false
        });
    }
    render(){
        if(this.state.editItemActive){
            return <input
            key = {"edit-item-"+this.state.itemId}
            id={"list-" + this.state.itemId}
            className='top5-item'
            type='text'
            onKeyPress={this.handleKeyPress}
            onBlur={this.handleBlur}
            onChange={this.handleUpdate}
            defaultValue={this.props.currentList.items[this.state.itemId]}/>
        }else{
            return <div onClick={this.handleClick} 
            onDrop = {this.handleOnDrop}
            onDragOver = {this.handleDragOver}
            onDragStart = {this.handleDragStart}
            onDragEnter = {this.handleDragEnter}
            onDragLeave = {this.handleDragLeave}
            draggable = {true}
            key = {"item-"+this.state.itemId} id = {"item-"+this.state.itemId} 
            className={this.state.hovering?"top5-item-dragged-to":"top5-item"}>
            {this.props.currentList.items[this.state.itemId]}</div>;
        }
    }
}