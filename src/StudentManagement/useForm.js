import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    validateName,
    validatePhone,
    validateEmail,
} from "../Validation/Validation";

const useForm = (initialValue) => {
    const [values, setValues] = useState(initialValue);

    const handleChange = (evt) => {
        const { value, name } = evt.target;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const { selectedStudent } = useSelector((state) => state.student);

    useEffect(() => {
        setValues(selectedStudent);
    }, [selectedStudent]);

    const handleSubmit = (onSuccess, onError, onUpdate) => {
        // return về một function
        let isValid = true;
        const name = values.name;
        const email = values.email;
        const phonenumber = values.phone;
        const namevalidate = /^([A-z ]*)$/g;
        const emailvalidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phonevalidate = /((09|03|07|08|05)+([0-9]{8})\b)/g;

        isValid &= validateName("Họ và tên", name, namevalidate);
        isValid &= validateEmail("email", email, emailvalidate);
        isValid &= validatePhone(
            "số điện thoại",
            phonenumber,
            9,
            12,
            phonevalidate,
        );

        if (!selectedStudent.id) {
            return (evt) => {
                evt.preventDefault();

                if (isValid) {
                    onSuccess(values);
                    setValues({
                        id: "",
                        name: "",
                        phone: "",
                        email: "",
                    });
                } else {
                    onError();
                }
            };
        } else {
            return (evt) => {
                evt.preventDefault();
                if (isValid) {
                    onUpdate(values);
                    setValues({
                        id: "",
                        name: "",
                        phone: "",
                        email: "",
                    });
                } else {
                    onError();
                }
            };
        }
    };

    return { values, handleChange, handleSubmit };
};

export default useForm;
