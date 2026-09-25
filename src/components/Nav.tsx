import './Nav.css';
import { LockKeyhole, ChevronDown, UserRoundPlus, Funnel, RefreshCcwDot, Search } from 'lucide-react';

function Nav() {
    return (
        <header className='container'>
            <nav>
                <div className="nav__left">
                    <button className="btn-project-list" type="button">
                        <LockKeyhole size={20} />
                        <span className="text-project">Adhivasindo</span>
                        <ChevronDown size={20} />
                    </button>
                    <div className="avatar-stacked">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
                        <div>2+</div>
                    </div>
                    <button className="btn-primary btn-primary__btn-group" type="button">
                        <UserRoundPlus size={20} />
                        <span>Invite</span>
                    </button>
                </div>
                <div className="nav__right self-center">
                    <button className="btn-transparent btn-transparent__btn-group" type="button">
                        <Funnel size={20} />
                        <span>Filter</span>
                    </button>
                    <button className="btn-transparent btn-transparent__btn-group" type="button">
                        <RefreshCcwDot size={20} />
                        <span>Export / Import</span>
                    </button>
                    <div className="input-group w-full">
                        <button type='button'>
                            <Search size={20} />
                        </button>
                        <input className="input w-full" type="text" placeholder='Search Tasks' />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Nav;
