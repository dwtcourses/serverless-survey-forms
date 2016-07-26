
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import Button from '../Button';

class SubjectPop extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
    }

    render() {
        const { subject } = this.props;
        return (
            <div className={styles.popup}>
                <div className={styles.wrap}>
                    <button
                        type="button"
                        onClick={this._btnClickEvent}
                        className={`${styles.close} close`}
                        data-type="cancel"
                    >×
                    </button>
                    <div className={styles.content}>
                        <div className={styles.title}>What would you like to name this survey?</div>
                        <input
                            id="subject"
                            className={`${styles.input} input input--medium`}
                            type="text"
                            defaultValue={subject}
                            placeholder="Subject Name"
                            onChange={this._handleInput}
                        />
                        <div id="msg" className={`${styles.input__msg} input__msg`}></div>

                        <div className={`bottom ${styles.bottom}`}>
                            <Button
                                string="Save"
                                i18nKey={false}
                                color="ruby"
                                onClick={this._btnClickEvent}
                                extraProps={{ 'data-type': 'save' }}
                            />
                            <Button
                                string="Cancel"
                                i18nKey={false}
                                onClick={this._btnClickEvent}
                                extraProps={{ 'data-type': 'cancel' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _handleInput() {
        const msg = document.getElementById('msg');
        if (msg.innerHTML.length) msg.innerHTML = '';
    }

    _btnClickEvent(e) {
        const { surveyID, editSubjectActions, subjectActions } = this.props;
        const msg = document.getElementById('msg');
        msg.innerHTML = '';

        if (e.currentTarget.getAttribute('data-type') === 'cancel') {
            editSubjectActions.openEdit(false);
        } else if (e.currentTarget.getAttribute('data-type') === 'save') {
            const subject = document.getElementById('subject').value;
            if (subject === '') {
                msg.innerHTML = 'Please fill the subject';
            } else {
                if (!surveyID) {
                    subjectActions.saveSubject(subject);
                } else {
                    subjectActions.editSubject(subject);
                }
            }
        }
    }
}

export default SubjectPop;
