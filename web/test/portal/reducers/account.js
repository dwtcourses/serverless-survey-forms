import expect from 'expect';
import account from '../../../portal/src/reducers/account';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] account reducer', () => {
    it('should handle account state for default value', () => {
        expect(
            account(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle account state', () => {
        expect(
            account({}, {
                type: types.RECEIVE_ACCOUNT_SUCCESS,
                account: {
                    accountid: 'facebook-xxxxxxx',
                    role: 'Designer',
                    username: 'User TM'
                }
            })
        ).toEqual({
            accountid: 'facebook-xxxxxxx',
            role: 'Designer',
            username: 'User TM'
        });
    });
});
