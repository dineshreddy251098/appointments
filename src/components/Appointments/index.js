import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const initialAppointmentList = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentList,
    title: '',
    date: '',
    filter: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onMarkStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, star: !eachAppointment.star}
        }
        return eachAppointment
      }),
    }))
  }

  onFilterStar = () => {
    this.setState(prevState => ({filter: !prevState.filter}))
  }

  getFilteredList = appointmentsList =>
    appointmentsList.filter(eachAppointment => eachAppointment.star === true)

  onSubmitAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      star: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {appointmentsList, title, date, filter} = this.state
    const filterStyle = filter ? 'stared' : ''
    const filteredList = this.getFilteredList(appointmentsList)
    const filteredAppointmentsList = filter ? filteredList : appointmentsList
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="add-appointment-container">
            <form onSubmit={this.onSubmitAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                placeholder="Title"
                onChange={this.onChangeTitle}
                className="input-title"
                id="title"
                type="text"
                value={title}
              />
              <br />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <br />
              <input
                onChange={this.onChangeDate}
                className="input-title"
                id="date"
                type="date"
                value={date}
              />
              <br />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              className="appointments-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appointments-header-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              onClick={this.onFilterStar}
              className={`star-filter-btn ${filterStyle}`}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                onMarkStar={this.onMarkStar}
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
