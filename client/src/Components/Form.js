import axios from "axios";
import React, { useRef, useState } from "react";
import InputMask from 'react-input-mask';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/form.css";
import { post } from "../Util/axios";
import { formSchema } from "../Util/zod";


export const Form = () => {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const currentRequest = useRef(null);
  
    const handleNumberChange = (e) => {
      e.preventDefault()
      const value = e.target.value;
      setNumber(value.replace(/[^0-9]/g, ''))
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrors({})
      toast.dismiss();
      try {
        formSchema.parse({email, number})
        setLoading(true)

        if (currentRequest.current) {
          currentRequest.current.abort();
        }

        const controller = new AbortController();
        currentRequest.current = controller;

        const data = await post(`${process.env.REACT_APP_BACKEND_URL}/api/search`, {
          email,
          number: number.replace(/-/g, ""),
        }, {
          signal: currentRequest.current.signal
        });

        if(Array.isArray(data) && data.length > 0) {
          setResponseData(data);
        }
        else {
          setResponseData([])
        }

        setLoading(false)
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
          toast.info('Previous request was canceled.');
        } 
        else {
          if(err.errors) {
            const newErrors = { email: '', number: '' };
            err.errors.forEach((error) => {
                if (error.path[0] === 'email') {
                    newErrors.email = error.message;
                } else if (error.path[0] === 'number') {
                    newErrors.number = error.message;
                }
            });
            setErrors(newErrors); 
        toast.error(Object.values(newErrors).join(' '));
          } else {
            console.error(err);
            toast.error(`Failed to fetch data from the server: ${err.message}`);
          }
        }
      }
    };

  
    return (
      <div className="App">
        <h1>Find People from JSON</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: errors.email ? 'red' : '#ccc' }}
            />
          </div>
          <div className="form-group">
            <label>Number (Optional):</label>
            <InputMask
                mask="99-99-99" 
                value={number}
                onChange={handleNumberChange}
                placeholder="Enter phone number"
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        <ToastContainer />
  
        <ClipLoader
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <pre>
        {responseData.length > 0 ? (
          <div className="response">
            <h2>Found People</h2>
              <ul className="people-list">
              {responseData.map((person, index) => (
                <li key={index} className="person-item">
                  <div className="person-details">
                    <h3>{person.name}</h3>
                    <p><strong>Email:</strong> {person.email}</p>
                    {person.number && <p><strong>Number:</strong> {person.number}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : "Found none."}
        </pre>
      </div>
    );
  }  