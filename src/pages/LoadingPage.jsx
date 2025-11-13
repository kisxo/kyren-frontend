import "./LoadingPage.css";

const LoadingPage = () => {
    return (
        <div class="loading-page w-full">

            <div className="logo-icon">
                {/* <svg width="250" height="157" viewBox="0 0 250 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.206455 30.3678L25.1625 119.631H224.811L249.767 30.3678C251.264 24.8464 245.275 20.7053 239.784 23.4661L179.89 57.975C176.396 59.8154 172.902 59.3553 169.907 55.6744L129.978 2.76071C126.983 -0.920238 122.99 -0.920238 119.995 2.76071L80.0658 55.6744C77.0711 59.3553 73.5772 59.8154 70.0834 57.975L10.1889 23.4661C5.69679 20.7053 -1.29091 24.8464 0.206455 30.3678Z" fill="#FF0000"/>
                    <path d="M224.811 133.993H25.1625L22.6669 147.796C22.1678 152.398 25.1625 156.999 30.1537 156.999H219.82C224.411 157.091 227.806 152.398 227.306 147.796L224.811 133.993Z" fill="#FF0000"/>
                </svg> */}
            </div>
            <div class="content">
                <div className="page-loader-text">KYREN OFFICIAL</div>
                <div className="page-loader-text">KYREN OFFICIAL</div>
            </div>
        </div>
    );
};

export default LoadingPage;
