const Notification = ({ message, colorearEn }) => message === null ? null : <div className="message" style={{color: colorearEn}}>{message}</div>

export default Notification