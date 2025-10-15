/*
===================================================================
React Lab — USER MANAGEMENT DASHBOARD
===================================================================

===================================================================
LAB SETUP INSTRUCTIONS
===================================================================

1. Navigate to the project directory:
   Open your terminal and run:
      cd 5-6-react-styling-fetch-data

2. Install project dependencies:
   Run either of these commands:
      npm i
      OR
      npm install

3. Install React-Bootstrap and Bootstrap:
   Run the following command:
      npm install react-bootstrap bootstrap

4. Start the development server:
   Run:
      npm run dev

   If your system blocks running npm commands (especially on Windows PowerShell),
   run this command first to allow script execution:
      Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

5. Link Bootstrap CSS to your React project:
   Open the file: public/index.html
   Inside the <head> tag, add this line:
      <link 
         href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
         rel="stylesheet"
      >

===================================================================
TASK #1 — APPLY BOOTSTRAP COMPONENTS
===================================================================
Files to edit: 
   - src/App.jsx
   - src/components/SearchBar.jsx
   - src/components/UserList.jsx
   - src/components/UserCard.jsx
   - src/components/UserModal.jsx
--------------------------------------------------------------

TODO 1.1: Add Layout Containers  
   File: App.jsx  
   Tag: <Header>, <Container> (search bar container), <Footer>
   - Look for the empty className="" attribute inside header, Container, and footer elements. 
   - Add Bootstrap spacing classes like py-3, mb-4, mt-5 for padding/margin.

--------------------------------------------------------------
TODO 1.2: Style the Header Section  
   File: App.jsx  

   Add Bootstrap classes in Header tag:
      bg-primary text-white py-3 mb-4 shadow
   Inside header:
      <Container>
         In h1 tag add propterties: h2 mb-0
         In p tag add propterties: mb-0 opacity-75
      </Container>

--------------------------------------------------------------
TODO 1.3: Add bootstrap in Search Bar Component  
   File: src/components/SearchBar.jsx  

   - Add Bootstrap classes:
      In div tag add properties: mb-4

--------------------------------------------------------------
TODO 1.4: Display User Cards in Grid  
   File: src/components/UserList.jsx  
   Use:
    - Use <Alert variant="info"> when no users are found.
    - Make a return statement after the if condition.
    - Make a <Row> tag inside the return statement.
    - Add  user.map function inside the row tag
        {users.map(user => (
          ))}
    - Add Col tag inside the user.map function.
    - Add <UserCard user={user} onUserClick={onUserClick} /> inside the Col tag.
    - Add properties to Col tag: md={6} lg={4} mb-4

--------------------------------------------------------------
TODO 1.5: Add bootstrap properties in User Card  
   File: src/components/UserCard.jsx 

   - Use <Button> components from react-bootstrap inside the </Card.Body> tag.
   - Write text of the button View Details. 
   - Add onClick function in the button onClick={() => onUserClick(user)}.

--------------------------------------------------------------
TODO 1.6: Add User Details Modal  
   File: src/components/UserModal.jsx  
   Use <Modal> from React-Bootstrap
   Structure:
      <Modal show={show} onHide={onHide}>
         <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="user-avatar-large">{user.name.charAt(0)}</div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Close</Button>
         </Modal.Footer>
      </Modal>

--------------------------------------------------------------
TODO 1.7: Add Footer  
   File: App.jsx  
   Tag: <footer>
   Add Bootstrap classes:
      bg-light py-4 mt-5

===================================================================
TODO #2 — APPLY CUSTOM CSS STYLING
===================================================================
File to edit: src/Index.css

--------------------------------------------------------------

TODO 2.1: Define Theme Colors  
   Selector: `:root`
   Add the following CSS variables:
      --primary-color: #0d6efd;
      --secondary-color: #6c757d;
      --light-color: #f8f9fa;
      --dark-color: #212529;

   Hint: You can reuse these colors across the app by using var(--primary-color).

--------------------------------------------------------------
TODO 2.2: Style Main App Container  
   Selector: `.app`
   This class is used in the tag:
      <div className="app"> in App.jsx
   Add these properties:
      background-color: var(--light-color);
      min-height: 100vh;

--------------------------------------------------------------
TODO 2.3: Style User Card  
   Selector: `.user-card`
   Tag: <Card className="user-card"> (in UserCard.jsx)
   Add properties:
      border: none;
      background-color: white;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

--------------------------------------------------------------
TODO 2.4: Add Hover Effect to User Card  
   Selector: `.user-card:hover`
   Add properties:
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

--------------------------------------------------------------
TODO 2.5: Create Circular Avatars  
   - Small Avatar (used in UserCard.jsx)
      Selector: `.user-avatar`
      Tag: <div className="user-avatar">
      Properties:
         width: 60px;
         height: 60px;
         border-radius: 50%;
         background-color: var(--primary-color);
         color: white;
         font-size: 1.5rem;
         display: flex;
         align-items: center;
         justify-content: center;

   - Large Avatar (used in UserModal.jsx)
      Selector: `.user-avatar-large`
      Tag: <div className="user-avatar-large">
      Properties:
         width: 80px;
         height: 80px;
         border-radius: 50%;
         background-color: var(--primary-color);
         color: white;
         font-size: 2rem;
         display: flex;
         align-items: center;
         justify-content: center;
         margin: 0 auto 20px;

--------------------------------------------------------------
TODO 2.6: Make Layout Responsive  
   Use media query:
      @media (max-width: 768px) {
         .user-avatar {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
         }
      }

Hint: The .user-avatar class is used inside <div> elements that display
user initials.

===================================================================
TODO #3 — FETCH DATA FROM API USING REACT HOOKS
===================================================================

File to edit: src/App.jsx

--------------------------------------------------------------

TODO 3.1: Import Hooks:
   import { useState, useEffect } from 'react';

--------------------------------------------------------------
TODO 3.2: Create State Variables:
   const [users, setUsers] = useState([]);
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [showModal, setShowModal] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);

--------------------------------------------------------------
TODO 3.3: Fetch User Data from API:
   - Use the endpoint: https://jsonplaceholder.typicode.com/users  
   - Write the fetching logic inside a useEffect hook that runs only once (empty dependency array).  

   Steps inside useEffect:
       a) Set loading to true.  
          Example: `setLoading(true);`
       b) Fetch the data from the API using fetch().  
          Example: `const response = await fetch('https://jsonplaceholder.typicode.com/users');`
       c) Convert the response to JSON.  
          Example: `const data = await response.json();`
       d) Store data in state using setUsers and setFilteredUsers.  
          Example: `setUsers(data); setFilteredUsers(data);`
       e) Handle errors using try...catch to display an error message.  
          Example: `catch (err) { setError(err.message); }`
       f) Set loading to false in finally block to stop the spinner.  
          Example: `finally { setLoading(false); }`

   Hint: 
   - You can define an async function *inside* useEffect like:
     ```jsx
     useEffect(() => {
       const fetchUsers = async () => {
         // your fetch logic here
       };
       fetchUsers();
     }, []);
     ```
   - Don’t forget to include an empty dependency array `[]` so it runs only once.

--------------------------------------------------------------
TODO 3.4: Filter Users by Search:
   Use another useEffect that runs when searchTerm or users change.  
   - Inside it:
       a) If searchTerm is empty → show all users.  
          Example: `setFilteredUsers(users);`
       b) Else → filter users whose name matches the search term.  
          Example: 
          ```jsx
          const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredUsers(filtered);
          ```
   Hint: Dependency array should include `[searchTerm, users]`.

--------------------------------------------------------------
TODO 3.5: Open and close the user modal:
   - Function: handleUserClick
       a) Set the selected user in state using setSelectedUser(user)
       b) Show the modal by setting setShowModal(true)

    - Function: handleCloseModal
       a) Hide the modal by setting setShowModal(false)
       b) Reset the selected user to null using setSelectedUser(null)

--------------------------------------------------------------
TODO 3.6: Handle Loading and Error States:
   Show feedback while fetching or on error.  
   Use conditional rendering:
       Example:
       ```jsx
       {loading && <Spinner animation="border" />}
       {error && <Alert variant="danger">{error}</Alert>}
       ```
   Hint:  
   - Place these conditions *before* rendering the user list.  
   - You can import `<Spinner>` and `<Alert>` from React-Bootstrap.

--------------------------------------------------------------
TODO 3.7: Display Data:
   - Use <UserList users={filteredUsers} onUserClick={handleUserClick} /> to show users.
   - Use <UserModal show={showModal} user={selectedUser} onHide={handleCloseModal} /> to show details.

💡 Hints:
   - Always wrap API calls in try...catch for error handling.
   - Use setLoading(true) before fetching and setLoading(false) when done.
   - Make sure to use async/await for clean asynchronous code.

===================================================================
END OF LAB INSTRUCTIONS
===================================================================
*/

import React, { useState, useEffect } from 'react'
import { Container, Alert, Spinner } from 'react-bootstrap'
import UserList from './components/UserList'
import SearchBar from './components/SearchBar'
import UserModal from './components/UserModal'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    {/*API fetch logic*/}

  }, [])

  const handleUserClick = (user) => {
  }

  const handleCloseModal = () => {
  }

  return (
    <div className="app">
      <header className="bg-primary text-white py-3 mb-4 shadow">
        <Container>
          <h1 className="h2 mb-0">User Management Dashboard</h1>
          <p className="mb-0 opacity-75">Manage and view user information</p>
        </Container>
      </header>

      <Container className="mb-4">
        <SearchBar />

        {/* {loading && <Spinner ... />} */}
        {/* {error && <Alert ...>{error}</Alert>} */}
        {/* <UserList users={filteredUsers} onUserClick={handleUserClick} /> */}

        <UserModal />
      </Container>

      <footer className="mt-5 py-3 bg-light">
        <Container>
          <p className="text-center text-muted mb-0">
            &copy; 2024 User Management Dashboard
          </p>
        </Container>
      </footer>
    </div>
  )
}

export default App
