import { useState, useEffect } from 'react';

const useFormData = (formsArr) => {
    // pass a json struct
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        setFormData(formsArr)
    }, [formsArr])

    return formData;
}

export default useFormData;