import { X, Check, ImagePlus, Pencil, Plus } from "lucide-react";
import { AvaStacked } from "./AvaStacked";

function Modal() {
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-content__left">
                            <div className="modal-content__left-header px-14">
                                <div>
                                    <label className="btn-complete">
                                        <input type="checkbox" className="toggle-complete" />
                                        <Check />
                                        <span className="btn-text">Mark Complete</span>
                                    </label>
                                </div>
                                <div>
                                    <button className="btn-close btn btn--gray" type="button">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="modal-cover">
                                <label className="btn-cover" htmlFor="modal-cover-input">
                                    <ImagePlus size={50} />
                                    <input type="file" id="modal-cover-input" />
                                    <span className="btn-text">Add Cover Image</span>
                                </label>
                            </div>
                            <div className="modal-title">
                                <label htmlFor="modal-title-input">
                                    <textarea name="title" id="modal-title-input" rows={1} defaultValue="CRUD Employe"></textarea>
                                    <span><Pencil size={20} /></span>
                                </label>
                            </div>
                            <div className="modal-column">
                                <div className="modal-row">
                                    <h4>Assignee</h4>
                                    <AvaStacked />
                                </div>
                                <div className="modal-row">
                                    <label htmlFor="modal-due-date-input">
                                        <h4>Due Date</h4>
                                    </label>
                                    <input type="date" className="select w-full" name="modal-due-date-input" id="modal-due-date-input" />
                                </div>
                                <div className="modal-row">
                                    <label htmlFor="modal-board-select">
                                        <h4>Board</h4>
                                    </label>
                                    <select name="modal-board-select" id="modal-board-select" className="select w-full">
                                        <option value="">Select Board</option>
                                        <option value="board-1">Board 1</option>
                                        <option value="board-2">Board 2</option>
                                        <option value="board-3">Board 3</option>
                                    </select>
                                </div>
                                <div className="modal-row">
                                    <label htmlFor="modal-column-select">
                                        <h4>Column</h4>
                                    </label>
                                    <select name="modal-column-select" id="modal-column-select" className="select w-full">
                                        <option value="">Select Column</option>
                                        <option value="todo">To Do</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="testing">Testing</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                                <div className="modal-row">
                                    <label htmlFor="modal-label-select">
                                        <h4>Label</h4>
                                    </label>
                                    <select name="modal-label-select" id="modal-label-select" className="select w-full">
                                        <option value="">Select Label</option>
                                        <option value="label-1">Label 1</option>
                                        <option value="label-2">Label 2</option>
                                        <option value="label-3">Label 3</option>
                                    </select>
                                </div>
                                <div className="modal-row">
                                    <label htmlFor="modal-priority-select">
                                        <h4>Priority</h4>
                                    </label>
                                    <select name="modal-priority-select" id="modal-priority-select" className="select w-full">
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-content__right">
                            <div className="modal-description px-14">
                                <h2>Description</h2>
                                <label htmlFor="modal-description-input">
                                    <textarea name="modal-description-input" id="modal-description-input" className="textarea w-full"></textarea>
                                    <span><Pencil size={20} /></span>
                                </label>
                            </div>
                            <hr className="my-34" />
                            <div className="modal-attachment px-14">
                                <h2>Attachments</h2>
                                <label className="btn-attachment" htmlFor="modal-attachment-input">
                                    <ImagePlus size={20} />
                                    <input type="file" id="modal-attachment-input" />
                                    <span className="btn-text">Drag & Drop files here <span>or</span></span>
                                    <span className="btn-text-browse">browse from device</span>
                                </label>
                            </div>
                            <hr className="my-34" />
                            <div className="modal-checklist px-14">
                                <h2>Check List</h2>
                                <span className="modal-checklistt__count">0 / 0</span>
                                <div className="progress">
                                    <div className="progress-bar" style={{ width: "0%" }}></div>
                                </div>
                                <div className="modal-checklist__add-checklist">
                                    <label htmlFor="modal-checklist-input" style={{ display: "none" }}>
                                        <h4>Add an item</h4>
                                        <input type="text" id="modal-checklist-input" className="input w-full" />
                                    </label>
                                    <div className="checklists" style={{ display: "none" }}>
                                        <ul>
                                            <li>
                                                <label htmlFor="modal-checklist-checkbox-1">
                                                    <input type="checkbox" name="modal-checklist-checkbox-1" id="modal-checklist-checkbox-1" className="checkbox" />
                                                    <span className="checklist-text">Lorem Ipsum</span>
                                                </label>
                                                <button className="self-center" type="button">
                                                    <X size={16} />
                                                </button>
                                            </li>
                                            <li>
                                                <label htmlFor="modal-checklist-checkbox-2">
                                                    <input type="checkbox" name="modal-checklist-checkbox-2" id="modal-checklist-checkbox-2" className="checkbox" />
                                                    <span className="checklist-text">Lorem Ipsum</span>
                                                </label>
                                                <button className="self-center" type="button">
                                                    <X size={16} />
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <button className="btn btn--gray btn--gray__btn-group" type="button">
                                        <Plus size={18} />
                                        <span>Add subtask</span>
                                    </button>
                                </div>
                            </div>
                            <hr className="my-34" />
                            <div className="modal-bottom">
                                <button className="btn btn--gray" type="button">
                                    Discard
                                </button>
                                <button className="btn btn--blue" type="button">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="backdrop"></div>
        </>
    )
}

export { Modal }