import { Formik } from 'formik';
import React from 'react';
import './index.css'



const FormLibrary = () =>{

    const [lists, setLists] = React.useState([])

    const [updatingIndex, setUpdatingIndex] = React.useState(-1);

    const handleFormSubmit = (formValues, formik) => {
        const currentLists = [...lists]
        currentLists.push(formValues)
        setLists(currentLists)
        formik.resetForm()
      }

      const handleEdit = (editedList, callbacks) => { 
        const editedListIndex = lists.findIndex(list => list.number === editedList.number &&
          list.title === editedList.title && 
          list.number === editedList.number
        )
        setUpdatingIndex(editedListIndex)
        callbacks.setFieldValue('title', editedList.title)
        callbacks.setFieldValue('number', editedList.number)
        
    }

    const handleUpdate = (values,formik) => { 
        const updatedLists = [...lists]
        updatedLists[updatingIndex] = values
        setLists(updatedLists) 
        setUpdatingIndex(-1)
      }

      const handleDelete = (list) => {
        const updatedLists = [...lists];
        updatedLists.splice(lists.indexOf(list), 1);
        setLists(updatedLists);
      };

    return(
        <>
        <h1>Library lists</h1>
      <Formik
        initialValues={{
          title: '',
          number: '',
        }}

        onSubmit={handleFormSubmit}
      >
        {({ handleChange, values, handleSubmit, setFieldValue,  }) => (
          <>
            <div>
              <div>
                <label>Tieu de </label>
                <input type='text' name="title" onChange={handleChange} value={values.title} />
              </div>
              <div>
                <label>So luong </label>
                <input type="number" name="number" onChange={handleChange} value={values.number}  />
              </div>

              {updatingIndex >= 0 ?  <button onClick={() => handleUpdate(values)}>Update</button> :  <button type="button" onClick={handleSubmit}>Submit</button>}
            </div>
            <table>
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Number</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {lists.map(list => (
                  <tr key={list?.number}>
                    <td>{list?.title}</td>
                    <td>{list?.number}</td>
                    <td>
                      <button onClick={() => handleEdit(list, {setFieldValue})}>Edit</button>
                      <button onClick={() => handleDelete(list)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
          )}
        
      </Formik> 
        </>
    )
}


export default FormLibrary