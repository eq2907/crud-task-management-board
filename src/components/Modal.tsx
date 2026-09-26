import { X, Check, ImagePlus, Pencil } from "lucide-react";

function Modal() {
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-content__left">
                            <div className="modal-content__left-header">
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
                                    <textarea name="title" id="modal-title-input" placeholder="Task title" rows={1}>CRUD Employe</textarea>
                                    <span><Pencil size={20} /></span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-content__right">
                            <h1>Hello</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="backdrop"></div>
        </>
    )
}

export { Modal }