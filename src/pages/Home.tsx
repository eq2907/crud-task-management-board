import { Plus, EllipsisVertical, Minimize2, Timer, SquareCheck, Paperclip } from "lucide-react";
import { AvaStacked } from '../components/AvaStacked';

import './Home.css';

function Home() {
    return (
        <>
            <div className="board">
                <div className="container mx-auto h-full">
                    <div className="kanban-wrapper h-full">
                        <section className="kanban-column">
                            <header className="kanban-header">
                                <div className="kanban-header__left">
                                    <div>
                                        <div>
                                            <h4 className="self-center">To do</h4>
                                            <button className="btn btn--light-blue self-center" type="button">
                                                <Plus size={24} />
                                            </button>
                                            <button className="self-center" type="button">
                                                <EllipsisVertical size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="kanban-header__right">
                                    <div className="self-center">
                                        <button type="button">
                                            <Minimize2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </header>
                            <div className="kanban-card-wrapper">
                                <div className="kanban-card">
                                    <div className="kanban-card-row">
                                        <div className="kanban-card-row__img">
                                            <img src="https://placehold.co/400x200" alt="" />
                                        </div>
                                        <div className="kanban-card-row__label">
                                            <div className="label label--red">Bug</div>
                                        </div>
                                        <div className="kanban-card-row__progress">
                                            <div className="kanban-card-row__progress-bar" style={{ width: "67%" }}></div>
                                        </div>
                                        <div className="kanban-card-row__title">
                                            <p>Lorem ipsum dolor sit amet, adipisicing elit. Dolor quibusdam voluptates deleniti aperiam quidem temporibus nemo?</p>
                                        </div>
                                        <div className="kanban-card-row__bottom">
                                            <div className="kanban-card-row__bottom-left self-center">
                                                <ul>
                                                    <li>
                                                        <div className="due-date warning">
                                                            <Timer size={13} strokeWidth={2.5} />
                                                            <span>18 Aug</span>
                                                        </div>
                                                    </li>
                                                    <li className="sub-tasks self-center">
                                                        <div>
                                                            <SquareCheck size={13} strokeWidth={1.5} />
                                                            <span>10/19</span>
                                                        </div>
                                                    </li>
                                                    <li className="attachments self-center">
                                                        <div>
                                                            <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                                                            <span>2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="kanban-card-row__bottom-right">
                                                <AvaStacked />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="kanban-card">
                                    <div className="kanban-card-row">
                                        <div className="kanban-card-row__img">
                                            <img src="https://placehold.co/400x200" alt="" />
                                        </div>
                                        <div className="kanban-card-row__label">
                                            <div className="label label--red">Bug</div>
                                        </div>
                                        <div className="kanban-card-row__progress">
                                            <div className="kanban-card-row__progress-bar" style={{ width: "67%" }}></div>
                                        </div>
                                        <div className="kanban-card-row__title">
                                            <p>Lorem ipsum dolor sit amet, adipisicing elit. Dolor quibusdam voluptates deleniti aperiam quidem temporibus nemo?</p>
                                        </div>
                                        <div className="kanban-card-row__bottom">
                                            <div className="kanban-card-row__bottom-left self-center">
                                                <ul>
                                                    <li>
                                                        <div className="due-date warning">
                                                            <Timer size={13} strokeWidth={2.5} />
                                                            <span>18 Aug</span>
                                                        </div>
                                                    </li>
                                                    <li className="sub-tasks self-center">
                                                        <div>
                                                            <SquareCheck size={13} strokeWidth={1.5} />
                                                            <span>10/19</span>
                                                        </div>
                                                    </li>
                                                    <li className="attachments self-center">
                                                        <div>
                                                            <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                                                            <span>2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="kanban-card-row__bottom-right">
                                                <AvaStacked />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="kanban-card">
                                    <div className="kanban-card-row">
                                        <div className="kanban-card-row__img">
                                            <img src="https://placehold.co/400x200" alt="" />
                                        </div>
                                        <div className="kanban-card-row__label">
                                            <div className="label label--red">Bug</div>
                                        </div>
                                        <div className="kanban-card-row__progress">
                                            <div className="kanban-card-row__progress-bar" style={{ width: "67%" }}></div>
                                        </div>
                                        <div className="kanban-card-row__title">
                                            <p>Lorem ipsum dolor sit amet, adipisicing elit. Dolor quibusdam voluptates deleniti aperiam quidem temporibus nemo?</p>
                                        </div>
                                        <div className="kanban-card-row__bottom">
                                            <div className="kanban-card-row__bottom-left self-center">
                                                <ul>
                                                    <li>
                                                        <div className="due-date warning">
                                                            <Timer size={13} strokeWidth={2.5} />
                                                            <span>18 Aug</span>
                                                        </div>
                                                    </li>
                                                    <li className="sub-tasks self-center">
                                                        <div>
                                                            <SquareCheck size={13} strokeWidth={1.5} />
                                                            <span>10/19</span>
                                                        </div>
                                                    </li>
                                                    <li className="attachments self-center">
                                                        <div>
                                                            <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                                                            <span>2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="kanban-card-row__bottom-right">
                                                <AvaStacked />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="kanban-column">
                            <header className="kanban-header">
                                <div className="kanban-header__left">
                                    <div>
                                        <div>
                                            <h4 className="self-center">Doing</h4>
                                            <button className="btn btn--light-blue self-center" type="button">
                                                <Plus size={24} />
                                            </button>
                                            <button className="self-center" type="button">
                                                <EllipsisVertical size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="kanban-header__right">
                                    <div className="self-center">
                                        <button type="button">
                                            <Minimize2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </header>
                            <div className="kanban-card-wrapper">
                                <div className="kanban-card">
                                    <div className="kanban-card-row">
                                        {/* <div className="kanban-card-row__img">
                                            <img src="https://placehold.co/400x200" alt="" />
                                        </div> */}
                                        <div className="kanban-card-row__label">
                                            <div className="label label--red">Bug</div>
                                        </div>
                                        <div className="kanban-card-row__progress">
                                            <div className="kanban-card-row__progress-bar" style={{ width: "67%" }}></div>
                                        </div>
                                        <div className="kanban-card-row__title">
                                            <p>Lorem ipsum dolor sit amet, adipisicing elit. Dolor quibusdam voluptates deleniti aperiam quidem temporibus nemo?</p>
                                        </div>
                                        <div className="kanban-card-row__bottom">
                                            <div className="kanban-card-row__bottom-left self-center">
                                                <ul>
                                                    <li>
                                                        <div className="due-date warning">
                                                            <Timer size={13} strokeWidth={2.5} />
                                                            <span>18 Aug</span>
                                                        </div>
                                                    </li>
                                                    <li className="sub-tasks self-center">
                                                        <div>
                                                            <SquareCheck size={13} strokeWidth={1.5} />
                                                            <span>10/19</span>
                                                        </div>
                                                    </li>
                                                    <li className="attachments self-center">
                                                        <div>
                                                            <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                                                            <span>2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="kanban-card-row__bottom-right">
                                                <AvaStacked />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="kanban-card-row">
                                        {/* <div className="kanban-card-row__img">
                                            <img src="https://placehold.co/400x200" alt="" />
                                        </div> */}
                                        <div className="kanban-card-row__label">
                                            <div className="label label--blue">Feature</div>
                                        </div>
                                        <div className="kanban-card-row__progress">
                                            <div className="kanban-card-row__progress-bar" style={{ width: "67%" }}></div>
                                        </div>
                                        <div className="kanban-card-row__title">
                                            <p>Lorem ipsum dolor sit amet, adipisicing elit. Dolor quibusdam voluptates deleniti aperiam quidem temporibus nemo?</p>
                                        </div>
                                        <div className="kanban-card-row__bottom">
                                            <div className="kanban-card-row__bottom-left self-center">
                                                <ul>
                                                    <li>
                                                        <div className="due-date normal">
                                                            <Timer size={13} strokeWidth={2.5} />
                                                            <span>18 Aug</span>
                                                        </div>
                                                    </li>
                                                    <li className="sub-tasks self-center">
                                                        <div>
                                                            <SquareCheck size={13} strokeWidth={1.5} />
                                                            <span>10/19</span>
                                                        </div>
                                                    </li>
                                                    <li className="attachments self-center">
                                                        <div>
                                                            <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                                                            <span>2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="kanban-card-row__bottom-right">
                                                <AvaStacked />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="kanban-card-row">
                                        {/* <div className="kanban-card-row__img">
                                            <img src="https://placehold.co/400x200" alt="" />
                                        </div> */}
                                        <div className="kanban-card-row__label">
                                            <div className="label label--transparent">Undefined</div>
                                        </div>
                                        <div className="kanban-card-row__progress">
                                            <div className="kanban-card-row__progress-bar" style={{ width: "67%" }}></div>
                                        </div>
                                        <div className="kanban-card-row__title">
                                            <p>Lorem ipsum dolor sit amet, adipisicing elit. Dolor quibusdam voluptates deleniti aperiam quidem temporibus nemo?</p>
                                        </div>
                                        <div className="kanban-card-row__bottom">
                                            <div className="kanban-card-row__bottom-left self-center">
                                                <ul>
                                                    <li>
                                                        <div className="due-date overdue">
                                                            <Timer size={13} strokeWidth={2.5} />
                                                            <span>18 Aug</span>
                                                        </div>
                                                    </li>
                                                    <li className="sub-tasks self-center">
                                                        <div>
                                                            <SquareCheck size={13} strokeWidth={1.5} />
                                                            <span>10/19</span>
                                                        </div>
                                                    </li>
                                                    <li className="attachments self-center">
                                                        <div>
                                                            <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                                                            <span>2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="kanban-card-row__bottom-right">
                                                <AvaStacked />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="kanban-column">
                            <header className="kanban-header">
                                <div className="kanban-header__left">
                                    <div>
                                        <div>
                                            <h4 className="self-center">Review</h4>
                                            <button className="btn btn--light-blue self-center" type="button">
                                                <Plus size={24} />
                                            </button>
                                            <button className="self-center" type="button">
                                                <EllipsisVertical size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="kanban-header__right">
                                    <div className="self-center">
                                        <button type="button">
                                            <Minimize2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </header>
                            <div className="kanban-card-wrapper">
                                <div className="kanban-card">
                                    <div className="kanban-card-row">
                                        <div className="kanban-card-row__img">
                                            <img src="https://placehold.co/400x200" alt="" />
                                        </div>
                                        <div className="kanban-card-row__label">
                                            <div className="label label--yellow">Issue</div>
                                        </div>
                                        <div className="kanban-card-row__progress">
                                            <div className="kanban-card-row__progress-bar" style={{ width: "67%" }}></div>
                                        </div>
                                        <div className="kanban-card-row__title">
                                            <p>Lorem ipsum dolor sit amet, adipisicing elit. Dolor quibusdam voluptates deleniti aperiam quidem temporibus nemo?</p>
                                        </div>
                                        <div className="kanban-card-row__bottom">
                                            <div className="kanban-card-row__bottom-left self-center">
                                                <ul>
                                                    <li>
                                                        <div className="due-date warning">
                                                            <Timer size={13} strokeWidth={2.5} />
                                                            <span>18 Aug</span>
                                                        </div>
                                                    </li>
                                                    <li className="sub-tasks self-center">
                                                        <div>
                                                            <SquareCheck size={13} strokeWidth={1.5} />
                                                            <span>10/19</span>
                                                        </div>
                                                    </li>
                                                    <li className="attachments self-center">
                                                        <div>
                                                            <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                                                            <span>2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="kanban-card-row__bottom-right">
                                                <AvaStacked />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="kanban-card-row">
                                        {/* <div className="kanban-card-row__img">
                                            <img src="https://placehold.co/400x200" alt="" />
                                        </div> */}
                                        <div className="kanban-card-row__label">
                                            <div className="label label--blue">Feature</div>
                                        </div>
                                        <div className="kanban-card-row__progress">
                                            <div className="kanban-card-row__progress-bar" style={{ width: "67%" }}></div>
                                        </div>
                                        <div className="kanban-card-row__title">
                                            <p>Lorem ipsum dolor sit amet, adipisicing elit. Dolor quibusdam voluptates deleniti aperiam quidem temporibus nemo?</p>
                                        </div>
                                        <div className="kanban-card-row__bottom">
                                            <div className="kanban-card-row__bottom-left self-center">
                                                <ul>
                                                    <li>
                                                        <div className="due-date normal">
                                                            <Timer size={13} strokeWidth={2.5} />
                                                            <span>18 Aug</span>
                                                        </div>
                                                    </li>
                                                    <li className="sub-tasks self-center">
                                                        <div>
                                                            <SquareCheck size={13} strokeWidth={1.5} />
                                                            <span>10/19</span>
                                                        </div>
                                                    </li>
                                                    <li className="attachments self-center">
                                                        <div>
                                                            <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                                                            <span>2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="kanban-card-row__bottom-right">
                                                <AvaStacked />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="kanban-card-row">
                                        {/* <div className="kanban-card-row__img">
                                            <img src="https://placehold.co/400x200" alt="" />
                                        </div> */}
                                        <div className="kanban-card-row__label">
                                            <div className="label label--transparent">Undefined</div>
                                        </div>
                                        <div className="kanban-card-row__progress">
                                            <div className="kanban-card-row__progress-bar" style={{ width: "67%" }}></div>
                                        </div>
                                        <div className="kanban-card-row__title">
                                            <p>Lorem ipsum dolor sit amet, adipisicing elit. Dolor quibusdam voluptates deleniti aperiam quidem temporibus nemo?</p>
                                        </div>
                                        <div className="kanban-card-row__bottom">
                                            <div className="kanban-card-row__bottom-left self-center">
                                                <ul>
                                                    <li>
                                                        <div className="due-date overdue">
                                                            <Timer size={13} strokeWidth={2.5} />
                                                            <span>18 Aug</span>
                                                        </div>
                                                    </li>
                                                    <li className="sub-tasks self-center">
                                                        <div>
                                                            <SquareCheck size={13} strokeWidth={1.5} />
                                                            <span>10/19</span>
                                                        </div>
                                                    </li>
                                                    <li className="attachments self-center">
                                                        <div>
                                                            <Paperclip size={13} strokeWidth={1.4} style={{ transform: 'rotate(47deg)' }} />
                                                            <span>2</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="kanban-card-row__bottom-right">
                                                <AvaStacked />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="kanban-column new-column">
                            <button className='btn btn-new-column btn--gray' type='button'>
                                <Plus size={18} />
                                <span>Add new List</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;