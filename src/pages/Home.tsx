import { Plus, EllipsisVertical, Minimize2 } from "lucide-react";
import './Home.css';

function Home() {
    return (
        <>
            <div className="container">
                <div className="kanban-wrapper">
                    <section className="kanban-column">
                        <header className="kanban-header">
                            <div className="kanban-header__left">
                                <div>
                                    <div>
                                        <h4>To do</h4>
                                        <button className="btn btn--light-blue self-center" type="button">
                                            <Plus size={24} />
                                        </button>
                                        <button className="self-center" type="button">
                                            <EllipsisVertical size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <button type="button">
                                        <Minimize2 size={24} />
                                    </button>
                                </div>
                            </div>
                            <div className="kanban-header__right">

                            </div>
                        </header>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Home;