
import { Button } from "semantic-ui-react"

const handleScrollTop = () => {
    function Scroll() {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div style={{ bottom: "0rem", paddingBottom: "1rem", position: "fixed", right: '0' }}>
            <Button title='Top' onClick={() => Scroll()}>Top</Button>
        </div>
    )
}
export default handleScrollTop
