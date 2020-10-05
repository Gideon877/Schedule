const mongoose = require('mongoose');
const graphqlSchema = require('./src/graphql/schema');
const graphqlResolvers = require('./src/graphql/resolvers');
const { ApolloServer } = require('apollo-server');
const isAuth = require('./src/middleware/is-auth')

const app = new ApolloServer({ 
	typeDefs: graphqlSchema, 
	resolvers: graphqlResolvers,
	context: isAuth
});

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-nhnpr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true
		})
	.then(() => {
		app.listen(4005, () => console.log(`🚀App running on http://localhost:4005`));
	}).catch(err => console.log(err))