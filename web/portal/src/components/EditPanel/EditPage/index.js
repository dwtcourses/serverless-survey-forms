
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

import * as values from '../../../constants/DefaultValues';
import Mixins from '../../../mixins/global';
import Button from '../../Button';

class EditPage extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
        this._handleChangeEvent = this._handleChangeEvent.bind(this);
        this._handleEditModeClick = this._handleEditModeClick.bind(this);
    }

    componentDidMount() {
        Mixins.fixScrollbar();
        $('#editModal').on('click', this._handleEditModeClick);
    }

    componentWillUnmount() {
        Mixins.freeScrollbar();
        $('#editModal').off('click', this._handleEditModeClick);
    }

    _handleEditModeClick(e) {
        const target = e.target;
        const hint = document.getElementsByClassName('js-hint');
        if (target.getAttribute('id') === 'editModal') {
            hint[0].style.display = 'block';
        } else {
            hint[0].style.display = 'none';
        }
    }

    render() {
        const { editPage } = this.props;
        const description = editPage.description === ' ' ? '' : editPage.description;
        return (
            <div id="editModal" className="modalEditPanel">
                <div id="editPanel" className="editpanel">
                    <div className="edit">
                        <div className="editContent">
                            <div className={styles.item}>
                                <div className={styles.title}>Page {editPage.page}:</div>
                                <div className={styles.field}>
                                    <input
                                        id="pageTxt"
                                        type="text"
                                        value={description}
                                        placeholder={values.PAGE_TITLE}
                                        onChange={this._handleChangeEvent}
                                        className={`${styles.input} input input--medium`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="edit-hint shake js-hint" style={{ display: 'none' }}>
                            Please confirm your change
                        </div>
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
        );
    }

    _btnClickEvent(e) {
        const { editPageActions, questionsActions } = this.props;

        if (e.currentTarget.getAttribute('data-type') === 'cancel') {
            editPageActions.stopEditPage();
        } else if (e.currentTarget.getAttribute('data-type') === 'save') {
            // save editPage to Question
            questionsActions.editPageTitle();
            questionsActions.saveQuestion();
            editPageActions.stopEditPage();
        }
    }

    _handleChangeEvent(e) {
        const { editPageActions } = this.props;
        const data = { description: e.target.value };
        editPageActions.setEditPage(data);
    }
}

export default EditPage;
