import './Nav.css';
import { LockKeyhole, ChevronDown, UserRoundPlus, Funnel, RefreshCcwDot, Search } from 'lucide-react';
import UserAvatar from '../assets/images/ava_1.jpg';
import UserAvatar2 from '../assets/images/ava_2.jpg';
import UserAvatar3 from '../assets/images/ava_3.jpg';
import UserAvatar4 from '../assets/images/ava_4.jpg';

function Nav() {
    const images = [
        UserAvatar,
        UserAvatar2,
        UserAvatar3,
        UserAvatar4
    ];

    return (
        <header className="container">
            <nav>
                <div className="nav__left">
                    <button className="btn-project-list" type="button">
                        <LockKeyhole size={18} />
                        <span className="text-project">Adhivasindo</span>
                        <ChevronDown size={18} />
                    </button>
                    <div className="avatar-stacked">
                        {images.map((image, index) => (
                            <img key={index} src={image} alt="User Avatar" />
                        ))}
                        <div>2+</div>
                    </div>
                    <button className="btn-primary btn-primary__btn-group" type="button">
                        <UserRoundPlus size={18} />
                        <span>Invite</span>
                    </button>
                </div>
                <div className="nav__right self-center">
                    <button className="btn-transparent btn-transparent__btn-group" type="button">
                        <Funnel size={18} />
                        <span>Filter</span>
                    </button>
                    <button className="btn-transparent bg-transparent--export-import btn-transparent__btn-group" type="button">
                        <RefreshCcwDot size={18} />
                        <span>Export / Import</span>
                    </button>
                    <div className="input-group w-full">
                        <button type='button'>
                            <Search size={18} />
                        </button>
                        <input className="input w-full" type="text" placeholder='Search Tasks' />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Nav;
