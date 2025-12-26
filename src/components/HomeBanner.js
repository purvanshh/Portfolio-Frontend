import "./HomeBannerStyle.css";
// import cartoon from "../images/AnimeBack.png";
export default function HomeBanner({id}) {
  return (
    <div className="home" id={id}> 
        <div className='content'>
            <div className="wrapper">
              <div className="name">Purvansh Sahu</div>
              <div className="staticTitle">
              Capturist
              </div>
              <ul className="dynamicTitle">
                <li>+<span>Developer</span></li>
              </ul>
              <a className='btn' href="https://www.linkedin.com/in/purvansh-sahu-25b24228a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BxTANszurROeQZKtAIMwDrQ%3D%3D">Hire Me</a>
            </div>
        </div>
        <div className="mask">
            {/* <img className='bg' src={cartoon} alt="boy-with-laptop" /> */}
        </div>
    </div>
  )
}
