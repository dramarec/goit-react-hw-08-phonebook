import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import styles from './Phonebook.module.css';
import { Empty, Used } from '../natification/Natification';

import Form from '../form/Form';
import Layout from '../layout/Layout';

import ContactsList from '../contacts/ContactsList';
import FindContact from '../findContact/FindContact';
import { getContactOperations } from '../../redux/contacts/contactsOperations';
// import { setError } from '../../redux/contacts/contactsActions';

const Phonebook = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);
    const error = useSelector(state => state.reducerContacts.error);

    useEffect(() => {
        if (isAuth) {
            dispatch(getContactOperations());
        }
        // if (error) {
        //     dispatch(setError(''));
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const contacts = useSelector(state => state.reducerContacts.contacts);
    const showUsedAlert = useSelector(
        state => state.reducerContacts.showUsedAlert,
    );
    const showEmptyAlert = useSelector(
        state => state.reducerContacts.showEmptyAlert,
    );
    return (
        <>
            <Layout title="Phonebook">
                <Form />
            </Layout>

            {contacts.length > 1 && (
                <Layout title="Finder contacts">
                    <FindContact />
                </Layout>
            )}

            {contacts.length > 0 && (
                <Layout title="My Contacts">
                    <ContactsList />
                </Layout>
            )}
            {error && <Layout title="Something Wrong :(" />}

            {(!error && contacts.length > 0) || (
                <Layout title="Phonebook is empty. Please add contact" />
            )}

            <CSSTransition
                in={showEmptyAlert}
                timeout={250}
                classNames={styles}
                unmountOnExit
            >
                <Empty />
            </CSSTransition>

            <CSSTransition
                in={showUsedAlert}
                timeout={250}
                classNames={styles}
                unmountOnExit
            >
                <Used />
            </CSSTransition>
        </>
    );
};

export default Phonebook;
