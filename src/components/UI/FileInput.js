import styleClasses from './FileInput.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faFileImage } from '@fortawesome/pro-duotone-svg-icons'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

const FileInput = ({
    labelText = "Add File",
    buttonText = "Add File",
    className,
    id,
    multiple = false, 
    accept = "*"
}, ref) => {


    const fileInputRef = useRef()
    const [files, setFiles] = useState([])

    const handleFilesSelected = e => {

        console.log('log files', e.target.files)
        console.log('log value', e.target.value)
        setFiles([...e.target.files])

    }

    const removeAllFiles = () => {
        setFiles([])
        fileInputRef.current.value = ''
    }
    
    useImperativeHandle(ref, () => ({
        removeAllFiles
    }))
    
    const handleDeleteThisFile = (idx) => {
        setFiles(prevFiles => {
            const updatedFiles = [...prevFiles]
            updatedFiles.splice(idx, 1)
            //fileInputRef.current._value = updatedFiles
            const dataTransfer = new DataTransfer()
            updatedFiles.forEach(file => dataTransfer.items.add(file))
            fileInputRef.current.files = dataTransfer.files
            return updatedFiles
        })
    }

    const triggerAddFile = () => {
        fileInputRef.current.click()
    }

    //console.log('rendering file input component', files, files[0]?.name)
    return (
        <div className={`${styleClasses['file-input']} ${className}`}>
            <div>
                <label htmlFor={id}>{labelText}</label>
                <input
                    type="file"
                    multiple={multiple}
                    ref={fileInputRef}
                    id={id}
                    name={id}
                    onChange={handleFilesSelected}
                    accept={accept}
                />
            </div>
            <div>
                <div className={styleClasses['button-container']} onClick={triggerAddFile}>
                    <FontAwesomeIcon icon={faUpload} /> {buttonText}
                </div>

            </div>
            {files.map((file, i) => (
                <div className={styleClasses.file} key={`${i}${Math.random()}`}>
                    <FontAwesomeIcon icon={faFileImage} /> {file.name}
                    <div
                        className={styleClasses['delete-file']}
                        onClick={() => { handleDeleteThisFile(i) }}
                    >X</div>
                </div>
            ))}
        </div>
    )
}

export default forwardRef(FileInput)
