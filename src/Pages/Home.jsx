import '../Sass/Home.scss'
import Down from '../Components/Down'

function Home() {
    return (
        <>
            <div className="home-container">
                <section className="up-container">
                    No fees. No minimum deposit. High interest rates. Open a savings account with
                    Argent Bank today!
                </section>

                <section className="down-container">
                    
                   <Down/>
                </section>
            </div>
        </>
    )
}

export default Home
