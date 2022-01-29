import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onMarkStar} = props
  const {id, title, date, star} = appointmentDetails
  const dateFormate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickStar = () => {
    onMarkStar(id)
  }
  const starImage = star
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-container">
      <div className="title-container">
        <div>
          <p className="title">{title}</p>
          <p>{dateFormate}</p>
        </div>
        <button
          onClick={onClickStar}
          className="star-btn"
          testid="star"
          type="button"
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItem
