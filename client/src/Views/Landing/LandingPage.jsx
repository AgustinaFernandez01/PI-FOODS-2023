import style from'./LandingPage.module.css';
import BtnLanding from './ButtonLanding';

function LandingPage() {
  return (
    <div>
    <main className={style.container}>
      <div className={style.card}>
        <h1 className={style.cardTitle}>Welcome to Foodies!</h1>
        <div className={style.cardContent}>
          On this page, you will find the best <span>recipes </span>and <span>share</span> yours with the world
          ¡HOP ON BOARD!
        </div>
        <BtnLanding />
      </div>
    </main>
    </div>
  );
}

export default LandingPage;