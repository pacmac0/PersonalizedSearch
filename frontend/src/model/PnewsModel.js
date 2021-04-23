class PnewsModel {
    constructor() {
        this.observers =[];
        this.currentUser = "Fynn";
        this.users = ["Fynn","Hamza","Artin","Yuqi","No"];
    }
    changeUser(id) {
        console.log("change to user: "+id);
        this.currentUser = id;
        this.notifyObservers();
    }
    getUsersList() {
        return this.users;
    }
    getCurrentUser() {
        return this.currentUser;
    }
    
    /**
     * Adds an observer calling the specified callback function
     * @param {observerCallback} callback - Callback function to be called when observed value changes
     */
    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }

    /**
     * Removes the specified observer callback
     * @param {observerCallback} callback - Callback function to be removed
     */
    removeObserver(callback) {
        this.observers = this.observers.filter(
            (observer) => observer !== callback
        );
    }

    /** Calls each callback function in the observers array */
    notifyObservers() {
        this.observers.forEach((callback) => {
            setTimeout(() => {
                try {
                    callback();
                } catch (error) {
                    console.error(error);
                }
            }, 0);
        });
    }
}

export default PnewsModel;