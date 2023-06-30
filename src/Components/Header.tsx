import styleHeader from './Header.module.css';
import igniteLogo from '../assets/Logo.png';

export function Header(){
    return (
        <header className={styleHeader.header}>
            <img src={igniteLogo} alt="" />
        </header>
    );
}