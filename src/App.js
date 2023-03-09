import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    taskToBeAdded: '',
    selectedOption: tagsList[0].displayText,
    addedTaskList: [],
    filteredList: '',
    filteredOption: '',
  }

  inputFunction = event => {
    this.setState({taskToBeAdded: event.target.value})
  }

  selectedFunction = event => {
    this.setState({selectedOption: event.target.value})
  }

  addTaskFunction = () => {
    const {
      taskToBeAdded,
      selectedOption,
      addedTaskList,
      filteredOption,
    } = this.state
    const taskObject = {
      task: taskToBeAdded,
      taskId: selectedOption,
      id: uuidv4(),
    }
    if (taskToBeAdded === '') {
      return alert('Enter Task')
    }
    addedTaskList.push(taskObject)
    return this.setState({
      filteredList: addedTaskList,
      taskToBeAdded: '',
      filteredOption: '',
    })
  }

  filterListFunction = displayText => {
    const {addedTaskList, selectedOption} = this.state
    console.log(displayText)
    const filteredList = addedTaskList.filter(
      eachFilter => eachFilter.taskId === displayText,
    )
    console.log(filteredList)
    console.log(selectedOption)
    this.setState({filteredList, filteredOption: displayText})
  }

  render() {
    const {taskToBeAdded, filteredList, filteredOption} = this.state
    console.log(filteredList)
    return (
      <div className="css-bg-container">
        <form className="css-leftcontainer">
          <h1>Create a task!</h1>
          <div className="css-input-container">
            <label htmlFor="task">Task</label>
            <input
              id="task"
              placeholder="Enter the task here"
              className="css-input-itself"
              value={taskToBeAdded}
              onChange={this.inputFunction}
            />
          </div>
          <div className="css-input-container">
            <label htmlFor="tags">Tags</label>
            <select
              className="css-select-container"
              onChange={this.selectedFunction}
              id="tags"
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.displayText}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="css-addtask-button-itself"
            onClick={this.addTaskFunction}
          >
            Add Task
          </button>
        </form>
        <div className="css-rightcontainer">
          <h1>Tags</h1>
          <ul className="css-buttons-list-container">
            {tagsList.map(eachTag => (
              <li key={eachTag.optionId}>
                <button
                  type="button"
                  className={`css-choose-button-itself ${
                    filteredOption === eachTag.displayText && 'css-active'
                  }`}
                  onClick={() => this.filterListFunction(eachTag.displayText)}
                >
                  {eachTag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 style={{marginTop: '20px'}}>Tasks</h1>
          {filteredList.length === 0 ? (
            <p style={{margin: '150px'}}>No Tasks Added Yet</p>
          ) : (
            <>
              <ul className="css-display-list-container">
                {filteredList.map(eachTag => (
                  <li key={eachTag.id}>
                    <div className="css-eachList-container">
                      <p>{eachTag.task}</p>
                      <button
                        type="button"
                        className="css-addtask-button-itself"
                      >
                        {eachTag.taskId}
                      </button>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default App
