import NavBar from "@/components/sideBar";
import List from "../list/page";


export default function AppShell() {

    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900 min-h-screen">
           <NavBar/>
            <main className="p-4 md:ml-64 h-full pt-20">
                <List/>
            </main>
        </div>
    )
}