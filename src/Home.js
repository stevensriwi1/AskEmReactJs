import React, { useState, Component } from "react";
import './App.css';
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class Home extends Component {
    state = {
        //declaring a local new state for questionBank
        questionBank: [],
        score: 0,
        responses: 0
    };
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };

    componentDidMount() {
        this.getQuestions();
    }

    //count how many answers is correct
    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }
        //make sure to not over set the values of answers inputed beyond the questions given and less than that
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        })
    }
    playAgain = () =>
    {
        this.getQuestions();
        this.setState({
            score: 0,
            responses:0
        })
    }

    render() {
        return (
            <div className="container">
                <div className="title">AskEm</div>
                {/* condition whether there is any questions rendered from API and when the questions touches 5 */}
                {this.state.questionBank.length > 0 && this.state.responses < 5 && this.state.questionBank.map(({ question, answers, correct, questionId }) => (
                    //loads the questionBox from componets folder
                    <QuestionBox
                        question={question}
                        options={answers}
                        key={questionId}
                        selected={answer => this.computeAnswer(answer, correct)}
                    />
                )
                )}

                {/* get the score and  handle playAgain function */}
                {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
            </div>


        );
    }

};

export default Home;
