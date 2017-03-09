import DomMock from '../../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SubscriberList from '../../../portal/src/components/SubscriberList';

DomMock('<html><body></body></html>');

describe('[Portal] Testing SubscriberList Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        subscribers: ['aaa@aa.com' , 'bbb@bb.com', 'ccc@cc.com'],
        subscribersActions: {
            getSubscribers: () => {}
        },
        popupActions: {}
    };
    const content = TestUtils.renderIntoDocument(
        <SubscriberList {...props} />
    );

    it('subscriber list: count subscriber\'s number', () => {
        const list = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-email');
        expect(list.length).toEqual(3);
    });
});
