import React from "react";

export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentList: this.props.currentList,
            itemId: this.props.itemId,
            editItemActive: false,
        }
    }
    render(){
        if(this.props.editItemActive){
            <input
                key = {"edit-item-"+this.state.itemId}
                id={"list-" + this.state.itemId}
                className='top5-item'
                type='text'
                onKeyPress={this.handleKeyPress}
                onBlur={this.handleBlur}
                onChange={this.handleUpdate}
                defaultValue={""}/>
        }else{
            return <div onClick={this.handleClick} 
            key = {"item-"+this.state.itemId} id = {"item-"+this.state.itemId} 
            className="top5-item">{this.state.currentList.items[this.state.itemId]}</div>;
        }
    }
}