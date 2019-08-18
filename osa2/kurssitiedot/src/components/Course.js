import React from 'react'

const Course = ({courses}) => {

    let Otsikko = (listaOlio) => {
        return(
        <h2 key={listaOlio.name}> {listaOlio.name} </h2>
        )
    }
    
    let Sisalto = (listaOlio) => {
        return(
            listaOlio.parts.map(note => <li key={listaOlio.name+note.id}>{note.name} {note.exercises}</li>)
        )
    }
    
    let Sum = (listaOlio) => {
        let summa = listaOlio.parts.map(num => num.exercises).reduce((total, amount) => total + amount)
        return(
            <p key = {summa} >
            total of {summa} exercises </p>
        )
    }

    let lista=[]
    for(let value of courses){
        lista = lista.concat(Otsikko(value), Sisalto(value), Sum(value))
    }
    return(
        <>
        {lista}
        </>
    )
}

export default Course





