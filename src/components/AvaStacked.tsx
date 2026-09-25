import { AvaStackedData } from "../utils/AvaStackedData";
import type { Avatar } from "../types/Avatar";

function AvaStacked() {
    return (
        <div className="avatar-stacked">
            {AvaStackedData.map((data: Avatar) => (
                <img key={data.id} src={data.avaimg} alt="User Avatar" />
            ))}
            <div className="avatar-stacked__text">2+</div>
        </div>
    );
}

export { AvaStacked };