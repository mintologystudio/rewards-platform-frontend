import ReactGA from 'react-ga';
import {useEffect} from "react";

const useReactGA = () => {

    const pageView = () => {
        try {
            ReactGA.pageview(window.location.pathname + window.location.search);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        pageView();
    }, [])

}

export default useReactGA;
