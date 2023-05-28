import "./Footer.css"

function Footer(){
    return (
        <div className="footer-container">
            <div id="tech-used">
                Python · Flask · SQLAlchemy · React · JavaScript
            </div>
            <div id="contact-links">
                Andre Hristu
                <a href="https://github.com/APH1997" target="_blank">
                    <i className="fab fa-github"></i>
                </a>
                <div className="linked-in-background">
                    <div className="huh">
                        <a href="https://www.linkedin.com/in/andre-hristu-012842164/" target="_blank">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Footer
