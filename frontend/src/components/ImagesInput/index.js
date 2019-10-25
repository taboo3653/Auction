import React, { useRef} from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {ImagesInputItem} from '../'
import axios from "axios";
import './index.scss'


const ImagesInput = ({name,images,setImages}) => {

    const formRef = useRef(null);
    const unsignedUploadPreset = "zsqm1smk";
    const handleChange = (event) => {
        const file = event.target.files[0]

        if(file.size < 3000000 && file.type.slice(0,5) === 'image')
            uploadFile(event.target.files[0]);
        
            event.target.value = "";
    }

    const uploadFile = (file) => {

        const imageObj = {
            isLoading: true,
            src: ''
        }
        setImages([...images, imageObj]);


        const url = `https://api.cloudinary.com/v1_1/dxwbqhcbq/upload`;
        const fd = new FormData();
        fd.append("upload_preset", unsignedUploadPreset);
        fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
        fd.append("file", file);
        const config = {
        headers: { 
              "X-Requested-With": "XMLHttpRequest",
        },
          onUploadProgress: function(progressEvent) {
          
          }
        };
        axios.post(url, fd, config)
                  .then(function (res) {
                    
                    const response = res.data;
                    const url = response.secure_url;
    
                    imageObj.isLoading = false;
                    imageObj.src = url;
                    setImages([...images, imageObj]);
                
                  })
                  .catch(() => {
                        setImages(images.filter(val => val !== imageObj));
                  });
      
      }

    const handleRemove = (index) => {
        setImages(images.filter((val,key)=> key !== index ))
    }

    return (
        <div className="images-input info-block">
            <div className="images-input__form custom-file">
                <input 
                    type="file"
                    name = {name}
                    className="custom-file-input " 
                    id="customFile"
                    ref = {formRef}
                    onChange = {handleChange}   
                />
                <label className="custom-file-label" htmlFor="customFile">Выберите файлы</label>
            </div>

            {(images.length !== 0) ?
                <div className="images-input__files">
                    <Row>
                        {
                            images.map((value,index) => { 
                                return (
                                <Col key={index}  xs={6} md={4}>
                                    <ImagesInputItem index = {index} imageSrc = {value.src} isLoading ={value.isLoading} handleRemove = {handleRemove} />
                                 </Col>
                                )
                            })
                        }
                    </Row>
                </div>:''
            }
        </div>
        )

}


export default ImagesInput;



