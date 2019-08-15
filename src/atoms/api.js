class API {
    constructor() {
        this.root = 'https://hacker-news.firebaseio.com/v0';
    }

    async getTopStories() {
        let response = await fetch(`${this.root}/topstories.json`);
        let data = await response.json();
        return data;
    }

    async getMaxItemID() {
        let response = await fetch(`${this.root}/maxitem.json`);
        let data = await response.json();
        return data;
    }

    async getItem(itemID) {
        let response = await fetch(`${this.root}/item/${itemID}.json`);
        let data = await response.json();
        return data;
    }
}

export default new API();