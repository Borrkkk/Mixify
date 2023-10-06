
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Dashboard from './Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <Dashboard code={code} style={{height:"100vh", width:"100vw"}} /> : <Login/>
}

export default App;
