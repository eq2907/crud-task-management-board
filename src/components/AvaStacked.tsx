import { AvaStackedData } from "../utils/AvaStackedData";
import type { Avatar } from "../types/Avatar";
import { Plus } from "lucide-react";

function AvaStacked() {
    return (
        <div className="avatar-stacked">
            {AvaStackedData.map((data: Avatar) => (
                <img key={data.id} src={data.avaimg} alt="User Avatar" />
            ))}
            <div className="avatar-stacked__text">2+</div>
            <button className="btn-team-add btn btn--gray" type="button">
                <Plus size={20} />
            </button>
        </div>
    );
}

export { AvaStacked };