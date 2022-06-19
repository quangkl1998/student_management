import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
        if (!selectedStudent.id) {
            return (evt) => {
                evt.preventDefault();
                // Sử lý validation
                // Trường hợp hợp lệ => gọi tới 1 callback onSuccess
                // Trường hợp không hợp lệ => gọi tới 1 callback onError
                let isValid = true;
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
                function removeAscent(str) {
                    if (str === null || str === undefined) return str;
                    str = str.toLowerCase();
                    str = str.replace(
                        /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                        "a",
                    );
                    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
                    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
                    str = str.replace(
                        /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                        "o",
                    );
                    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
                    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
                    str = str.replace(/đ/g, "d");
                    return str;
                }
                var regexName = /^[a-zA-Z ]{2,}$/g;
                if (!regexName.test(removeAscent(selectedStudent.name))) {
                    console.log("Faild");
                } else {
                    console.log("OK");
                }
                // Sử lý validation
                // Trường hợp hợp lệ => gọi tới 1 callback onSuccess
                // Trường hợp không hợp lệ => gọi tới 1 callback onError
                let isValid = true;
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
