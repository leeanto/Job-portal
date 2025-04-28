function App() {
  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000');
      const data = await response.text();
      console.log('Backend response:', data);
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <div>
      <h1>Job Portal Frontend</h1>
      <button onClick={testConnection}>Test Backend Connection</button>
    </div>
  );
}

export default App;