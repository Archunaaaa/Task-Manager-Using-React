import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddNewTask.css'
const AddNewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [status, setStatus] = useState('To Do');
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = (e) => {
    if (e.key === 'Enter') {
      if (isValidEmail(email)) {
        setEmailList([...emailList, email]);
        setEmail(''); 
        setErrorMessage(''); 
      } else {
        setErrorMessage(`Invalid email format: ${email}`);
      }
    }
  };

    const handleRemoveEmail = (index) => {
    const updatedEmails = emailList.filter((_, i) => i !== index);
    setEmailList(updatedEmails);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      setErrorMessage('Task title is required.');
      return;
    }

    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed,
      status,
      emails: emailList,
    };

   
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    existingTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    setTitle('');
    setDescription('');
    setCompleted(false);
    setStatus('To Do');
    setEmailList([]);
    setErrorMessage('');
  };

  return (
    <div data-testid="formContainer">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            id="title"
            data-testid="titleInputField"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Task Description:</label>
          <textarea
            id="description"
            data-testid="descriptionTextarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="completed">Completed:</label>
          <input
            type="checkbox"
            id="completed"
            data-testid="completedCheckbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="status">Task Status:</label>
          <select
            id="status"
            data-testid="taskStatusSelect"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <div>
          <label htmlFor="email">Add Emails
            :</label>
          <input
            type="email"
            id="email"
            data-testid="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleAddEmail}
          />
        </div>
        <div data-testid="emailList">
          {emailList.map((email, index) => (
            <div key={index} data-testid={`email-${index}`}>
              <span>{email[0]}</span> {/* First character of email */}
              <span>{email}</span>
              <button
                type="button"
                data-testid={`removeEmailButton-${index}`}
                onClick={() => handleRemoveEmail(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTask;