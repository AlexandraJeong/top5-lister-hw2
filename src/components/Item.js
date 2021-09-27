import React from "react";

export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemName: this.props.currentList.items,
            itemId: this.props.itemId,
            editActive: false,
        }
    }
}