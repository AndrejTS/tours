import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Import() {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');

  const onChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('upfile', file);

    try {
      const res = await axios.post('http://localhost:8000/tours/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // onUploadProgress: (progressEvent) => {
        //   setUploadPercentage(
        //     parseInt(
        //       Math.round((progressEvent.loaded * 100) / progressEvent.total)
        //     )
        //   );
        // },
      });

      // // Clear percentage
      // setTimeout(() => setUploadPercentage(0), 10000);

      // const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });

      // setMessage('File Uploaded');
    } catch (err) {
      // if (err.response.status === 500) {
      //   setMessage('There was a problem with the server');
      // } else {
      //   setMessage(err.response.data.msg);
      // }
      // setUploadPercentage(0);
    }
  };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <Link to="/">
            <button>Overview</button>
          </Link>

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>XML file</Form.Label>
              <Form.Control
                type="file"
                placeholder="File name"
                onChange={onChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Import
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Import;
