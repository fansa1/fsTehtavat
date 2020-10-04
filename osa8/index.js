const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')

const pubsub = new PubSub()
const config = require('./utils/config')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const JWT_SECRET = config.JWT_SECRET

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/* let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]




   let books = [
   {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]
*/

const typeDefs = gql`


type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID
  }

  type EditedAuthor {
   name: String!
    born: Int!
  }

  type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      name: String!
      born: Int
      genres: [String!]!
    ): Book

    editAuthor(
    name: String!
    setBornTo: Int!
    ): EditedAuthor

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token 
}

 type Subscription {
    bookAdded: Book!
  } 

 
`
  
  countBooks = async (name) => {
    let bookcount = 0
    try {
    let authorObject = await Author.findOne({name: name})
    //console.log(authorObject._id)
    let booksFromDatabase = await Book.find({})
    booksFromDatabase.forEach(b=> b.author.toString()===authorObject._id.toString() ? bookcount++ : bookcount=bookcount)
    //console.log(bookcount)
    } catch (e) {
    
    }
    return(
     bookcount
    )}

const resolvers = {

   Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
      if(args.author===undefined && args.genre===undefined){
        const books = await Book.find({}).populate('author')
        console.log(books)
        return(
          books
        )
      }
      if(args.author!==undefined && args.genre===undefined){
        const id = await Author.findOne({name: args.author})
        const books = await Book.find( { author: { $in: id._id }}).populate('author')
        console.log(books)
        return(
          books
        )
      }
      if(args.author!==undefined && args.genre!==undefined){
        const id = await Author.findOne({name: args.author})
        const books = await Book.find( {$and: [{ author: { $in: id._id } }, { genres: { $in: args.genre } }]}  ).populate('author')
        console.log(books)
        return(
          books
        )
      }else{
        const books = await Book.find( { genres: { $in: args.genre } } ).populate('author')
        console.log(books)
        return(
          books
        )
      }
          } catch (e) {
      
      }}
    ,
    allAuthors: async ()=> {
    try {

    return await Author.find({})
    } catch (e) {
      
      }},

    me: (root, args, context) => {
    return context.currentUser 
    }
   },

Mutation: {
    addBook: async (root, args, {currentUser}) => {
      
      
       if (!currentUser) {
      throw new AuthenticationError("not authenticated")
      }

      try{
      const existingAuthor = await Author.findOne({name: args.name})
      if(existingAuthor){
      const bookWithKnownAuthor = new Book({title: args.title, published: args.published, author: existingAuthor.id, genres: args.genres})
      await bookWithKnownAuthor.save()
      await Author.findByIdAndUpdate(existingAuthor.id, {bookCount: existingAuthor.bookCount+1})
      const addedBook = await Book.findOne({title: args.title}).populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: addedBook})
            
      return (
        addedBook
      )
      }else{
      const author =  new Author ({name: args.name, born: args.born, bookCount: 1})
      await author.save()
      const savedAuthor = await Author.findOne({name: args.name})
      const book = new Book({title: args.title, published: args.published, author: savedAuthor.id, genres: args.genres})
      await book.save()
      const newaddedBook = await Book.findOne({title: args.title}).populate('author')
      console.log(newaddedBook)
      pubsub.publish('BOOK_ADDED', { bookAdded: newaddedBook})
      
      return(
       newaddedBook
      )
      }
      }catch(error) {
      throw new UserInputError(error.message, {
      invalidArgs: args,
      })}
      
    },
     
    editAuthor: async (root, args, {currentUser}) => {

       if (!currentUser) {
      throw new AuthenticationError("not authenticated")
      }
try{
  
  const authorToUpdate = await Author.findOne({name: args.name})
  const updatedAuthor = {name: authorToUpdate.name, born: args.setBornTo, bookCount: authorToUpdate.bookCount, _id: authorToUpdate._id}
        console.log(updatedAuthor)
        Author.collection.updateOne({ _id: authorToUpdate._id }, {$set: {born: args.setBornTo}} )
        return(
         updatedAuthor
        )

        }catch(error){
          console.log(error.message)
        }


  },

  createUser: (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
      return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })})
   
  },


  login: async (root, args) => {
    try{
      
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new UserInputError("wrong credentials")
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, JWT_SECRET) }
  }catch(error){
          console.log(error.message)
        }
}
},

    Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}







const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})


server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})