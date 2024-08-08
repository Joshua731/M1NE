import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Main.css"

export default function Main({children, routes}){
    const location = useLocation();
    const {pathname} = location;
    const listRoutes = routes.map(route => {
        return (
            <NavLink key={route.id} to={route.path}><li className={pathname == route.path? "selected":""}>{route.name}</li></NavLink>
        )
    })

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