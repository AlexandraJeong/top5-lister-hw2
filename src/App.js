import React from 'react';
import './App.css';
import ChangeItem_Transaction from "./ChangeItem_Transaction";
import jsTPS from "./jsTPS";


// IMPORT DATA MANAGEMENT AND TRANSACTION STUFF
import DBManager from './db/DBManager';

// THESE ARE OUR REACT COMPONENTS
import DeleteModal from './components/DeleteModal';
import Banner from './components/Banner.js'
import Sidebar from './components/Sidebar.js'
import Workspace from './components/Workspace.js';
import Statusbar from './components/Statusbar.js'

class App extends React.Component {
    constructor(props) {//wow
        super(props);

        // THIS WILL TALK TO LOCAL STORAGE
        this.db = new DBManager();
        //this.tps = new jsTPS();
        // GET THE SESSION DATA FROM OUR DATA MANAGER
        let loadedSessionData = this.db.queryGetSessionData();

        // SETUP THE INITIAL STATE
        this.state = {
            tps: new jsTPS(),
            currentList : null,
            sessionData : loadedSessionData,
            listToDelete: null,
        }
    }
    saveList = (list) =>{
        this.db.mutationUpdateList(list);
    }
    sortKeyNamePairsByName = (keyNamePairs) => {
        keyNamePairs.sort((keyPair1, keyPair2) => {
            // GET THE LISTS
            return keyPair1.name.localeCompare(keyPair2.name);
        });
    }
    // THIS FUNCTION BEGINS THE PROCESS OF CREATING A NEW LIST
    createNewList = () => {
        // FIRST FIGURE OUT WHAT THE NEW LIST'S KEY AND NAME WILL BE
        let newKey = this.state.sessionData.nextKey;
        let newName = "Untitled" + newKey;

        // MAKE THE NEW LIST
        let newList = {
            key: newKey,
            name: newName,
            items: ["?", "?", "?", "?", "?"]
        };

        // MAKE THE KEY,NAME OBJECT SO WE CAN KEEP IT IN OUR
        // SESSION DATA SO IT WILL BE IN OUR LIST OF LISTS
        let newKeyNamePair = { "key": newKey, "name": newName };
        let updatedPairs = [...this.state.sessionData.keyNamePairs, newKeyNamePair];
        this.sortKeyNamePairsByName(updatedPairs);

        // CHANGE THE APP STATE SO THAT IT THE CURRENT LIST IS
        // THIS NEW LIST AND UPDATE THE SESSION DATA SO THAT THE
        // NEXT LIST CAN BE MADE AS WELL. NOTE, THIS setState WILL
        // FORCE A CALL TO render, BUT THIS UPDATE IS ASYNCHRONOUS,
        // SO ANY AFTER EFFECTS THAT NEED TO USE THIS UPDATED STATE
        // SHOULD BE DONE VIA ITS CALLBACK
        this.setState(prevState => ({
            currentList: newList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey + 1,
                counter: prevState.sessionData.counter + 1,
                keyNamePairs: updatedPairs
            }
        }), () => {
            // PUTTING THIS NEW LIST IN PERMANENT STORAGE
            // IS AN AFTER EFFECT
            this.db.mutationCreateList(newList);
            this.db.mutationUpdateSessionData(this.state.sessionData);
        });
    }
    renameList = (key, newName) => {
        let newKeyNamePairs = [...this.state.sessionData.keyNamePairs];
        // NOW GO THROUGH THE ARRAY AND FIND THE ONE TO RENAME
        for (let i = 0; i < newKeyNamePairs.length; i++) {
            let pair = newKeyNamePairs[i];
            if (pair.key === key) {
                pair.name = newName;
            }
        }
        this.sortKeyNamePairsByName(newKeyNamePairs);

        // WE MAY HAVE TO RENAME THE currentList
        let currentList = this.state.currentList;
        if (currentList.key === key) {
            currentList.name = newName;
        }

        this.setState(prevState => ({
            currentList: prevState.currentList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey,
                counter: prevState.sessionData.counter,
                keyNamePairs: newKeyNamePairs
            }
        }), () => {
            // AN AFTER EFFECT IS THAT WE NEED TO MAKE SURE
            // THE TRANSACTION STACK IS CLEARED
            this.closeCurrentList();
            let list = this.db.queryGetList(key);
            list.name = newName;
            this.db.mutationUpdateList(list);
            this.db.mutationUpdateSessionData(this.state.sessionData);
        });
    }
    renameItemHelper(index,newName){
        // eslint-disable-next-line
        this.state.currentList.items[index]=newName;
        this.setState(prevState => ({
            currentList: this.state.currentList,
        }));
    }
    renameItem = (index, newName) => {
        let items = this.state.currentList.items;
        if(newName !== ""){
            //items[index]=newName;
            let transaction = new ChangeItem_Transaction(this, index, items[index], newName);
            this.state.tps.addTransaction(transaction);
        }
        this.db.mutationUpdateList(this.state.currentList);
    }
    // THIS FUNCTION BEGINS THE PROCESS OF LOADING A LIST FOR EDITING
    loadList = (key) => {
        let newCurrentList = this.db.queryGetList(key);
        let oldKey = 0;
        if(this.state.currentList!==null){
            oldKey = this.state.currentList.key;
        }
        if(oldKey!==key){
            this.state.tps.clearAllTransactions();    
            this.setState(prevState => ({
                currentList: newCurrentList,
                sessionData: prevState.sessionData
            }), () => {
            });
        }
    }
    // THIS FUNCTION BEGINS THE PROCESS OF CLOSING THE CURRENT LIST
    closeCurrentList = () => {
        this.state.tps.clearAllTransactions();
        this.setState(prevState => ({
            currentList: null,
            listKeyPairMarkedForDeletion : prevState.listKeyPairMarkedForDeletion,
            sessionData: this.state.sessionData
        }), () => {
            // ANY AFTER EFFECTS?
        });
    }
    deleteList = (keyNamePair) => {
        // SOMEHOW YOU ARE GOING TO HAVE TO FIGURE OUT
        // WHICH LIST IT IS THAT THE USER WANTS TO
        // DELETE AND MAKE THAT CONNECTION SO THAT THE
        // NAME PROPERLY DISPLAYS INSIDE THE MODAL
        this.setState(prevState => ({
            listToDelete: keyNamePair}));
        this.showDeleteListModal();
    }

    reindexKeyName(){
        // eslint-disable-next-line
        this.state.sessionData.nextKey=this.state.sessionData.nextKey-1;
        this.setState(prevState => ({
            sessionData: this.state.sessionData,
        }));
    }
//redo id and key
    deleteListConfirmed = () => {
        this.closeCurrentList();
        for(let i=0; i<this.state.sessionData.keyNamePairs.length; i++){
            if(this.state.sessionData.keyNamePairs[i].key === this.state.listToDelete.key){
                this.state.sessionData.keyNamePairs.splice(i,1);
            }
        }
        // eslint-disable-next-line
        //this.state.sessionData.nextKey=this.state.sessionData.nextKey-1;//decrement by 1
        //this.reindexKeyName();
        this.setState(prevState => ({
            listToDelete: null,
            sessionData: this.state.sessionData
        }));
        this.db.mutationUpdateSessionData(this.state.sessionData);
        this.hideDeleteListModal();
    }

    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST
    showDeleteListModal() {
        let modal = document.getElementById("delete-modal");
        modal.classList.add("is-visible");
    }
    // THIS FUNCTION IS FOR HIDING THE MODAL
    hideDeleteListModal() {
        let modal = document.getElementById("delete-modal");
        modal.classList.remove("is-visible");
    }

    undo = () => {
        if(this.state.tps.hasTransactionToUndo()){
            this.state.tps.undoTransaction();
            this.setState({});
        }
    }

    redo = () => {
        if(this.state.tps.hasTransactionToRedo()){
            this.state.tps.doTransaction();
            this.setState({});
        }
    }

    addTransaction = (transaction) =>{
        this.state.tps.addTransaction(transaction);
        //console.log(this.state.tps.hasTransactionToUndo());
        this.setState({});
    }

    render() {
        let hasUndo = this.state.tps.hasTransactionToUndo();
        let hasRedo = this.state.tps.hasTransactionToRedo();
        //console.log(hasUndo);
        return (
            <div id="app-root">
                <Banner 
                    title='Top 5 Lister'
                    closeCallback={this.closeCurrentList} 
                    undoCallback={this.undo}
                    redoCallback={this.redo}
                    isListOpen={this.state.currentList!==null}
                    hasUndo = {hasUndo}
                    hasRedo = {hasRedo}/>
                <Sidebar
                    heading='Your Lists'
                    currentList={this.state.currentList}
                    keyNamePairs={this.state.sessionData.keyNamePairs}
                    createNewListCallback={this.createNewList}
                    deleteListCallback={this.deleteList}
                    loadListCallback={this.loadList}
                    renameListCallback={this.renameList}

                />
                <Workspace
                    tps = {this.state.tps}
                    saveListCallback={this.saveList}
                    currentList={this.state.currentList}
                    renameItemCallback={this.renameItem} 
                    addMoveCallback = {this.addTransaction}/>
                <Statusbar 
                    currentList={this.state.currentList} />
                <DeleteModal
                    hideDeleteListModalCallback={this.hideDeleteListModal}
                    deleteListCallback={this.deleteListConfirmed}
                    listKeyPair = {this.state.listToDelete}
                />
            </div>
        );
    }
}

export default App;
