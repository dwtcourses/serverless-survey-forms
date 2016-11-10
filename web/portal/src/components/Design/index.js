
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classNames from 'classnames';

import EditQuestion from '../EditPanel/EditQuestion';
import OrderPage from '../EditPanel/OrderPage';
import EditPage from '../EditPanel/EditPage';
import Pagination from '../Form/Pagination';
import Privacy from '../Form/Privacy';

class Design extends PureComponent {

    constructor(props) {
        super(props);

        this._moveQuestion = this._moveQuestion.bind(this);
        this._getQuestion = this._getQuestion.bind(this);
        this._onAddPageClick = this._onAddPageClick.bind(this);
        this._onNotEditableClick = this._onNotEditableClick.bind(this);
    }

    componentDidMount() {
        // init questionnaire
        const { selectedUser, questions, surveyEditable,
            questionsActions, popupActions } = this.props;

        if (surveyEditable) {
            if (questions.length === 0) {
                const page = questions.length + 1;
                questionsActions.addPage(page);
            }
        } else {
            if (selectedUser.hasOwnProperty('accountid')) {
                popupActions.setPopup('notEditableAdmin');
            } else {
                popupActions.setPopup('notEditableSurvey');
            }
        }
    }

    render() {
        const { selectedUser, surveyPolicy, surveyEditable, questionsActions } = this.props;
        let edit;
        if (!selectedUser.hasOwnProperty('accountid')) {
            edit = this._renderEdit();
        } else {
            edit = (<div className={styles.notEditable} onClick={this._onNotEditableClick}></div>);
        }
        const btnClass = {
            [styles.pageBtn]: true,
            [styles.disabled]: !surveyEditable
        };
        return (
            <div ref="root">
                {edit}
                <div>{this._renderPage()}</div>

                <div className={styles.control}>
                    <button
                        className={classNames(btnClass)}
                        onClick={surveyEditable ? this._onAddPageClick : () => {}}
                    >+ Add Page</button>
                </div>

                <Privacy
                    surveyEditable={surveyEditable}
                    surveyPolicy={surveyPolicy}
                    questionsActions={questionsActions}
                />
            </div>
        );
    }

    _renderPage() {
        const { questions, dropQuestion, editQuestion, editPage,
            orderPage, surveyID, surveyEditable,
            questionsActions, editQuestionActions, editPageActions,
            orderPageActions, previewActions } = this.props;
        const basicProps = {
            questions,
            dropQuestion,
            editQuestion,
            editPage,
            surveyID,
            surveyEditable,
            questionsActions,
            editQuestionActions,
            editPageActions,
            orderPageActions,
            previewActions,
            moveQuestion: this._moveQuestion,
            getQuestion: this._getQuestion
        };
        const pageList = [];
        if (orderPage.length > 0) {
            orderPage.forEach((pageNum, idx) => {
                const page = questions[pageNum - 1];
                const pros = Object.assign({}, basicProps,
                    {
                        key: idx,
                        id: idx + 1,
                        data: page
                    });
                pageList.push(<Pagination {...pros} />);
            });
        } else {
            questions.forEach((page, idx) => {
                const pros = Object.assign({}, basicProps,
                    {
                        key: idx,
                        id: idx + 1,
                        data: page
                    });
                pageList.push(<Pagination {...pros} />);
            });
        }
        return pageList;
    }

    _renderEdit() {
        const { questions,
                editQuestion,
                editPage,
                orderPage,
                surveyEditable,
                questionsActions,
                editQuestionActions,
                editPageActions,
                orderPageActions } = this.props;

        if (editQuestion.hasOwnProperty('id') && editQuestion.id !== '') {
            const editProps = {
                editQuestion,
                surveyEditable,
                editQuestionActions,
                questionsActions
            };
            return (<EditQuestion {...editProps} />);
        } else if (orderPage.length > 0) {
            const editProps = {
                questions,
                orderPage,
                orderPageActions,
                questionsActions
            };
            return (<OrderPage {...editProps} />);
        } else if (editPage.hasOwnProperty('page') && editPage.page > 0) {
            const editProps = {
                editPage,
                editPageActions,
                questionsActions
            };
            return (<EditPage {...editProps} />);
        }
        return '';
    }

    _moveQuestion(id, aftPage, aftIndex) {
        const { questionsActions } = this.props;
        const { question, page, index } = this._getQuestion(id);
        if (index !== aftIndex || page !== aftPage) {
            questionsActions.exchangeQuestion(page, index, aftPage, aftIndex, question);
        }
    }

    _getQuestion(id) {
        const { questions } = this.props;
        let page;
        let index;
        let question;
        let flag = false;
        for (const obj of questions) {
            for (const que of obj.question) {
                if (que.id === id) {
                    question = que;
                    page = obj.page;
                    index = obj.question.indexOf(question);

                    flag = true;
                    break;
                }
            }
            if (flag) break;
        }
        return {
            question,
            page,
            index
        };
    }

    _onAddPageClick() {
        const { questions, questionsActions } = this.props;
        const page = questions.length + 1;
        questionsActions.addPage(page);
        // save Question
        questionsActions.saveQuestion();
    }

    _onNotEditableClick() {
        const { popupActions } = this.props;
        popupActions.setPopup('notEditableAdmin');
    }
}

export default DragDropContext(HTML5Backend)(Design);
