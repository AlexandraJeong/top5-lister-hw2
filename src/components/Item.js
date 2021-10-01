import React from "react";

export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemId: this.props.itemId,
            editItemActive: false,
            text: "",
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
        //console.log(this.state.itemId);
        //this.props.swapItems(event,)
    }

    handleDragStart = (ev) =>{
        //ev.preventDefault();
        this.props.startIndexCallback(this.state.itemId);
        //console.log("started");
        //console.log(ev);

    }
    handleDragOver = (ev) =>{//ev is what mouse is hovering over
        console.log(this.state.itemId);
        ev.preventDefault();
        ev.stopPropagation();
        //console.log(ev);
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
            onDragStart = {this.handleDragStart}
            onDragOver = {this.handleDragOver}
            draggable = {true}
            key = {"item-"+this.state.itemId} id = {"item-"+this.state.itemId} 
            className="top5-item">{this.props.currentList.items[this.state.itemId]}</div>;
        }
    }
}