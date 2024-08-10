import React, {useEffect} from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoBlack from "../../imgs/logo_black.png";
import "./Main.css"

export default function Main({children, routes}){
    const location = useLocation();
    const {pathname} = location;
    const listRoutes = routes.map(route => {
        return (
            <NavLink key={route.id} to={route.path}><li className={pathname == route.path? "selected":""}>{route.name}</li></NavLink>
        )
    })

    useEffect(() => {
        const changeFavicon = (faviconUrl) => {
          const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = faviconUrl;
          document.getElementsByTagName('head')[0].appendChild(link);
        };
    
        changeFavicon(logoBlack);
    
        return () => {
          changeFavicon(logoBlack);
        };
      }, []);

    return (
        <>
            <div className="body">
                <aside>
                    <h1>Desconexo's - Campo Minado</h1>
                    <nav>
                    <ul>
                            {listRoutes}
                    </ul>
                    </nav>
                </aside>
                <main>
                    <div className="container">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}