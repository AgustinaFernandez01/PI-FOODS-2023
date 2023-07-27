import style from './ErrorPage.module.css'
import SearchBar from '../../Components/SearchBar/SearchBar';

function ErrorPage() {
  return (
    <div>
      <SearchBar></SearchBar>
       <div className={style.container}>
  <div className={style.caption}>
    <div className={style.hatCont}>
      <div className={style.lines}></div>
      <div className={style.hat}></div>
      <div className={style.left}Name></div>
      <div className={style.top}></div>
      <div className={style.leftOpp}></div> 
    </div>
    <div className={style.headText}>
      Recipe Not Found !
    </div>
  </div>
  <div className={style.head}>
    <div className={style.panWrapper}>
      <div className={style.center}>
        <div className={style.subCenter}>
          <div className={style.egg}>
            <div className={style.yolk}></div>
          </div>
        </div>
      </div>
      <div className={style.handle}></div>
      <div className={style.handleSub}></div>
    </div>
  </div>
</div>
    </div>
 
  );
}

export default ErrorPage;