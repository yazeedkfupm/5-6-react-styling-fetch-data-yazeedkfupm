[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/wtcNr7U4)
# React Lab: User Management Dashboard

## Note
Follow the App.jsx file to implement the lab.

## Overview
In this lab, students will learn to:
- Apply custom CSS styling to React components.
- Use Bootstrap and React-Bootstrap components for layout and UI.
- Fetch and display data from an API using React hooks (`useState` and `useEffect`).

## Reading Assignment
- [**5.15 Styling**](https://learn.zybooks.com/zybook/SWE363Fall2025/chapter/5/section/15)
- [**5.16 React Bootstrap**](https://learn.zybooks.com/zybook/SWE363Fall2025/chapter/5/section/16)
- [**5.17 Fetching Data**](https://learn.zybooks.com/zybook/SWE363Fall2025/chapter/5/section/17)

---

## Concepts and Code Syntax

### 1. CSS Styling
**What is CSS?**
- CSS (Cascading Style Sheets) is used to style HTML and React components.
- It controls layout, colors, fonts, spacing, and other visual aspects.

**What are CSS properties?**
- Properties define the style for a selector (class, id, or tag).
- Example of some common CSS properties:

```css
.selector {
  background-color: #ffffff;
  color: #333333;
  font-size: 16px;
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}
```

---

### 2. Bootstrap
**What is Bootstrap?**
- Bootstrap is a CSS framework for building responsive and mobile-first web interfaces quickly.
- React-Bootstrap wraps Bootstrap components as React components.

**Common Bootstrap components:**
- Container, Row, Col, Card, Button, Modal, Alert

**Example syntax:**
```jsx
import { Button, Card } from 'react-bootstrap';

<Card className="shadow-sm mb-3">
  <Card.Body>
    <Card.Title>Title</Card.Title>
    <Card.Text>Some text</Card.Text>
    <Button variant="primary">Click Me</Button>
  </Card.Body>
</Card>
```

**Common classes:**
- `mb-4`, `py-3`, `text-center`, `bg-primary`, `text-white`, `shadow`

---

### 3. Fetching Data using API
**Calling fetch function:**
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**React Hooks:**
- `useState` stores state variables
- `useEffect` runs side effects like fetching data

```javascript
import { useState, useEffect } from 'react';

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.example.com/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
```

---

## Checklist Before Submitting Lab

- [ ] Layout containers, header, content, footer
- [ ] Header classes: `bg-primary text-white py-3 mb-4 shadow`
- [ ] SearchBar, UserList, UserCard, UserModal Bootstrap usage
- [ ] Grid: `<Row>` + `<Col>` for UserCards
- [ ] Button in UserCard and Modal
- [ ] Define theme colors in `:root` in `Index.css`
- [ ] Style `.app`, `.user-card`, `.user-avatar`, `.user-avatar-large`
- [ ] Hover effects
- [ ] Responsive layout
- [ ] Import `useState` and `useEffect`
- [ ] Create state variables: `users`, `filteredUsers`, `loading`, `error`, `searchTerm`, `showModal`, `selectedUser`
- [ ] Fetch user data from API
- [ ] Filter users by search term
- [ ] Open and close modal
- [ ] Handle loading and error