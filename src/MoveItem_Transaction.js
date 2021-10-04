import jsTPS_Transaction from "./jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Alexandra Jeong
 */
export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(workspace, initOld, initNew) {
        super();
        this.workspace = workspace
        this.oldItemIndex = initOld;
        this.newItemIndex = initNew;
    }

    doTransaction() {
        this.workspace.swapItemHelper(this.oldItemIndex, this.newItemIndex);
    }
    
    undoTransaction() {
        this.workspace.swapItemHelper(this.oldItemIndex, this.newItemIndex);
    }
}