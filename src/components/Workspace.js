import React from "react";

export default class Workspace extends React.Component {
    render() {
        const {currentList} = this.props;
        let item1 = "";
        let item2 = "";
        let item3 = "";
        let item4 = "";
        let item5 = "";
        if(currentList){
            item1=currentList.items[0];
            item2=currentList.items[1];
            item3=currentList.items[2];
            item4=currentList.items[3];
            item5=currentList.items[4];
        }
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
                        <div id = "item-1" className="top5-item">{item1}</div>
                        <div id = "item-2" className="top5-item">{item2}</div>
                        <div id = "item-3" className="top5-item">{item3}</div>
                        <div id = "item-4" className="top5-item">{item4}</div>
                        <div id = "item-5" className="top5-item">{item5}</div>
                    </div>
                </div>
            </div>
        )
    }
}