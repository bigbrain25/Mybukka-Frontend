import React, { useState, useEffect } from 'react';

import Fields from '../input/Field';
import Button from '../button/Button';
import inputField from './payment.json';
import Form from '../form/Form';
import useApi from '../../shared/api';
import { validateAField, validateAllFields } from './validation';

import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';
import TemporaryWrapper from '../../components/ViewWrappers/TemporaryWrapper';
import { useGlobalFormValidityRequestContext } from '../../context/GlobalFormValidityRequestContext';
import { useGlobalFormValidityReportContext } from '../../context/GlobalFormValidityReportContext';

const PaymentForm = ({ requestSecurityPopup, withPadding, label, withModal, handleClick, withFormSpace }) => {
  const { API } = useApi();
  const { loading, status } = useLoadingContext();
  const { setPayment } = useUserContext();
  const wrapperRef = React.createRef();
  const { paymentValidityReport } = useGlobalFormValidityRequestContext();
  const { setPaymentValidity } = useGlobalFormValidityReportContext();
  const [errorMessage, setErrorMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    number: '',
    expDate: '',
    cvv: '',
    zipCode: ''
  });

  const [inputData, setInputData] = useState({
    number: '',
    expDate: '',
    cvv: '',
    zipCode: ''
  });

  const _formatInput = (name, value) => {
    if (name === 'expDate' && value.length) {
      return value.replace(/(\d{2})(\d{1})/, '$1/$2');
    } else if (name === 'number' && value.length) {
      return value.replace(/(\d{4})(\d{4})/, '$1 $2');
    }
    return value;
  };

  const _removeInputFormat = (fieldData, name) => {
    if (name === 'expDate' && fieldData[name].length) {
      return { [name]: fieldData[name].replace('/', '') };
    } else if (name === 'number' && fieldData[name].length) {
      return { [name]: fieldData[name].split(' ').join('') };
    }
    return fieldData;
  };

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: _formatInput(name, value) };
    const validation = validateAField(_removeInputFormat(newFieldData, name), name);
    setInputData({ ...inputData, ...newFieldData });
    setValidationErrors({ ...validationErrors, [name]: validation.message });
  };

  const _removeInputsFormatOnSubmit = () => {
    const newInputData = {};
    Object.keys(inputData).map((inp) => { // eslint-disable-line
      const completeField = { [inp]: inputData[inp] };
      newInputData[inp] = _removeInputFormat(completeField, inp)[inp];
    });
    return newInputData;
  };

  const splitExpMonthAndYear = (inputFields) => {
    const expDateArr = inputData.expDate.split('/');
    return { ...inputFields, expiry_month: expDateArr[0], expiry_year: expDateArr[1] };
  };

  useEffect(() => {
    if (!paymentValidityReport) return;
    let inputFields = _removeInputsFormatOnSubmit();
    const validation = validateAllFields(inputFields);
    inputFields = splitExpMonthAndYear(inputFields);
    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors });
    setPaymentValidity(passes);
  }, [paymentValidityReport]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let inputFields = _removeInputsFormatOnSubmit();
    const validation = validateAllFields(inputFields);
    inputFields = splitExpMonthAndYear(inputFields);
    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors });
    if (passes) {
      try {
        loading('PAYMENT', true);
        const response = await API.payment.post({ card: inputFields, amount: 100 }, 'charge');
        setPayment(response.data.data);
        if (withModal) handleClick();
        if (response.data.data) requestSecurityPopup();
      } catch (error) {
        setErrorMessage(error.response.data.message || '');
        loading('PAYMENT', false);
      }
    }
  };

  return (
    <div className={withPadding && 'mb-2 mt-4'}>
      {label && <TemporaryWrapper.ViewHeading noPadding text={label} />}
      <span className="text-danger font-size-11">{errorMessage}</span>
      <form id="payment" ref={wrapperRef} className={`border padding-20 ${withFormSpace ? 'mt-2' : 'mt-4'}`}>
        <div className="row flex- flex-nowrap-sm font-size-14">
          <Form
            inputData={inputData}
            inputField={inputField}
            handleChange={handleChange}
            errors={validationErrors}
          />
        </div>
        <div className="form-group Payment-Checkox-Wrapper">
          <Fields.Checkbox
            type="checkbox"
            classNames="checkbox"
            placeholder=""
            value=""
            checked
            name="makeDefaultPaymentOption"
            onChange={() => {}}
            onFocus={() => {}}
          />
          <span className="Payment-Checkox--text">Make default payment method</span>
        </div>
        <div>
          <Button
            type="button"
            classNames="small-button-save"
            handleClick={handleSubmit}
          >
            {status ? <span className="spinner-border" role="status" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;

PaymentForm.propTypes = {};