class PnewsModel {
    constructor() {
        const modelString= localStorage.getItem("model");
        let user = JSON.parse(modelString)
        if (user != null){
            this.currentUser = user.user
        }

        else{
            this.currentUser = "Fynn";
        }

        this.observers = [];
        this.users = ["Fynn","Hamza","Artin","Yuqi","No"];
    }
    changeUser(id) {
        localStorage.setItem("model", JSON.stringify({user: id}))
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