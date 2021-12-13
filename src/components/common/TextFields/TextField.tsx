import React from "react";
import styles from "./TextArea.module.css"

// @ts-ignore
export const TextArea = ({input, meta, ...props}) => {

    const hasError = meta.error && meta.touched

    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ""}`}>
            <textarea {...input} {...props}/>
            <div>
                {meta.error && meta.touched ? <span>From 2 to 10 symbols</span> : ""}
                <span>{meta.error}</span>
            </div>
        </div>
    )
}

// @ts-ignore
export const Input = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ""}`}>
            <input {...input} {...props}/>
            <div>
                {meta.error && meta.touched ? <span>From 2 to 10 symbols</span> : ""}
                <span>{meta.error}</span>
            </div>
        </div>
    )
}