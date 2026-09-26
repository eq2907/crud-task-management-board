import { LockKeyhole, ChevronDown, UserRoundPlus, Funnel, RefreshCcwDot, Search } from 'lucide-react';
import { AvaStacked } from './AvaStacked';

function Nav() {

    return (
        <header className="container mx-auto">
            <nav>
                <div className="nav__left">
                    <button className="btn-project-list" type="button">
                        <LockKeyhole size={18} />
                        <span className="text-project">Adhivasindo</span>
                        <ChevronDown size={18} />
                    </button>
                    <AvaStacked />
                    <button className="btn btn--gray btn--gray__btn-group" type="button">
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
