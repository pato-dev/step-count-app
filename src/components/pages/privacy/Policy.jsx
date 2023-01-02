import "./policy.css";
const Policy = ({ setPolicyOpen, onCheckboxClick }) => {
    return (
        <div className="policy_container">
            <div className="title">
                <h4>Our policy?</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium facilis fugiat aut odit, ut praesentium natus labore possimus id. Porro, corrupti, </p>
            </div>
            <div className="footer">
                <button
                    onClick={() => { onCheckboxClick() }}>
                    Accept
                </button>
                <button
                    onClick={() => { setPolicyOpen(true) }} id="cancelBtn">
                    Reject
                </button>
            </div>
        </div>
    );
}
export default Policy