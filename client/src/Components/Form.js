import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/form.css";
import { post } from "../Util/axios";
import { env } from "../Util/env";
import { formSchema } from "../Util/zod";


export const Form = () => {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [errors, setErrors] = useState({})
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrors({})
      toast.dismiss();
      try {
        formSchema.parse({email, number})
        const data = await post(`${env.BACKEND_URL}/api/search`, {
          email,
          number,
        });
  
        setResponseData(data);
      } catch (err) {
        if (err.errors) {
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
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter phone number"
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        <ToastContainer />
  
        {responseData && (
          <div className="response">
            <h2>Found People</h2>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }  