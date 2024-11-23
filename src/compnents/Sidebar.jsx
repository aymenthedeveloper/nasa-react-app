import React from 'react'

export default function Sidebar(props) {
  const {data, toggleModal} = props;
  return (
    <div className='sideBar'>
      <div className="bgOverlay"></div>
      <div className="sidebarContents">
        <h2>{data?.title}</h2>
        <div className='descriptionContainer'>
          <p className='descriptionTitle'>{data?.date}</p>
          <p>{data?.explanation}</p>
        </div>
        <button onClick={toggleModal}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}
