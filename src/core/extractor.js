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
}

export default JSONExtractor;