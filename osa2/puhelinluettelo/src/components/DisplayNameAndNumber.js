 import React from 'react'
 
 const DisplayNameAndNumberList = ({Objektilista, filtteri, ButtonClick}) => {
 

  let lista = []
  //console.log(Objektilista)
  const filtterointi = Objektilista.map(note => note.name).filter(name => (name.toLowerCase().includes(filtteri.toLowerCase()))) 
  const filtteroituObjektiLista = Objektilista.filter(objekti => filtterointi.includes(objekti.name))
     if(filtteri===''){
     lista=(Objektilista.map(note => <li key={note.id}>{note.name} {note.number} <button onClick={()=> ButtonClick(note.id)}> delete </button></li>))
     }else{
     lista = (filtteroituObjektiLista.map(note => <li key={note.id}>{note.name} {note.number} <button onClick={()=> ButtonClick(note.id)}> delete </button></li>))
     }
     return(
        <div>
        <ul>
        {lista}
        </ul>
        </div>
    )
  }
  
  export default DisplayNameAndNumberList