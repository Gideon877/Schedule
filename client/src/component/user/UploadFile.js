import React from 'react';
import { Mutation, ApolloProvider } from "react-apollo";
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";

const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    addFile(file: $file) {
      _id
      filename
    }
  }
`;
const URL = 'http://localhost:4005/graphql';

const client = new ApolloClient({
    link: ApolloLink.from([

        // Report errors to console in a user friendly format
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),

        createUploadLink({
            uri: URL,
            credentials: "same-origin"
        })
    ]),
    cache: new InMemoryCache()
});

const UploadFile = () => (
    <ApolloProvider client={client}>
        <Mutation mutation={UPLOAD_FILE}>
            {mutate => (
                <form
                    // action='/uploa'
                    method='post'
                    encType='multipart/form-data'
                >
                    <input
                        type="file"
                        name='file'
                        required
                        onChange={event => {
                            const [file] = event.target.files;
                            console.log({ files: event.target.files, __dirname})
                            mutate({
                                variables: { file }
                            }).then((result) => {
                                console.log({ result })
                            }).catch((err) => {
                                console.log(err)
                            });
                        }}
                    />
                </form>
            )}
        </Mutation>
    </ApolloProvider>
);

export default UploadFile;