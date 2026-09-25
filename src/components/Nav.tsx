import './Nav.css';
import { LockKeyhole, ChevronDown, UserRoundPlus } from 'lucide-react';

function Nav() {
    return (
        <header className='container'>
            <nav>
                <div>
                    <button className="btn-transparent" type="button">
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
                        <UserRoundPlus size={18} />
                        <span>Invite</span>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Nav;
