import { Fragment, ReactNode } from "react";

type PageProps = {
    header: ReactNode;
    sidebar: ReactNode;
    children: ReactNode;
}

const Page: React.FC<PageProps> = ({ header, sidebar, children }) => {
    return <Fragment>
        <header>{header}</header>
        <div className="page-container">
            <aside>{sidebar}</aside>
            <main className="content">{children}</main>
        </div>
    </Fragment>
}


export default Page