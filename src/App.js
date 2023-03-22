import { useEffect, useState } from 'react';
import './App.css';


function App() {

const [adviceObject, setAdviceObject] = useState('')
const [width, setWidth] = useState(window.innerWidth > 960)
const [loading, setLoading] = useState(true)
 
const getAdvice = async() => {
  setLoading(true)
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();
  const adviceObject = data.slip;
  setAdviceObject(adviceObject)
  setLoading(false)
}

const updateMedia = () => {
  setWidth(window.innerWidth > 960);
};

useEffect(() => {
  window.addEventListener("resize", updateMedia);
  return () => window.removeEventListener("resize", updateMedia);
});
 
useEffect(() => {
  getAdvice();
}, []);

  return (
    <div className='main'>
      <div className='main__number'>ADVICE #{adviceObject.id}</div>
      <div className='main__advice'>"{!loading ? adviceObject.advice : 'Loading...'}"</div>
      <img className='main__divider' src={width ? './pattern-divider-desktop.svg' : './pattern-divider-mobile.svg'} alt='divider' />
      <button className='main__button' onClick={() => getAdvice()}><img src='./icon-dice.svg' alt='dice ' /></button>
    </div>
  );
}

export default App;
