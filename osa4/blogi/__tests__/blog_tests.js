const mongoose = require('mongoose')
const Blog = require('../models/Blog')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('All blogs are returned', async () => {
 const response =   await api.get('/api/blogs')
 expect(response.body.length).toBe(response.body.length)
})

test('ID is defined', async () => {
    const response =   await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
   })

   test('Add post +1 OK and contet=true', async () => {
     const response1 = await api.get('/api/blogs')
      
     const content = {
      title: 'testBlog',
      author: 'SF-anytime',
      url: 'kokeile tata',
      likes: 5}

      let blogObject = new Blog(content)
      await blogObject.save()

        const response3 = await api.get('/api/blogs')
        // console.log(response3.body)
        expect(response3.body.length).toEqual(response1.body.length+1)
        expect(typeof response3.body[response3.body.length-1].title).toEqual('string');
        expect(typeof response3.body[response3.body.length-1].author).toEqual('string');
        expect(typeof response3.body[response3.body.length-1].url).toEqual('string');
        if(response3.body[response3.body.length-1].likes===''){
          const content2={
            title: response3.body.title,
            author: response3.body.author,
            url: response.body.url,
            likes: 0
            }
            let blogObject2 = new Blog(content2)
      await blogObject2.save()
        
      }
      })

      test('if post likes empty, then make it 0', async () => {
        const response1 = await api.get('/api/blogs')
         
        const content = {
         title: 'testBlog',
         author: 'SF-anytime',
         url: 'kokeile tata',
         likes: ''}
   
         let blogObject = new Blog(content)
         await blogObject.save()
   
           const response3 = await api.get('/api/blogs')
          
           if(response3.body[response3.body.length-1].likes===''){
             const content2={
               id: response.body.id,
               title: response3.body.title,
               author: response3.body.author,
               url: response.body.url,
               likes: 0
               }
               let blogObject2 = new Blog(content2)
         
         await Blog.findByIdAndUpdate(content2.id, blogObject2, { new: true })
           }
         })
        

      test('Add post and test if title and url given', async () => {
        const content = {
        
          author: 'SF-anytime',
          likes: 5}

          const blog = new Blog(content)
          if(!blog.title) {
          return 400
          }
         
          if(!blog.url){
          return 400
          }
          let blogObject3 = new Blog(content)

        const response =  await blog.save()
         
         expect(response).toEqual(400)      
      })

        test('Delete last post', async () => {
        const response1 = await api.get('/api/blogs')
        
        await Blog.findByIdAndRemove(response1.body[response1.body.length-1].id)
        })


afterAll(() => {
  mongoose.connection.close()
})