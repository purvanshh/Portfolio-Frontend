import "./HomeBannerStyle.css";
import ShineButton from "./ui/ShineButton";
// import cartoon from "../images/AnimeBack.png";

export default function HomeBanner({ id }) {
  const handleHireMeClick = () => {
    window.open(
      "https://www.linkedin.com/in/purvansh-sahu-25b24228a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BxTANszurROeQZKtAIMwDrQ%3D%3D",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="home" id={id}>
      <div className="content">
        <div className="wrapper">
          <div className="name">Purvansh Sahu</div>
          <div className="staticTitle">Capturist</div>
          <ul className="dynamicTitle">
            <li>
              +<span>Developer</span>
            </li>
          </ul>
          <ShineButton
            label="Hire Me"
            size="lg"
            bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
            onClick={handleHireMeClick}
          />
        </div>
      </div>
      <div className="mask">
        {/* <img className='bg' src={cartoon} alt="boy-with-laptop" /> */}
      </div>
    </div>
  );
}

