import { useFormik } from 'formik';
import React from 'react';
const NewTestFile = () => {
    const formik = useFormik({
        initialValues:{
            fName:''
        }
    })


    return <div>

        <form onSubmit={formik.handleSubmit}>
            <div className="inputs">
                <input type="text" name='fName' value={formik.values.fName} onChange={formik.handleChange} />

                <button>
                    Submit <data value=""></data>
                </button>
            </div>

        </form>
    </div>;
}


export default NewTestFile;