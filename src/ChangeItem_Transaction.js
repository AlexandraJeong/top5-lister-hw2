import jsTPS_Transaction from "./jsTPS.js"

/**
 * ChangeItem_Transaction
 * 
 * This class represents a transaction that updates the text
 * for a given item. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Alexandra Jeong
 */
export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(app, initId, initOldText, initNewText) {
        super();
        this.app =  app;
        this.id = initId;
        this.oldText = initOldText;
        this.newText = initNewText;
    }

    doTransaction() {
        this.app.renameItemHelper(this.id, this.newText);
    }
    
    undoTransaction() {
        this.app.renameItemHelper(this.id, this.oldText);
    }
}