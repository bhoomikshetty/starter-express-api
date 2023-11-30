const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample data - replace this with your database or storage solution
let courses = [
  { id: 1, name: 'Math 101', instructor: 'John Doe' },
  { id: 2, name: 'History 202', instructor: 'Jane Smith' },
];

// Get all courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

// Get a specific course by ID
app.get('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  res.json(course);
});

// Create a new course
app.post('/courses', (req, res) => {
  const { name, instructor } = req.body;

  if (!name || !instructor) {
    return res.status(400).json({ error: 'Name and instructor are required' });
  }

  const newCourse = {
    id: courses.length + 1,
    name,
    instructor,
  };

  courses.push(newCourse);

  res.status(201).json(newCourse);
});

// Update a course by ID
app.put('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  const { name, instructor } = req.body;

  if (name) {
    course.name = name;
  }

  if (instructor) {
    course.instructor = instructor;
  }

  res.json(course);
});

// Delete a course by ID
app.delete('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  courses = courses.filter(c => c.id !== courseId);

  res.json({ message: 'Course deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
