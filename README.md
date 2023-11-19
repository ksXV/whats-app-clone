This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

If you want to test this application you can log in with these credentials:

    Email : test@email.com
    Password : 12345678

This was one of my first project I've done alone combining both a client and server. My biggest problem was getting the message from Firestore in realtime because I made the wrong choice of choosing a non-relational database (e.g.: Firestore, MongoDB) instead of a relational one (e.g.:Postgres, MySQL, ...). It was solved by constructing the path to the Firestore document when the friends were fetched from Firestore and then passing that to a React component that would go and fetch and open a live connection where everytime a message was sent it would notify the other client to fetch the message and then display it to the user, establishing a more interactive app.     
