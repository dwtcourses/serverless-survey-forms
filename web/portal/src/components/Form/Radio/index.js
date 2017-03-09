
import React, { Component } from 'react';

import Question from '../Question';

class Radio extends Component {

    render() {
        const { data, onClick } = this.props;
        return (
            <div
                className="question"
                onClick={onClick}
            >
                <Question
                    id={data.order}
                    text={data.label}
                    required={data.required}
                />
                <div className="radioGrp">
                    {this._renderRadioItem()}
                </div>
            </div>
        );
    }

    _renderRadioItem() {
        const { data } = this.props;
        const items = data.data.map((itm, idx) => {
            const label = itm.label;
            const input = itm.input;
            return (
                <div
                    className="radioItem ut-radio"
                    key={idx}
                >
                    <input type="radio" />
                    <label>
                        {label}
                    </label>
                    {
                        itm.hasOwnProperty('input') ?
                            <input
                                type="text"
                                className="input input--medium ut-input"
                                placeholder={input}
                            /> :
                            ''
                    }
                    <div className="subdescription">{itm.example || ''}</div>
                </div>
            );
        });
        return items;
    }
}

export default Radio;
