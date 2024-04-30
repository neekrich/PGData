import './App.css';
import { AgencyData } from './components/Agency';
import { CategoryData } from './components/Category';
import { PayeeData } from './components/Payee';
import axios from 'axios'
import Intro from './components/Intro';

axios.get('https://data.princegeorgescountymd.gov/resource/sk5x-gxv7.json?$query=SELECT%20%60payee_name%60%2C%20%60agency%60%2C%20%60amount%60%2C%20%60payment_description%60%0AWHERE%20%60amount%60%20%3E%20%22100.00%22')
  .then(response => {console.log(response.data)})
  .catch(error => {console.log(error)})

function App() {
  return (
    <div className="App">
      <Intro />
      <AgencyData />
      < br></br>
      <CategoryData />
      <br></br>
      <PayeeData />
    </div>
  );
}

export default App;
