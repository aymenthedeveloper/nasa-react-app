import { useEffect, useState } from "react"
import Footer from "./compnents/Footer"
import Main from "./compnents/Main"
import Sidebar from "./compnents/Sidebar"

function App() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false)

  useEffect(()=>{
    const today = new Date().toDateString()
    const localKey = `nasa-${today}`
    let localData = localStorage.getItem(localKey);
    if (localData){
      localData = JSON.parse(localData);
      setData(localData)
      return;
    }
    localStorage.clear();
    
    async function fetchData(){
      const KEY = import.meta.env.VITE_API_KEY
      const url = `https://api.nasa.gov/planetary/apod?api_key=${KEY}`;
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        setData(apiData)
        localStorage.setItem(localKey, JSON.stringify(apiData));
      } catch (error) {
        console.log(error.message)
      }
      
    }
    fetchData();
  }, [])

  function toggleModal(){
    setShowModal(!showModal)
  }
  return (
    <>
      {data? (<Main data={data}/>): (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && <Sidebar data={data} toggleModal={toggleModal} />}
      {data && <Footer toggleModal={toggleModal} data={data}/>}
    </>
  )
}

export default App
