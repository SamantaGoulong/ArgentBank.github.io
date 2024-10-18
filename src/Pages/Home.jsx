import '../Sass/Home.scss'
import ItemsHome from '../Components/ItemsHome'

function Home() {
    return (
        <>
            <div className="home-container">
                <div className="home-content">
                    <section className="home-content-text">
                        <p className="subtitle">No fees.</p>
                        <p className="subtitle">No minimum deposit.</p>
                        <p className="subtitle">High interest rates.</p>
                        <p className="text">Open a savings account with Argent Bank today!</p>
                    </section>
                </div>
                <section className="home-content-item">
                    <ItemsHome
                        icon="./icon-chat.png"
                        title="You are our #1 priority"
                        description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
                    />

                    <ItemsHome
                        icon="./icon-money.png"
                        title="More savings means higher rates"
                        description="The more you save with us, the higher your interest rate will be!"
                    />

                    <ItemsHome
                        icon="./icon-security.png"
                        title="Security you can trust"
                        description="We use top of the line encryption to make sure your data and money is always safe."
                    />
                </section>
            </div>
        </>
    )
}

export default Home
