import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import moment from 'moment';
import Categories from '../components/Categories';
import "../styles/components/_write.scss"


const Write = () => {
    const location = useLocation();
    const state = location.state;

    const [value, setValue] = useState(state?.description || '');
    const [title, setTitle] = useState(state?.title || '');
    const [files, setFiles] = useState([]);
    const [cat, setCat] = useState(state?.cat || '');
    const [existingImg,setExistingImg] = useState(state?.img ? state.img.split(','): []);
    const [filePreviews, setFilePreviews] = useState([]);
    const [loading, setLoading] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (state && state.img) {
            setExistingImg(state.img.split(','));
        }
    }, [state]);


    const upload = async () => {
        try {
            const formData = new FormData();
            for(const file of files) {
                formData.append("files", file)
            }
            const res = await axios.post("http://localhost:3000/api/upload", formData)
            return res.data

        }catch(err){
            console.log(err)
            return []
        }
    }


    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setFiles(prevFiles => [...prevFiles,...newFiles]);
        setFilePreviews(prevPreviews => [...prevPreviews, ...newPreviews])
        setLoading(prevLoading=> [...prevLoading, ...new Array(newFiles.length).fill(true)]);
    };

    const handleRemovePreview = (index) => {
        setFilePreviews(prevPreviews => prevPreviews.filter((el, i) => i !== index));
        setFiles(prevFiles => prevFiles.filter((el, i) => i !== index));
        setLoading(prevLoading => prevLoading.filter((el, i) => i !== index));
        setExistingImg(prevImgs => prevImgs.filter((el, i) => i !== index));
    };


    useEffect(() => {
        return () => {
            filePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [filePreviews]);

    const handleImageLoad = (index) => {
        setLoading((prevLoading) => {
            const newLoading = [...prevLoading];
            newLoading[index] = false;
            return newLoading;
        });
    };


    const handleClick = async e => {
        e.preventDefault()
        const newImgs = await upload()  
        const allImages = [...existingImg, ...newImgs];

        try{
            state ? await axios.put(`http://localhost:3000/api/posts/${state.id}`, {
                    title, 
                    description:value, 
                    cat, 
                    img: allImages,
                    }, {withCredentials: true}) : 
                        await axios.post(`http://localhost:3000/api/posts/`, {
                        title, 
                        description: value, 
                        cat, 
                        img: newImgs,
                        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                        }, {withCredentials: true})
        navigate("/");
        }catch(err){
console.error("Error:", err.response ? err.response.data : err.message)
        }
    }



    return (
        <div className="add">

            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e=> setTitle(e.target.value)}/>
                <div className="editorContainer">
                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>

            <div className="menu">

            <div className="item">
               
                <input style={{display: "none"}} type="file" name=""id="file" multiple onChange={handleFileChange}/>
                <label className="file" htmlFor="file">Select Images</label>

                <div>
                {existingImg.length > 0 && existingImg.map((item,index)=>(
                    <div className="img_preview" key={index}>
                        <img
                        src={`../upload/${item}`}
                        alt={`existing ${index}`}
                    />
                    <button
                                    onClick={() => handleRemovePreview(index)}
                                    
                                >
                                    X
                                </button>
                    </div>))}

                {filePreviews.map((preview, index) => (
                    <div className="img_preview" key={index}>
                    <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index}`}
                        style={{ display:  loading[index]?"none":"block"}}
                        onLoad={()=>handleImageLoad(index)}
                    />
                    <div 
                    className="spinner" 
                    style={{
                        display: loading[index]?"block":"none",
                        }} ></div>

                    <button
                                    onClick={() => handleRemovePreview(index)}
                                    style={{  display:  loading[index]? "none" : "block"}}
                                >
                                    X
                                </button>
                                
                    </div>
                ))}
                </div>
            </div>
            <div className="categories">
                <h1>Post category</h1>
            <Categories selectedCategory={cat}
                        onCategoryChange={setCat}/> 
            </div>
             
                
                    <button className="button-publish" onClick={handleClick}>Publish</button>

            </div>
        </div>
    )
}

export default Write