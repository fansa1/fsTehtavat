const _ = require('lodash')

const dummy = (blogs) => {
    return(
        1
    )
  }

  const totalLikes = (blogs) => {
    let sumLikes = 0
    for(let i of blogs){
        sumLikes = sumLikes+i.likes
    }
    return(
        sumLikes
    )
    }

  

  const favoriteBlog =(blogs) => {
    let max = 0
    let voittajablogi = ''
    
    if(blogs.length===0){
        return(
            undefined
        )
    }else{
    for(let i of blogs){
        if(i.likes>=max){
            max=i.likes
        }
    }
    for(let i of blogs){
        if(i.likes===max){
            voittajablogi=i
        }
    }

    let tiedot = {
        title: voittajablogi.title,
        author: voittajablogi.author,
        likes: voittajablogi.likes
    }
        return(
           tiedot
        )
    }
}

const mostBlogs=(blogs) => {
  let kirjoittajalista = blogs.map(o=>o.author)
  let kirjoittajat = _.uniq(kirjoittajalista)
  let uusikirjoittajalista = []
  
  for(let i of kirjoittajat){
    let luku = 0
      for(let a of kirjoittajalista){
          if(a===i)
          luku++
      }
      const kirjoittajaJaMaara ={
          author: i,
          blogs: luku
      }
      uusikirjoittajalista = uusikirjoittajalista.concat(kirjoittajaJaMaara)

    }
   //console.log(uusikirjoittajalista)
    return(
        _.maxBy(uusikirjoittajalista,'blogs')
    )
    }

    const mostLikes=(blogs) => {
        let kirjoittajalista = blogs.map(o=>o.author)
        let kirjoittajat = _.uniq(kirjoittajalista)
        let uusikirjoittajalista = []
        
        for(let i of kirjoittajat){
          let luku = 0
            for(let a of blogs){
                if(a.author===i)
                luku=luku+a.likes
            }
            const kirjoittajaJaMaara ={
                author: i,
                likes: luku
            }
            uusikirjoittajalista = uusikirjoittajalista.concat(kirjoittajaJaMaara)
      
          }
         //console.log(uusikirjoittajalista)
          return(
              _.maxBy(uusikirjoittajalista,'likes')
          )
          }

  module.exports = {
    dummy,totalLikes,favoriteBlog, mostBlogs, mostLikes
  }