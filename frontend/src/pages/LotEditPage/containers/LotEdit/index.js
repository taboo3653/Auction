import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FormTextField, ImagesInput, Loader } from '../../../../components'
import { Formik } from 'formik'
import  DatePicker  from 'react-datepicker'
import { addDays } from 'date-fns'
import { connect } from 'react-redux'
import { fetchCreateLot, fetchLotEditById, removeLotEdit } from '../../../../redux/actions' 

import "react-datepicker/dist/react-datepicker.css";

import "./index.scss"

const LotEdit = ({
    history,location, 
    userId, 
    lotId,name, minStep, startPrice, description, initImages, initFinishTime,
    fetchCreateLot, fetchLotEditById, removeLotEdit
    }) => {

    const [images, setImages] = useState(initImages);
    const [finishTime, setFinishTime] = useState(initFinishTime);
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(() => {
        const tokens = location.pathname.split('/');
        if(tokens[tokens.length-2] === "lot-edit" && tokens[tokens.length-1] !== '')
        {      
            setIsLoading(true);
            fetchLotEditById(tokens[tokens.length-1])
            .catch(() =>
                history.push("/404")        
                )
            .finally(() => setIsLoading(false)); 
        }
            return () => {  removeLotEdit(); };
    }, [location, fetchLotEditById, removeLotEdit, history]);
    
    useEffect(() => {
        setImages(initImages.map((val) => ({isLoading:false, src: val})));
        setFinishTime(initFinishTime);
    },[initImages,initFinishTime])

    return (
    (isLoading)?
    <Loader />:
        <Formik
        initialValues={{ name, minStep, startPrice, description }}

        validate={(values) => {
            let errors = {};


            for(let key of Object.keys(values))
               values[key] = values[key].trim();


            if (!values.name)
                errors.name = 'Пусто';
            else if (!/^[0-9A-Za-zА-Яа-я ]{3,}$/i.test(values.name))
                errors.name = 'Название слишком короткое или имеет недопустимые символы';


                
            if (!values.startPrice)
            errors.startPrice = 'Пусто';

            if (!values.description)
                errors.description = 'Пусто';

            return errors;
        }}

        onSubmit={(values, actions) => {
            actions.setSubmitting(true)
            for(let key of Object.keys(values))
                values[key] = values[key].trim(); 
            
            fetchCreateLot({
                name: values.name,
                description: values.description,
                creator: userId,
                startPrice: Number(values.startPrice),
                minStep: Number(values.minStep),
                finishTime: finishTime,
                images: images.map((value) => value["src"])
            }, lotId)
            .then((response) =>  { history.push("/lots/"+response.data._id)})
            .catch((err) => console.log(err.response)) 
            .finally(() => actions.setSubmitting(false))
           
        }
        }
        render={({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            errors,

        }) => (
        <section className = "lot-edit container">
          
                <h1>Редактирование лота</h1>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Название лота</Form.Label>
                        <FormTextField type="text" 
                            placeholder="Введите название лота"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors.name}
                            errorStyle = {FormTextField.errorStyles.bottom}
                            isInvalid={touched.name && !!errors.name}
                            value={values.name}
                            name = "name"
                        />
                    </Form.Group>

                    <Form.Group controlId="minStep">
                        <Form.Label>Минимальный шаг</Form.Label>
                        <Form.Control  
                            as="select"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.minStep}
                            name = "minStep"
                            >
                            <option value="1">1 BYN</option>
                            <option value="5">5 BYN</option>
                            <option value="10">10 BYN</option>
                            <option value="20">20 BYN</option>
                            <option value="50">50 BYN</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId ="startPrice">
                        <Form.Label>Стартовая цена, BYN</Form.Label>
                        <FormTextField
                            type="text" 
                            placeholder="Введите стартовое значение"
                            onChange={(e) =>{
                                if(/^[1-9][0-9]*$/.test(e.target.value) || e.target.value ==='')
                                handleChange(e);
                            }}
                            errors={errors.startPrice}
                            errorStyle = {FormTextField.errorStyles.bottom}
                            onBlur={handleBlur} 
                            value={values.startPrice}
                            isInvalid={touched.startPrice && !!errors.startPrice}

                            name="startPrice"
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Описание лота</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3" 
                            placeholder="Введите описание"
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            value={values.description}
                            isInvalid={touched.description && !!errors.description}
                            name="description"
                        />
                    </Form.Group>

                    <Form.Group controlId="images">
                        <Form.Label>Изображения лота</Form.Label>
                        <ImagesInput name="images" images={images} setImages={setImages}/>
                    </Form.Group>

                    <Form.Group controlId="finishTime">
                        <Form.Label>Время завершения</Form.Label>
                        <DatePicker
                            className ="form-control"
                            showPopperArrow={false}
                            minDate={addDays(new Date(),1)}
                            selected={finishTime}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            timeCaption="time"
                            dateFormat="dd/MM/yyyy HH:mm"
                            onChange={date => setFinishTime(date)}
                        />                
                    </Form.Group>
                    

                    <Button 
                        variant="primary" 
                        type="submit"
                        disabled={isSubmitting}
                        >
                        Подтвердить
                    </Button>
                </Form>
            
        </section>
    
        )} />
            )}


export default connect(({user, lotEdit}) =>({
    userId: user.data && user.data._id,
    lotId : lotEdit.item && lotEdit.item._id,
    name: (lotEdit.item) ? lotEdit.item.name.toString() : '',
    minStep: (lotEdit.item) ? lotEdit.item.minStep.toString() : '1',
    startPrice: (lotEdit.item) ? lotEdit.item.startPrice.toString() : '',
    description: (lotEdit.item) ? lotEdit.item.description.toString() : '',
    initImages: (lotEdit.item) ? Array.from(lotEdit.item.images) : [],
    initFinishTime: (lotEdit.item) ? new Date(lotEdit.item.finishTime) : addDays(new Date(),1),

}),{ fetchCreateLot, fetchLotEditById, removeLotEdit})(LotEdit);
