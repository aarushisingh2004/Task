import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Call the backend API
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => {
        console.log(data); // optional for debugging
        setMessage(data);
      })
      .catch((error) => console.error('Error fetching:', error));
  }, []);

  return (
    <div>
      <h1>Hello from App</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
