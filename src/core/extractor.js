class JSONExtractor
{
    constructor(jsonFilePath)
    {
        this.jsonFilePath = jsonFilePath;
    }

    async extractData() {
        try {
            const response = await fetch(this.jsonFilePath);
            return await response.json();
        }
        catch {
            console.error('Error fetching JSON file:', error);
            return null;
        }
    }

    async extractQuestionList() {
        let questionList = [];
        let data = await this.extractData();

        if(data) {
            data.forEach(element => {
                element.questions.forEach(item => {
                    questionList.push(item.text);
                });
            });
        }
        else {
            console.log('No data to extract questions from.');
        }

        return questionList;
    }

    async extractChoicesList() {
        let choices = [];
        let data = await this.extractData();

        if(data) {
            data.forEach(element => {
                element.questions.forEach(item => {
                    choices.push(item.choices);
                });
            });
        }
        else {
            console.log('No data to extract choices from.');
        }

        return choices;
    }

    async extractAnswersList() {
        let answers = [];
        let data = await this.extractData();

        if(data) {
            data.forEach(element => {
                element.questions.forEach(item => {
                    answers.push(item.correctIndex);
                });
            });
        }
        else {
            console.log('No data to extract answers from.');
        }

        return answers;
    }

    async extractSet(index = 0) {
        let data = await this.extractData();
        const numberOfSets = data ? data.length : 0;

        if(data && index >= 0 && index < numberOfSets) {
            return data[index];
        } else {
            console.log(`No question set found at index ${index}.`);
            return null;
        }
    }

    async extractQuestionSet(index = 0) {
        let data = await this.extractSet(index);

        if(data) {
            return data.questions.map(item => item.text);
        } else {
            return [];
        }
    }

    async extractChoicesSet(index = 0) {
        let data = await this.extractSet(index);    
        if(data) {
            return data.questions.map(item => item.choices);
        } else {
            return [];
        }       
    }
}

export default JSONExtractor;