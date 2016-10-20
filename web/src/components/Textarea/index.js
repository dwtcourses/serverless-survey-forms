/**
 * @module Textarea
 *
 *  {'type': 'textarea',
 *   'label': 'I am multiple line text'
 *  }
 **/

// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import I18Next from 'i18next';

import Question from '../Question/index';
import Error from '../Error';

class Textarea extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            input: false
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
        this._checkDone = this._checkDone.bind(this);
    }

    render() {
        const { id, item, itemID, feedbackActions, pageDone } = this.props;
        const rows = item.rows ? item.rows : 3;
        return (
            <div ref="root" className="question">
                <Question
                    id={id}
                    text={item.label}
                    required={item.required}
                >
                    {!feedbackActions.checkDone(itemID) && pageDone !== 'init' ?
                        <Error msg={I18Next.t('error_required')} /> : ''}
                </Question>
                <div>
                    <textarea
                        id={`textarea_${id}`}
                        placeholder={item.input}
                        rows={rows}
                        className={styles.textarea}
                        onChange={this._onChangeHandle}
                        value={this.state.input ? this.state.input : ''}
                    />
                </div>
            </div>
        );
    }

    _onChangeHandle(e) {
        this.setState({
            input: e.currentTarget.value
        }, () => {
            const feedbackArray = [
                {
                    input: this.state.input ? this.state.input : false
                }
            ];
            const feedback = {
                [`Q${this.props.id}`]: {
                    type: 'textarea',
                    label: this.props.item.label,
                    data: feedbackArray
                }
            };
            this.props.onChangeHandle(feedback);
            // Update complete status
            const done = this._checkDone();
            this.props.feedbackActions.updateRequired(this.props.id, done);
        });
    }

    _checkDone() {
        if (this.state.input) {
            return true;
        }
        return false;
    }
}

Textarea.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Textarea.defaultProps = {};

export default Textarea;
