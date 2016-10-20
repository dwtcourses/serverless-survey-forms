
import React from 'react';
import PureComponent from 'react-pure-render/component';

import GeneralBox from '../GeneralBox';
import Button from '../../Button';

class Confirm extends PureComponent {

    constructor() {
        super();

        this._renderText = this._renderText.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._btnYesHandler = this._btnYesHandler.bind(this);
        this._btnNoHandler = this._btnNoHandler.bind(this);
    }

    render() {
        return (<GeneralBox
            renderText={this._renderText}
            renderFooter={this._renderFooter}
            closeHandler={this._btnNoHandler}
        />);
    }

    _renderText() {
        const { popup } = this.props;
        // message is an object records every confirmed action
        // its key should correspond with 'popup'
        const message = {
            deleteOneSurvey: 'Do you really want to delete this survey?',
            deleteAllFeedbacks: 'Do you really want to clear all feedbacks in this survey?'
        };
        return (<div>{message[popup]}</div>);
    }

    _renderFooter() {
        const style = { margin: '0 4px', display: 'inline-block' };
        return (
            <div style={{ margin: '0', display: 'block' }}>
                <Button
                    string="Yes"
                    i18nKey={false}
                    color="ruby"
                    onClick={this._btnYesHandler}
                    extraProps={{ style: style }}
                />
                <Button
                    string="No"
                    i18nKey={false}
                    color="ruby"
                    onClick={this._btnNoHandler}
                    extraProps={{ style: style }}
                />
            </div>
        );
    }

    _btnYesHandler() {
        const { popup, popupActions, surveysActions } = this.props;
        if (popup === 'deleteOneSurvey') {
            surveysActions.deleteSurvey();
            popupActions.closePopup();
        } else if (popup === 'deleteAllFeedbacks') {
            surveysActions.deleteAllFeedbacks();
            popupActions.closePopup();
        }
    }

    _btnNoHandler() {
        const { popupActions } = this.props;
        popupActions.closePopup();
    }
}

export default Confirm;
