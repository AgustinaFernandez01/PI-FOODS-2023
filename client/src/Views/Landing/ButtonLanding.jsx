import {Link} from 'react-router-dom'
import style from './ButtonLanding.module.css'

export default function BtnLanding() {
  return(
    <Link to='/home'>
      <button className={style.button}>Enter</button>
    </Link>
  )
}   