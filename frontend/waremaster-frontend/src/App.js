import './App.css';
import Auth from './components/Auth';

function App() {

  const divStyle = {
    backgroundImage: 'url("/storage_backg_blue.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh'
  };

  return (
    <div style={divStyle}>
      <Auth/>
    </div>
  );
}

export default App;
