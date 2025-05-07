import React, { useEffect, useRef, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline, IoCloseCircle } from "react-icons/io5";

import styles from "./Input.module.css";

import { InputProps } from "./InputProps";

const Input: React.FC<InputProps> = ({
  label,
  value,
  variants = "bordered",
  required,
  type = "text",
  isClearable,
  isError,
  radius = "none",
  inputBackgroundColor,
  activeLabelColor,
  errorMessage,
  onClear,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [typeInput, setTypeInput] = useState(type);
  const [valueAux, setValueAux] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const variantsClasses = {
    bordered: {
      groupInputContainer: styles.groupInputContainerContained,
      inputField: null,
    },
    flat: {
      groupInputContainer: styles.groupInputContainerFlat,
      inputField: styles.formInputFieldFlat,
    },
    underlined: {
      groupInputContainer: null,
      inputField: styles.formInputFieldUnderline,
    },
  };

  const errorVariantsClasses = {
    bordered: {
      groupInputContainer: styles.groupInputContainerContainedError,
      inputField: null,
    },
    flat: {
      groupInputContainer: styles.groupInputContainerFlatError,
      inputField: styles.formInputFieldFlatError,
    },
    underlined: {
      groupInputContainer: null,
      inputField: styles.formInputFieldUnderlineError,
    },
  };

  const radiusVariantsClasses = {
    none: null,
    sm: styles.radiusSm,
    md: styles.radiusMd,
    lg: styles.radiusLg,
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (valueAux !== value) {
      setValueAux(value);
    }
  }, [value]);

  return (
    <div>
      <div
        className={`${styles.groupInputContainer} ${
          variantsClasses[variants].groupInputContainer
        } ${
          variants === "bordered" &&
          isError &&
          errorVariantsClasses[variants].groupInputContainer
        } ${radiusVariantsClasses[radius]}
        `}
        style={{
          backgroundColor: inputBackgroundColor,
        }}
        onClick={handleFocus}
      >
        <input
          className={`${styles.formInputField} ${
            variantsClasses[variants].inputField
          } ${isError && errorVariantsClasses[variants].inputField}`}
          placeholder={label}
          ref={inputRef}
          type={typeInput}
          value={valueAux}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setValueAux(e.target.value);
            onChange(e);
          }}
        />

        {isClearable && value && value !== "" && (
          <IoCloseCircle
            className={styles.clearIcon}
            style={{
              right: type === "password" ? "40px" : "10px",
            }}
            onClick={(event) => {
              event.stopPropagation();
              setValueAux("");
              onClear && onClear();
            }}
          />
        )}

        {type === "password" &&
          typeInput === "password" &&
          value &&
          value !== "" && (
            <IoEyeOutline
              className={styles.eyeIcon}
              onClick={(event) => {
                event.stopPropagation();
                setTypeInput("text");
              }}
            />
          )}

        {type === "password" &&
          typeInput === "text" &&
          value &&
          value !== "" && (
            <IoEyeOffOutline
              className={styles.eyeIcon}
              onClick={(event) => {
                event.stopPropagation();
                setTypeInput("password");
              }}
            />
          )}
        <label
          className={`${styles.formLabelInput} ${
            isError && styles.formLabelInputError
          }`}
          style={{
            color: isFocused ? activeLabelColor : undefined,
          }}
        >
          {label}
          {required && <span className={styles.requiredLabelInput}> *</span>}
        </label>
      </div>

      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
