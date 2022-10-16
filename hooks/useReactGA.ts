// import ReactGA from 'react-ga';
import ReactGA from 'react-ga4';
import {useEffect} from "react";

const useReactGA = () => {

    const pageView = () => {
        try {
            ReactGA.send({hitType: 'pageview', page: window.location.pathname + window.location.search, title: window.location.pathname + window.location.search});
            // ReactGA.pageview(window.location.pathname + window.location.search); // (only for react-ga UX id)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        pageView();
    }, [])

}

export default useReactGA;
