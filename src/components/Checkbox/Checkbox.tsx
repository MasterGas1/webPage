import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = () => {
    return (
        <label className={styles.checkboxContainer}>
            <input type="checkbox" aria-label='option' />
            <span className={styles.labelText} />
            Hola
        </label>
    );
};

export default Checkbox;
