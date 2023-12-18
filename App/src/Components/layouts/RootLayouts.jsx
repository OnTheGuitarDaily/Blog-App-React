import { Outlet } from "react-router-dom";
import Nav from "../Nav/nav";

export default function RootLayout(){
    return(
        <div>
            <Nav />
            <main>
                <Outlet/>
            </main>
        </div>
    )
}