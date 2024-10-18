import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import './App.css';

const makeRequest = async (prompt) => {
  const res = await axios.post('http://localhost:3000/generate', { prompt });
  return res.data;
};

function App() {
  const [prompt, setPrompt] = useState('');
  const mutation = useMutation({
    mutationFn: makeRequest,
    mutationKey: ['makeRequest-gemini-ai'],
    onError: (error) => {
      console.error('Error occurred:', error);
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };

  console.log(mutation.data);

  return (
    <>
      <div className="App">
        <header className="App-header">Gemini AI Content Generator</header>
        <p>Enter a prompt and let Gemini AI generate unique content for you.</p>
        <form className='App-form' onSubmit={submitHandler}>
          <label htmlFor="prompt" className='App-label'>Enter your prompt:</label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            className='App-input'
          />
          <button className='App-button' type="submit">Generate Content</button>
        </form>
        {mutation.isLoading && <p>Loading...</p>}
        {mutation.isError && <p>An error occurred: {mutation.error.message}</p>}
        {mutation.isSuccess && <p>Generated Content: {JSON.stringify(mutation.data)}</p>}
      </div>
    </>
  );
}

export default App;
